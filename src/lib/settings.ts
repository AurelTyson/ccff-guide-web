// Display preferences (text size, contrast), persisted on the device and applied
// to <html> via data-attributes that CSS variables react to.

export type TextSize = 'normal' | 'large' | 'xl'
export type Contrast = 'normal' | 'high'

export interface Settings {
  text: TextSize
  contrast: Contrast
}

const KEY = 'ccff:display'
const DEFAULTS: Settings = { text: 'normal', contrast: 'normal' }

const listeners = new Set<() => void>()

function load(): Settings {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...DEFAULTS }
    const parsed = JSON.parse(raw) as Partial<Settings>
    return {
      text: parsed.text ?? DEFAULTS.text,
      contrast: parsed.contrast ?? DEFAULTS.contrast,
    }
  } catch {
    return { ...DEFAULTS }
  }
}

let current: Settings = load()

export function applySettings(s: Settings = current): void {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.text = s.text
  document.documentElement.dataset.contrast = s.contrast
}

export function getSettings(): Settings {
  return current
}

export function setSettings(patch: Partial<Settings>): void {
  current = { ...current, ...patch }
  try {
    localStorage.setItem(KEY, JSON.stringify(current))
  } catch {
    /* storage unavailable — keep in-memory only */
  }
  applySettings()
  listeners.forEach((l) => l())
}

export function subscribeSettings(cb: () => void): () => void {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

// Apply on import so preferences take effect before React renders (no flash).
applySettings()
