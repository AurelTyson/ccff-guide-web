// DFCI carroyage conversion — WGS84 ⇄ Lambert II étendu ⇄ DFCI grid code.
//
// Forward ported from the production reference https://github.com/ptro46/GPS-DFCI,
// verified exactly (incl. sub-zone) against the official TPM ArcGIS DFCI 2 km layer:
//   Toulon (43.12569, 5.93048) → KC88G9.4 · La Seyne (43.10440, 5.88300) → KC88E7.2
//   Hyères (43.12030, 6.12860) → LC08E9.3 · Le Pradet (43.10560, 6.02300) → LC08A8.4
//   Montpellier (43.61092, 3.87723) → HD24C3.5  (matches the app's carroyage map: HD24)
//
// `lambert2eToWgs84` is the analytic inverse; it round-trips with `wgs84ToLambert2e`
// to < 1 mm across the Hérault. The WGS84↔NTF datum shift uses the IGN 3-parameter
// translation (±168, ±60, ∓320) — accurate to a few metres, negligible vs a 2 km cell. No deps.

export interface Lambert {
  x: number
  y: number
}
export interface LatLon {
  lat: number
  lon: number
}

// Lambert II étendu constants
const N0 = 0.7289686274
const C0 = 11745793.39
const XS = 600000.0
const YS = 8199695.768
const LAMBDA0 = 0.04079234433198 // Paris meridian, radians
// Clarke 1880 IGN (NTF)
const A_N = 6378249.2
const B_N = 6356515.0
const E2_N = (A_N * A_N - B_N * B_N) / (A_N * A_N)
const E_N = Math.sqrt(E2_N)
// WGS84
const A_W = 6378137.0
const B_W = 6356752.314
const E2_W = (A_W * A_W - B_W * B_W) / (A_W * A_W)

/** WGS84 (lat, lon in degrees) → Lambert II étendu (metres). */
export function wgs84ToLambert2e(lat: number, lon: number): Lambert {
  const lambdaW = (lon * Math.PI) / 180
  const phiW = (lat * Math.PI) / 180

  const N = A_W / Math.sqrt(1 - E2_W * Math.sin(phiW) ** 2)
  const Xw = N * Math.cos(phiW) * Math.cos(lambdaW)
  const Yw = N * Math.cos(phiW) * Math.sin(lambdaW)
  const Zw = N * (1 - E2_W) * Math.sin(phiW)

  const Xn = Xw + 168
  const Yn = Yw + 60
  const Zn = Zw - 320

  const rxy = Math.sqrt(Xn * Xn + Yn * Yn)
  const nextP = (p: number): number =>
    Math.atan(
      Zn /
        rxy /
        (1 -
          (A_N * E2_N * Math.cos(p)) /
            Math.sqrt(rxy * rxy * (1 - E2_N * Math.sin(p) ** 2))),
    )
  let p0 = Math.atan((Zn / rxy) * (1 - (A_N * E2_N) / Math.sqrt(rxy * rxy + Zn * Zn)))
  let p1 = nextP(p0)
  let guard = 0
  while (Math.abs(p1 - p0) >= 1e-11 && guard++ < 100) {
    p0 = p1
    p1 = nextP(p0)
  }
  const phiN = p1
  const lambdaN = Math.atan(Yn / Xn)

  const L = Math.log(
    Math.tan(Math.PI / 4 + phiN / 2) *
      ((1 - E_N * Math.sin(phiN)) / (1 + E_N * Math.sin(phiN))) ** (E_N / 2),
  )
  return {
    x: XS + C0 * Math.exp(-N0 * L) * Math.sin(N0 * (lambdaN - LAMBDA0)),
    y: YS - C0 * Math.exp(-N0 * L) * Math.cos(N0 * (lambdaN - LAMBDA0)),
  }
}

