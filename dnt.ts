// Bundle src/MultiDict.ts into both ESM and CJS format.
import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";
import pkg from "./deno.json" with { type: "json" };

await emptyDir("./dnt");

await build({
  entryPoints: ["./src/MultiDict.ts"],
  outDir: "./dnt",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: "multidict",
    version: pkg.version,
    description:
      "MultiDict is a TypeScript implementation of a key-value store that supports multiple keys and values.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/vicary/multidict.git",
    },
    bugs: {
      url: "https://github.com/vicary/multidict/issues",
    },
    keywords: [
      "dictionary",
      "map",
      "object map",
      "array map",
      "graph",
      "two-way association",
      "bidirectional mapping",
      "many to many relationship",
      "multiple keys",
      "multiple values",
    ],
    funding: {
      type: "github",
      url: "https://github.com/sponsors/vicary",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "dnt/LICENSE");
    Deno.copyFileSync("README.md", "dnt/README.md");
  },
});
