// Earnings estimate, shared by the build (default numbers) and the browser (live updates).

export interface EstimateInput {
  price: number; // KWD per nail-art set
  sets: number; // sets per day
  days: number; // working days a month
  monthly: boolean; // monthly plan (true) or paid upfront (false)
  plan: number; // monthly plan, KWD
  cartridge: number; // cartridge cost per set, KWD
}

export interface Estimate {
  revenue: number;
  running: number;
  left: number;
  /** Sets a month that cover the plan; null when the price doesn't cover the cartridge cost. */
  breakEven: number | null;
}

export function estimate({ price, sets, days, monthly, plan, cartridge }: EstimateInput): Estimate {
  const setsPerMonth = sets * days;
  const revenue = price * setsPerMonth;
  const running = (monthly ? plan : 0) + cartridge * setsPerMonth;
  const margin = price - cartridge;
  const breakEven = margin > 0 ? Math.ceil(plan / margin) : null;
  return { revenue, running, left: revenue - running, breakEven };
}
