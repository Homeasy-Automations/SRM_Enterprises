import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  outDir: "dist",
  format: ["cjs"],
  target: "node18",
  platform: "node",
  sourcemap: true,
  clean: true,
  minify: false,
  splitting: false,
  dts: false,
  shims: true,
  external: ["express", "mongoose", "resend", "helmet", "cors", "dotenv", "compression", "pino"],
});
