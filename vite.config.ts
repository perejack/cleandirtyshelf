import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const API_KEY = env.HASHBACK_API_KEY || "";
  const ACCOUNT_ID = env.HASHBACK_ACCOUNT_ID || "";

  return {
    plugins: [react(), tailwindcss(), tsConfigPaths()],
    server: {
      proxy: {
        "/api/initiatestk": {
          target: "https://api.hashback.co.ke",
          changeOrigin: true,
          rewrite: () => "/initiatestk",
          secure: true,
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq, req) => {
              if (req.method === "POST") {
                const originalBody: string[] = [];
                proxyReq.on("data", (chunk: Buffer) => {
                  originalBody.push(chunk.toString());
                });
                proxyReq.on("end", () => {
                  try {
                    const body = JSON.parse(originalBody.join(""));
                    const enrichedBody = JSON.stringify({
                      ...body,
                      api_key: API_KEY,
                      account_id: ACCOUNT_ID,
                    });
                    proxyReq.setHeader("Content-Length", Buffer.byteLength(enrichedBody));
                    proxyReq.write(enrichedBody);
                    proxyReq.end();
                  } catch {
                    proxyReq.end();
                  }
                });
              }
            });
          },
        },
        "/api/transactionstatus": {
          target: "https://api.hashback.co.ke",
          changeOrigin: true,
          rewrite: () => "/transactionstatus",
          secure: true,
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq, req) => {
              if (req.method === "POST") {
                const originalBody: string[] = [];
                proxyReq.on("data", (chunk: Buffer) => {
                  originalBody.push(chunk.toString());
                });
                proxyReq.on("end", () => {
                  try {
                    const body = JSON.parse(originalBody.join(""));
                    const enrichedBody = JSON.stringify({
                      ...body,
                      api_key: API_KEY,
                      account_id: ACCOUNT_ID,
                    });
                    proxyReq.setHeader("Content-Length", Buffer.byteLength(enrichedBody));
                    proxyReq.write(enrichedBody);
                    proxyReq.end();
                  } catch {
                    proxyReq.end();
                  }
                });
              }
            });
          },
        },
      },
    },
  };
});
