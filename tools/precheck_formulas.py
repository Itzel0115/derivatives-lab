"""公式卡的數值預檢。

用法（在專案根目錄執行）：
    python tools/precheck_formulas.py

這支腳本**不是 C3，也不取代 C3**。
  - C3 測的是 lab/*.js（N3 的產出）；這支腳本用 Python 直接照 wiki 的公式卡計算。
  - 用途：ingest 之後、N3 之前，先確認從 PDF 原圖抄錄的公式卡與自行推導的公式卡沒有抄錯或推錯。
  - 它通過，只表示公式卡彼此一致、行為合理；不表示 lab/ 的程式正確。

每個函式上方的註解標出它對應的公式卡 ID。只用 Python 標準函式庫。
結束代碼：有任何一項不通過為 1，否則為 0。
"""
import math
import random
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

FAIL = []


def check(name, ok, detail):
    print(f"{'通過' if ok else '不通過'}  {name}：{detail}")
    if not ok:
        FAIL.append(name)


# ---------- Black-Scholes ----------

# F05：N(x)
def N(x):
    return 0.5 * (1.0 + math.erf(x / math.sqrt(2.0)))


# F07 的 n(x)：標準常態密度
def n(x):
    return math.exp(-x * x / 2.0) / math.sqrt(2.0 * math.pi)


# F05：d1、d2
def d1d2(S, K, T, r, sig):
    d1 = (math.log(S / K) + (r + sig * sig / 2.0) * T) / (sig * math.sqrt(T))
    return d1, d1 - sig * math.sqrt(T)


# F03
def bs_call(S, K, T, r, sig):
    d1, d2 = d1d2(S, K, T, r, sig)
    return S * N(d1) - K * math.exp(-r * T) * N(d2)


# F04
def bs_put(S, K, T, r, sig):
    d1, d2 = d1d2(S, K, T, r, sig)
    return K * math.exp(-r * T) * N(-d2) - S * N(-d1)


# F07
def vega(S, K, T, r, sig):
    return S * n(d1d2(S, K, T, r, sig)[0]) * math.sqrt(T)


# iv-inversion-algorithm 的二分法（設計參數見該頁第 3 節）
def implied_vol_bisect(price, S, K, T, r, lo=1e-4, hi=5.0, tol=1e-8, max_iter=100):
    for _ in range(max_iter):
        mid = (lo + hi) / 2.0
        if bs_call(S, K, T, r, mid) > price:
            hi = mid
        else:
            lo = mid
        if hi - lo < tol:
            break
    return (lo + hi) / 2.0


def precheck_black_scholes():
    random.seed(1)
    worst_parity = worst_vega = worst_iv = 0.0
    bounds_ok = mono_ok = True
    ties = 0
    worst_drop = 0.0
    for _ in range(2000):
        S = random.uniform(50, 150)
        K = random.uniform(50, 150)
        T = random.uniform(0.05, 3.0)
        r = random.uniform(0.0, 0.08)
        sig = random.uniform(0.05, 1.0)
        c, p = bs_call(S, K, T, r, sig), bs_put(S, K, T, r, sig)
        # F06
        worst_parity = max(worst_parity, abs(c - p - (S - K * math.exp(-r * T))))
        # 價格邊界（iv-inversion-algorithm 推導第 1 節）
        bounds_ok = bounds_ok and (max(S - K * math.exp(-r * T), 0.0) - 1e-12 <= c <= S + 1e-12)
        # 對 sigma 不遞減。深度價內／價外時 vega 趨近 0，F03 的兩項相減又有捨入誤差，
        # 所以 σ 增加後價格可能完全相等，甚至低 1e-14 左右。這裡容許 1e-9 的數值誤差，
        # 並統計「沒有嚴格上升」的次數與最大的下降幅度。
        c_up = bs_call(S, K, T, r, sig + 0.01)
        mono_ok = mono_ok and c_up >= c - 1e-9
        if c_up <= c:
            ties += 1
            worst_drop = max(worst_drop, c - c_up)
        v = vega(S, K, T, r, sig)
        h = 1e-4
        if v > 1e-6:
            num_c = (bs_call(S, K, T, r, sig + h) - bs_call(S, K, T, r, sig - h)) / (2 * h)
            num_p = (bs_put(S, K, T, r, sig + h) - bs_put(S, K, T, r, sig - h)) / (2 * h)
            worst_vega = max(worst_vega, abs(num_c - v) / v, abs(num_p - v) / v)
        if v > 1e-3:
            worst_iv = max(worst_iv, abs(implied_vol_bisect(c, S, K, T, r) - sig))
    check('F06 put-call parity', worst_parity < 1e-8, f'最大絕對誤差 {worst_parity:.3g}（門檻 1e-8）')
    check('F03 價格邊界', bounds_ok, 'max(S−Ke^(−rT), 0) ≤ C ≤ S')
    check('F03 對 σ 不遞減', mono_ok,
          f'σ 加 0.01 後 call 價格沒有下降超過 1e-9；2000 組中有 {ties} 組沒有嚴格上升'
          f'（vega 趨近 0），最大下降 {worst_drop:.3g}')
    check('F07 vega', worst_vega < 1e-3, f'解析解對中央差分最大相對誤差 {worst_vega:.3g}（門檻 1e-3；只計 vega > 1e-6）')
    check('二分法來回測試', worst_iv < 1e-6, f'最大誤差 {worst_iv:.3g}（門檻 1e-6；只計 vega > 1e-3）')


# ---------- SVI / SSVI ----------

# F13，取 gamma = 1/2 時與 svi-parameterization 的核准設定相同
def phi(theta, eta, gamma):
    return eta / (theta ** gamma * (1.0 + theta) ** (1.0 - gamma))


