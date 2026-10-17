// Counted nouns. Numbers always use Western digits, in both languages.

export const enCount = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export interface ArForms {
  /** n = 1, e.g. "ثانية واحدة" */
  one: string;
  /** n = 2, the dual, e.g. "ثانيتين" */
  two: string;
  /** n = 3–10, the plural, e.g. "ثوانٍ" */
  few: string;
  /** n ≥ 11, the singular accusative, e.g. "ثانية" */
  many: string;
}

export const arCount = (n: number, f: ArForms) => {
  if (n === 1) return f.one;
  if (n === 2) return f.two;
  const mod = n % 100;
  if (mod >= 3 && mod <= 10) return `${n} ${f.few}`;
  return `${n} ${f.many}`;
};

export const ar = {
  seconds: { one: 'ثانية واحدة', two: 'ثانيتين', few: 'ثوانٍ', many: 'ثانية' },
  minutes: { one: 'دقيقة واحدة', two: 'دقيقتين', few: 'دقائق', many: 'دقيقة' },
  hours: { one: 'ساعة واحدة', two: 'ساعتين', few: 'ساعات', many: 'ساعة' },
  months: { one: 'شهر واحد', two: 'شهرين', few: 'أشهر', many: 'شهراً' },
  sets: { one: 'مجموعة واحدة', two: 'مجموعتين', few: 'مجموعات', many: 'مجموعة' },
} satisfies Record<string, ArForms>;

/** KWD amounts: "KWD 100" in English, "100 د.ك" in Arabic. */
export const kwd = (n: number, lang: 'en' | 'ar') => {
  const num = n.toLocaleString('en-US', { maximumFractionDigits: 2 });
  return lang === 'ar' ? `${num} د.ك` : `KWD ${num}`;
};
