import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Polyfill legacy RuleContext methods on ESLint 10 FileContext for plugin compatibility
try {
  const fileContextPath = path.resolve(process.cwd(), "node_modules/eslint/lib/linter/file-context.js");
  const { FileContext } = require(fileContextPath);
  if (FileContext && FileContext.prototype) {
    FileContext.prototype.getFilename = function () {
      return this.filename;
    };
    FileContext.prototype.getCwd = function () {
      return this.cwd;
    };
    FileContext.prototype.getPhysicalFilename = function () {
      return this.physicalFilename;
    };
    FileContext.prototype.getSourceCode = function () {
      return this.sourceCode;
    };
  }
} catch {
  // Ignore if not present
}

import nextConfig from "eslint-config-next";

// Explicitly set react version so eslint-plugin-react does not attempt dynamic detection
if (nextConfig[0]?.settings?.react) {
  nextConfig[0].settings.react.version = "19.0.0";
}

// ESLint 10 compatibility shim for Next.js Babel parser scopeManager
if (nextConfig[0]?.languageOptions?.parser?.parseForESLint) {
  const originalParseForESLint = nextConfig[0].languageOptions.parser.parseForESLint;
  nextConfig[0].languageOptions.parser = {
    ...nextConfig[0].languageOptions.parser,
    parseForESLint(...args) {
      const result = originalParseForESLint(...args);
      if (result && result.scopeManager && typeof result.scopeManager.addGlobals !== "function") {
        result.scopeManager.addGlobals = function (names) {
          const globalScope = this.scopes ? this.scopes[0] : this.globalScope;
          for (const name of names) {
            if (!globalScope.set.has(name) && typeof globalScope.__defineGeneric === "function") {
              globalScope.__defineGeneric(name, globalScope.set, globalScope.variables, null, null);
            }
          }
          const namesSet = new Set(names);
          if (Array.isArray(globalScope.through)) {
            globalScope.through = globalScope.through.filter((reference) => {
              const name = reference.identifier?.name;
              if (namesSet.has(name)) {
                const variable = globalScope.set.get(name);
                if (variable) {
                  reference.resolved = variable;
                  if (Array.isArray(variable.references)) {
                    variable.references.push(reference);
                  }
                  return false;
                }
              }
              return true;
            });
          }
        };
      }
      return result;
    },
  };
}

const eslintConfig = [
  ...nextConfig,
  {
    settings: {
      react: {
        version: "19.0.0",
      },
    },
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "warn",
    },
  },
];

export default eslintConfig;
