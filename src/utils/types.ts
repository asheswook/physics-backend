export const OrderTypeValues = ["ORDERED", "COOKING", "COOKED", "SERVED"] as const;
export type OrderType = (typeof OrderTypeValues)[number];