/** Lambert II étendu (metres) → WGS84 (lat, lon in degrees). Inverse of the above. */
export function lambert2eToWgs84(x: number, y: number): LatLon {
  const dx = x - XS
  const dy = y - YS
  const R = Math.hypot(dx, dy)
  const gamma = Math.atan2(dx, -dy)
  const lambdaN = LAMBDA0 + gamma / N0
  const L = -(1 / N0) * Math.log(R / C0)

  // geodetic latitude from isometric latitude (NTF/Clarke)
  let phi = 2 * Math.atan(Math.exp(L)) - Math.PI / 2
  for (let i = 0; i < 50; i++) {
    const next =
      2 *
        Math.atan(
          Math.exp(L) *
            ((1 + E_N * Math.sin(phi)) / (1 - E_N * Math.sin(phi))) ** (E_N / 2),
        ) -
      Math.PI / 2
    if (Math.abs(next - phi) < 1e-12) {
      phi = next
      break
    }
    phi = next
  }

  // NTF geographic → NTF cartesian
  const Nn = A_N / Math.sqrt(1 - E2_N * Math.sin(phi) ** 2)
  const Xn = Nn * Math.cos(phi) * Math.cos(lambdaN)
  const Yn = Nn * Math.cos(phi) * Math.sin(lambdaN)
  const Zn = Nn * (1 - E2_N) * Math.sin(phi)

  // reverse datum shift → WGS84 cartesian
  const Xw = Xn - 168
  const Yw = Yn - 60
  const Zw = Zn + 320

  // WGS84 cartesian → geographic (iterative)
  const lon = Math.atan2(Yw, Xw)
  const p = Math.hypot(Xw, Yw)
  let ph = Math.atan2(Zw, p * (1 - E2_W))
  for (let i = 0; i < 50; i++) {
    const Nw = A_W / Math.sqrt(1 - E2_W * Math.sin(ph) ** 2)
    const ph2 = Math.atan2(Zw + E2_W * Nw * Math.sin(ph), p)
    if (Math.abs(ph2 - ph) < 1e-12) {
      ph = ph2
      break
    }
    ph = ph2
  }
  return { lat: (ph * 180) / Math.PI, lon: (lon * 180) / Math.PI }
}

const ABC = 'ABCDEFGHKLMN012345678902468'

export interface DfciCode {
  /** 2 km cell, 6 chars, e.g. "HD24C3" */
  code2km: string
  /** "chasse" sub-zone 1..5, or null on a cell boundary */
  subZone: number | null
  /** full code, e.g. "HD24C3.4" */
  full: string
}

/** Lambert II étendu (metres) → DFCI code, or null outside metropolitan France. */
export function lambertToDFCI(fx: number, fy: number): DfciCode | null {
  const x = Math.round(fx)
  let y = Math.round(fy)
  if (x <= 0 || x >= 1200000 || y <= 1600000 || y >= 2700000) return null
  y -= 1600000

  const X100 = Math.floor(x / 100000)
  const Y100 = Math.floor(y / 100000)
  let code = ABC[X100] + ABC[Y100 + 1]

  let xt = x - X100 * 100000
  let yt = y - Y100 * 100000
  const X20 = Math.floor(xt / 20000)
  const Y20 = Math.floor(yt / 20000)
  code += ABC[X20 + 22] + ABC[Y20 + 22]

  xt -= X20 * 20000
  yt -= Y20 * 20000
  const X2 = Math.floor(xt / 2000)
  const Y2 = Math.floor(yt / 2000)
  code += ABC[X2] + ABC[Y2 + 12]

  xt -= X2 * 2000
  yt -= Y2 * 2000
  let subZone: number | null = null
  if (xt > 500 && xt < 1500 && yt > 500 && yt < 1500) subZone = 5
  else if (xt < 1000 && yt > 1000) subZone = 1
  else if (xt < 1000 && yt < 1000) subZone = 4
  else if (xt > 1000 && yt > 1000) subZone = 2
  else if (xt > 1000 && yt < 1000) subZone = 3

  return { code2km: code, subZone, full: subZone ? `${code}.${subZone}` : code }
}

/** WGS84 (lat, lon) → DFCI grid code, or null outside metropolitan France. */
export function toDFCI(lat: number, lon: number): DfciCode | null {
  const { x, y } = wgs84ToLambert2e(lat, lon)
  return lambertToDFCI(x, y)
}
