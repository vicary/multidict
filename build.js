// Using esbuild, bundle src/MultiDict.ts into both ESM and CJS format.

const esbuild = require("esbuild");
const { promises: fs } = require("fs");

const OUTPUT_DIR = "dist/";

const main = async () => {
  try {
    await fs.rm(OUTPUT_DIR, { recursive: true });
  } catch {}

  /**
   * @type {import("esbuild").BuildOptions}
   */
  const buildConfig = {
    bundle: true,
    entryPoints: ["src/MultiDict.ts"],
    minify: true,
    keepNames: true,
    sourcemap: "inline",
  };

  await Promise.all([
    esbuild.build({
      ...buildConfig,
      format: "esm",
      outfile: "dist/MultiDict.mjs",
      platform: "browser",
      target: ["node14"],
    }),
    esbuild.build({
      ...buildConfig,
      format: "cjs",
      outfile: "dist/MultiDict.js",
      platform: "node",
      target: ["node12"],
    }),
  ]);
};

main().catch((e) => {
  throw e;
});
