import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      target: "http://localhost:8000/openapi.json",
    },
    output: {
      target: "./lib/api/generated.ts",
      client: "react-query",
      httpClient: "fetch",
      clean: false,
      override: {
        mutator: {
          path: "./lib/api/fetcher.ts",
          name: "customFetch",
        },
      },
    },
  },
});
