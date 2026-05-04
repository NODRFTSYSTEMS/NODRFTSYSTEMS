export type BilingualText = { en: string; es: string };

export type Locale = "en" | "es";

export function pick<T extends { en: string; es: string }>(
  field: T,
  locale: Locale
): string {
  return field[locale];
}
