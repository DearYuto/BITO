import { NextRequest } from "next/server";
import { UPBIT_TRADES_BASE_URL } from "@/lib/server/market-endpoints";

const DEFAULT_MARKET = "KRW-BTC";
const DEFAULT_COUNT = 50;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const market = (searchParams.get("market") ?? DEFAULT_MARKET).toUpperCase();
  const countParam = searchParams.get("count");
  const parsedCount = countParam ? Number(countParam) : DEFAULT_COUNT;
  const count = Number.isFinite(parsedCount)
    ? Math.min(Math.max(Math.floor(parsedCount), 1), 200)
    : DEFAULT_COUNT;

  const url = new URL(UPBIT_TRADES_BASE_URL);
  url.searchParams.set("market", market);
  url.searchParams.set("count", String(count));

  try {
    const response = await fetch(url, { next: { revalidate: 2 } });

    if (!response.ok) {
      return Response.json(
        { error: "Failed to fetch trades" },
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
