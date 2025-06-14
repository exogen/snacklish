import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFile } from "node:fs/promises";
import {
  tokenize,
  rulesToFunction,
  getNormalProbabilityFunction,
  ProbabilityFunction,
  parseRules,
} from "./rules";

export type TranslatorFunction = (text: string) => string;

export async function loadRuleString() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const rulesFilename = join(__dirname, "../snacklish.txt");
  const text = await readFile(rulesFilename, "utf8");
  return text;
}

export async function loadRules() {
  const ruleString = await loadRuleString();
  return parseRules(ruleString);
}

export async function createTranslator({
  getProbability = getNormalProbabilityFunction(),
}: {
  getProbability?: ProbabilityFunction;
} = {}) {
  const rules = await loadRules();
  const translateToken = rulesToFunction(rules, { getProbability });

  return (text: string) => {
    const tokens = tokenize(text);
    return tokens.map(translateToken).join("");
  };
}

export * from "./rules";
