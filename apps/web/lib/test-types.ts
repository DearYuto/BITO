import { Order } from "@repo/types";

export const testOrder: Order = {
  id: "1",
  side: "BUY",
  symbol: "BTC/USDT",
  amount: 0.1,
  price: 50000,
  status: "PENDING",
  timestamp: Date.now(),
};
