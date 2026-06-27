/** Resolve a path in /public against the configured base URL (GitHub Pages subpath). */
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '')
}
