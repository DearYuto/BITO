import { apiBaseUrl } from "@/lib/config";

type OrvalResponse<TData> = {
  data: TData;
  status: number;
  headers: Headers;
};

export const customFetch = async <TResponse extends OrvalResponse<unknown>>(
  url: string,
  options: RequestInit = {},
): Promise<TResponse> => {
  const response = await fetch(`${apiBaseUrl}${url}`, options);
  const body = [204, 205, 304].includes(response.status)
    ? null
    : await response.text();
  const data = body
    ? (JSON.parse(body) as TResponse["data"])
    : ({} as TResponse["data"]);

  return {
    data,
    status: response.status,
    headers: response.headers,
  } as TResponse;
};
