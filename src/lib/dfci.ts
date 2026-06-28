// DFCI carroyage conversion — WGS84 → Lambert II étendu → DFCI grid code.
//
// Ported from the production reference https://github.com/ptro46/GPS-DFCI and
// verified exactly (incl. sub-zone) against the official TPM ArcGIS DFCI 2 km layer:
//   Toulon       (43.12569, 5.93048) → KC88G9.4
//   La Seyne     (43.10440, 5.88300) → KC88E7.2
//   Hyères       (43.12030, 6.12860) → LC08E9.3
//   Le Pradet    (43.10560, 6.02300) → LC08A8.4
//   Montpellier  (43.61092, 3.87723) → HD24C3.5  (matches the app's carroyage map: HD24)
//
// The WGS84→NTF datum shift uses the IGN 3-parameter translation (+168,+60,−320),
// accurate to a few metres — negligible vs a 2 km cell and GPS error. No deps.

export interface Lambert {
  x: number
  y: number
}

/** WGS84 (lat, lon in degrees) → Lambert II étendu (metres). */
export function wgs84ToLambert2e(lat: number, lon: number): Lambert {
  const lambdaW = (lon * Math.PI) / 180
  const phiW = (lat * Math.PI) / 180

  // WGS84 geographic → WGS84 cartesian
  const aW = 6378137.0
  const bW = 6356752.314
  const e2W = (aW * aW - bW * bW) / (aW * aW)
  const N = aW / Math.sqrt(1 - e2W * Math.sin(phiW) ** 2)
  const Xw = N * Math.cos(phiW) * Math.cos(lambdaW)
  const Yw = N * Math.cos(phiW) * Math.sin(lambdaW)
  const Zw = N * (1 - e2W) * Math.sin(phiW)

  // WGS84 → NTF cartesian (IGN 3-parameter translation)
  const Xn = Xw + 168
  const Yn = Yw + 60
  const Zn = Zw - 320

  // NTF cartesian → NTF geographic (Clarke 1880 IGN), iterative
  const aN = 6378249.2
  const bN = 6356515.0
  const e2N = (aN * aN - bN * bN) / (aN * aN)
  const eN = Math.sqrt(e2N)
  const rxy = Math.sqrt(Xn * Xn + Yn * Yn)
  const nextP = (p: number): number =>
    Math.atan(
      Zn /
        rxy /
        (1 -
          (aN * e2N * Math.cos(p)) /
            Math.sqrt(rxy * rxy * (1 - e2N * Math.sin(p) ** 2))),
    )
  let p0 = Math.atan((Zn / rxy) * (1 - (aN * e2N) / Math.sqrt(rxy * rxy + Zn * Zn)))
  let p1 = nextP(p0)
  let guard = 0
  while (Math.abs(p1 - p0) >= 1e-11 && guard++ < 100) {
    p0 = p1
    p1 = nextP(p0)
  }
  const phiN = p1
  const lambdaN = Math.atan(Yn / Xn)

  // NTF geographic → Lambert II étendu
  const n = 0.7289686274
  const c = 11745793.39
  const Xs = 600000.0
  const Ys = 8199695.768
  const lambda0 = 0.04079234433198 // Paris meridian, radians
  const L = Math.log(
    Math.tan(Math.PI / 4 + phiN / 2) *
      ((1 - eN * Math.sin(phiN)) / (1 + eN * Math.sin(phiN))) ** (eN / 2),
  )
  const x = Xs + c * Math.exp(-n * L) * Math.sin(n * (lambdaN - lambda0))
  const y = Ys - c * Math.exp(-n * L) * Math.cos(n * (lambdaN - lambda0))
  return { x, y }
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

/** WGS84 (lat, lon) → DFCI grid code, or null outside metropolitan France. */
export function toDFCI(lat: number, lon: number): DfciCode | null {
  const { x: fx, y: fy } = wgs84ToLambert2e(lat, lon)
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
