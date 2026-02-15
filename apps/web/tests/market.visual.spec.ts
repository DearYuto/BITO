import { test, expect } from "@playwright/test";

const fixedNow = new Date("2024-01-15T09:30:00.000Z").getTime();

const walletBalancePayload = {
  data: {
    balances: [
      { asset: "BTC", available: 0.832145 },
      { asset: "USDT", available: 12854.32 },
    ],
  },
};

const ordersPayload = {
  orders: [
    {
      id: "order-1001",
      side: "buy",
      size: 0.15,
      price: 42350.12,
      notional: 6352.52,
      source: "BINANCE",
      baseAsset: "BTC",
      quoteAsset: "USDT",
      status: "filled",
      createdAt: new Date(fixedNow - 120_000).toISOString(),
    },
  ],
};

const orderbookPayload = {
  bids: [
    { price: 42349.5, size: 0.38 },
    { price: 42348.2, size: 0.24 },
    { price: 42347.1, size: 0.5 },
  ],
  asks: [
    { price: 42351.3, size: 0.31 },
    { price: 42352.7, size: 0.42 },
    { price: 42353.9, size: 0.28 },
  ],
};

const tickerPayload = {
  symbol: "BTCUSDT",
  price: 42350.12,
  change24h: 1.45,
  volume24h: 12345.67,
};

const binanceTradesPayload = [
  {
    id: 501,
    price: "42350.12",
    qty: "0.0123",
    time: fixedNow - 18_000,
    isBuyerMaker: false,
  },
  {
    id: 502,
    price: "42349.8",
    qty: "0.021",
    time: fixedNow - 16_000,
    isBuyerMaker: true,
  },
  {
    id: 503,
    price: "42351.1",
    qty: "0.008",
    time: fixedNow - 12_000,
    isBuyerMaker: false,
  },
];

const upbitTradesPayload = [
  {
    trade_price: 60350000,
    trade_volume: 0.035,
    trade_timestamp: fixedNow - 15_000,
    ask_bid: "BID",
    sequential_id: 7001,
  },
  {
    trade_price: 60320000,
    trade_volume: 0.022,
    trade_timestamp: fixedNow - 13_000,
    ask_bid: "ASK",
    sequential_id: 7002,
  },
];

const binanceKlinesPayload = Array.from({ length: 20 }, (_, index) => {
  const offset = (20 - index) * 60_000;
  const openTime = fixedNow - offset;
  const open = 42250 + index * 4;
  const close = open + (index % 2 === 0 ? 6 : -3);
  const high = Math.max(open, close) + 4;
  const low = Math.min(open, close) - 4;
  const volume = 12.5 + index * 0.8;

  return [
    openTime,
    open.toFixed(2),
    high.toFixed(2),
    low.toFixed(2),
    close.toFixed(2),
    volume.toFixed(3),
    0,
    "0",
    0,
    "0",
    "0",
    "0",
  ];
});

const upbitCandlesPayload = Array.from({ length: 20 }, (_, index) => {
  const offset = (20 - index) * 60_000;
  const timestamp = fixedNow - offset;
  const opening_price = 60300000 + index * 5000;
  const trade_price = opening_price + (index % 2 === 0 ? 8000 : -3000);
  const high_price = Math.max(opening_price, trade_price) + 4000;
  const low_price = Math.min(opening_price, trade_price) - 4000;

  return {
    opening_price,
    high_price,
    low_price,
    trade_price,
    timestamp,
    candle_acc_trade_volume: 18 + index * 1.5,
  };
});

const createdOrder = {
  id: "order-1002",
  side: "buy",
  size: 0.2,
  price: 42350.12,
  notional: 8470.02,
  source: "BINANCE",
  baseAsset: "BTC",
  quoteAsset: "USDT",
  status: "filled",
  createdAt: new Date(fixedNow - 30_000).toISOString(),
};

test("market page visual", async ({ page }) => {
  await page.addInitScript(
    ({ fixedNow: now }) => {
      const OriginalDate = Date;
      class MockDate extends OriginalDate {
        constructor(...args) {
          if (args.length === 0) {
            return new OriginalDate(now);
          }
          return new OriginalDate(...args);
        }
        static now() {
          return now;
        }
      }
      MockDate.UTC = OriginalDate.UTC;
      MockDate.parse = OriginalDate.parse;
      MockDate.prototype = OriginalDate.prototype;
      window.Date = MockDate;
    },
    { fixedNow },
  );

  await page.route("**/socket.io/**", async (route) => {
    await route.abort();
  });

  await page.route("**/api/market/**", async (route) => {
    const url = new URL(route.request().url());
    const { pathname } = url;

    if (pathname.endsWith("/ticker")) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(tickerPayload),
      });
      return;
    }

    if (pathname.endsWith("/orderbook")) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(orderbookPayload),
      });
      return;
    }

    if (pathname.endsWith("/trades")) {
      const payload = pathname.includes("/upbit/")
        ? upbitTradesPayload
        : binanceTradesPayload;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(payload),
      });
      return;
    }

    if (pathname.endsWith("/klines")) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(binanceKlinesPayload),
      });
      return;
    }

    if (pathname.endsWith("/upbit")) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(upbitCandlesPayload),
      });
      return;
    }

    await route.abort();
  });

  await page.route("**/wallet/balance", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(walletBalancePayload),
    });
  });

  await page.route("**/orders", async (route) => {
    const request = route.request();
    if (request.method() === "POST") {
      let nextOrder = createdOrder;
      try {
        const payload = request.postDataJSON() as {
          side?: "buy" | "sell";
          size?: number;
          source?: string;
        };
        if (payload && payload.side && payload.size && payload.source) {
          nextOrder = {
            ...createdOrder,
            side: payload.side,
            size: payload.size,
            source: payload.source,
          };
        }
      } catch {
        nextOrder = createdOrder;
      }
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ order: nextOrder }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(ordersPayload),
    });
  });

  await page.goto("/ko/market", { waitUntil: "networkidle" });
  await expect(page).toHaveScreenshot("market-page.png");
});
