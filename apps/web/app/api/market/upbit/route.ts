import { NextRequest } from "next/server";

const UPBIT_BASE_URL = "https://api.upbit.com/v1/candles/minutes/1";
const DEFAULT_MARKET = "KRW-BTC";
const DEFAULT_COUNT = 200;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const market = searchParams.get("market") ?? DEFAULT_MARKET;
  const countParam = searchParams.get("count");
  const parsedCount = countParam ? Number(countParam) : DEFAULT_COUNT;
  const count = Number.isFinite(parsedCount)
    ? Math.min(Math.max(Math.floor(parsedCount), 1), 200)
    : DEFAULT_COUNT;

  const url = new URL(UPBIT_BASE_URL);
  url.searchParams.set("market", market.toUpperCase());
  url.searchParams.set("count", String(count));

  try {
    const response = await fetch(url, {
      next: { revalidate: 5 },
    });

    if (!response.ok) {
      return Response.json(
        { error: "Failed to fetch market data" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 502 },
    );
  }
}
