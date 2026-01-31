export type OrderSide = "BUY" | "SELL";

export type OrderStatus = "PENDING" | "COMPLETED" | "CANCELLED";

export interface Order {
  id: string;
  side: OrderSide;
  symbol: string;
  amount: number;
  price: number;
  status: OrderStatus;
  timestamp: number;
}
