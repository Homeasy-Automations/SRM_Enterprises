import { defineConfig } from "tsup";

/**
 * The workspace packages (@srm/*) ship TypeScript source, so they are bundled in
 * rather than externalised — the production bundle is a self-contained dist/server.js.
 */
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
  noExternal: ["@srm/shared", "@srm/config", "@srm/types"],
  external: ["express", "mongoose", "resend", "helmet", "cors", "dotenv", "compression", "pino"],
});
