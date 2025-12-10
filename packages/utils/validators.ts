export function validateCode(code: string): boolean {
  return /^[A-Z0-9]{6}$/.test(code)
}