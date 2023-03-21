// Using esbuild, bundle src/PolyMap.ts into both ESM and CJS format.

const esbuild = require("esbuild");
const { promises: fs } = require("fs");

const OUTPUT_DIR = "dist/";

const main = async () => {
  await fs.rm(OUTPUT_DIR, { recursive: true });

  await Promise.all([
    esbuild.build({
      bundle: true,
      entryPoints: ["src/PolyMap.ts"],
      format: "esm",
      minify: true,
      outfile: "dist/PolyMap.mjs",
      platform: "browser",
      sourcemap: "inline",
      target: ["es2022"],
    }),
    esbuild.build({
      bundle: true,
      entryPoints: ["src/PolyMap.ts"],
      format: "cjs",
      minify: true,
      outfile: "dist/PolyMap.js",
      platform: "node",
      sourcemap: "inline",
      target: ["node12"],
    }),
  ]);
};

main().catch((e) => {
  throw e;
});
