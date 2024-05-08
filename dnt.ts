// Bundle src/mod.ts into both ESM and CJS format.
import { build, emptyDir } from "@deno/dnt";
import pkg from "./deno.json" with { type: "json" };

await emptyDir("./dnt");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./dnt",
  shims: {
    deno: false,
  },
  package: {
    // package.json properties
    name: "multidict",
    version: pkg.version,
    description: pkg.description,
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