# F12
def ssvi_w(k, t, sigma0, rho, eta, gamma):
    theta = sigma0 * sigma0 * t
    ph = phi(theta, eta, gamma)
    return theta / 2.0 * (1.0 + rho * ph * k + math.sqrt((ph * k + rho) ** 2 + 1.0 - rho * rho))


# F11
def raw_svi_w(k, a, b, rho, m, sigma):
    return a + b * (rho * (k - m) + math.sqrt((k - m) ** 2 + sigma * sigma))


# F15：g(k)，用中央差分求 w'、w''
def g_function(w, k, h=1e-4):
    w0 = w(k)
    w1 = (w(k + h) - w(k - h)) / (2 * h)
    w2 = (w(k + h) - 2 * w0 + w(k - h)) / (h * h)
    return (1 - k * w1 / (2 * w0)) ** 2 - w1 * w1 / 4 * (1 / w0 + 0.25) + w2 / 2


def precheck_svi():
    # svi-parameterization.md 中經 Itzel 核准的示意參數
    sigma0, rho, eta, gamma = 0.20, -0.7, 1.0, 0.5
    ks = [-1.5 + i * 0.01 for i in range(301)]
    ts = [0.02, 0.05, 0.1, 0.25, 0.5, 1, 2, 3, 5]
    w = lambda k, t: ssvi_w(k, t, sigma0, rho, eta, gamma)  # noqa: E731

    check('F13 參數條件', eta * (1 + abs(rho)) <= 2, f'η(1+|ρ|) = {eta * (1 + abs(rho)):.3g} ≤ 2')
    min_w = min(w(k, t) for k in ks for t in ts)
    check('F12 總變異數非負', min_w >= 0, f'最小值 {min_w:.3g}')
    fine_t = [0.01 * i for i in range(1, 501)]
    min_step = min(w(k, fine_t[i + 1]) - w(k, fine_t[i]) for k in ks[::10] for i in range(len(fine_t) - 1))
    check('F14 日曆條件', min_step >= 0, f'w 對 t 的最小增量 {min_step:.3g}')
    min_g = min(g_function(lambda x, t=t: w(x, t), k) for k in ks for t in ts)
    check('F15 蝶式條件（示意參數）', min_g >= 0, f'g(k) 最小值 {min_g:.3g}')
    atm = math.sqrt(w(0.0, 1.0) / 1.0)
    check('F12 價平波動率', abs(atm - sigma0) < 1e-12, f'k=0、t=1 時 σ = {atm:.6g}（應等於 σ₀ = {sigma0}）')

    # S4 p.10 Example 3.1：論文說這組參數有蝶式套利，g 應出現負值
    a, b, m, r2, s2 = -0.0410, 0.1331, 0.3586, 0.3060, 0.4153
    min_g_vogt = min(g_function(lambda x: raw_svi_w(x, a, b, r2, m, s2), k) for k in ks)
    check('F11＋F15 重現 S4 的反例', min_g_vogt < 0, f'g(k) 最小值 {min_g_vogt:.3g}（論文：負密度清楚可見）')


# ---------- 簡化 ELN ----------

# F08
def eln_payoff(N_, C, K, ST):
    return (N_ + C) - N_ / K * max(K - ST, 0.0)


# F09
def eln_value(N_, C, S, K, T, r, sig):
    return (N_ + C) * math.exp(-r * T) - N_ / K * bs_put(S, K, T, r, sig)


# F17
def eln_fair_coupon(N_, S, K, T, r, sig):
    return N_ * (math.exp(r * T) - 1.0) + N_ / K * bs_put(S, K, T, r, sig) * math.exp(r * T)


def precheck_eln():
    N_, C, K = 100.0, 5.0, 90.0
    check('F08 在 S_T = K 連續', abs(eln_payoff(N_, C, K, K) - eln_payoff(N_, C, K, K - 1e-9)) < 1e-6,
          f'{eln_payoff(N_, C, K, K)} 對 {eln_payoff(N_, C, K, K - 1e-9):.6f}')
    check('F08 在 S_T ≥ K 為 N + C', eln_payoff(N_, C, K, 120.0) == N_ + C, f'{eln_payoff(N_, C, K, 120.0)}')
    check('F08 在 S_T = 0 為 C', eln_payoff(N_, C, K, 0.0) == C, f'{eln_payoff(N_, C, K, 0.0)}')
    check('F08 與條款一致', abs(eln_payoff(N_, C, K, 45.0) - (N_ * 45.0 / K + C)) < 1e-12,
          f'S_T = 45：{eln_payoff(N_, C, K, 45.0)} 對 N·S_T/K + C = {N_ * 45.0 / K + C}')
    prev, increasing, consistent = -1.0, True, True
    for i in range(5, 101, 5):
        sig = i / 100.0
        c = eln_fair_coupon(N_, 100.0, K, 1.0, 0.02, sig)
        increasing = increasing and c > prev
        consistent = consistent and abs(eln_value(N_, c, 100.0, K, 1.0, 0.02, sig) - N_) < 1e-9
        prev = c
    check('F17 隨 σ 遞增', increasing, 'σ 從 0.05 到 1.00')
    check('F17 代回 F09 得到面額', consistent, 'V(C*) = N')


if __name__ == '__main__':
    print('這是公式卡的數值預檢，不是 C3。')
    precheck_black_scholes()
    precheck_svi()
    precheck_eln()
    print(f"\n{'全部通過' if not FAIL else '不通過：' + '、'.join(FAIL)}")
    sys.exit(1 if FAIL else 0)
