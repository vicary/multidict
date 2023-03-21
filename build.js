// Using esbuild, bundle src/MultiDict.ts into both ESM and CJS format.

const esbuild = require("esbuild");
const { promises: fs } = require("fs");

const OUTPUT_DIR = "dist/";

const main = async () => {
  try {
    await fs.rm(OUTPUT_DIR, { recursive: true });
  } catch {}

  await Promise.all([
    esbuild.build({
      bundle: true,
      entryPoints: ["src/MultiDict.ts"],
      format: "esm",
      minify: true,
      outfile: "dist/MultiDict.mjs",
      platform: "browser",
      sourcemap: "inline",
      target: ["es2022"],
    }),
    esbuild.build({
      bundle: true,
      entryPoints: ["src/MultiDict.ts"],
      format: "cjs",
      minify: true,
      outfile: "dist/MultiDict.js",
      platform: "node",
      sourcemap: "inline",
      target: ["node12"],
    }),
  ]);
};

main().catch((e) => {
  throw e;
});
