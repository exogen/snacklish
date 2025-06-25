import { rulesToFunction, ProbabilityFunction, parseRules } from "./rules";

export async function loadRuleString() {
  const ruleStringModule = await import("./snacklish.txt?raw");
  return ruleStringModule.default;
}

export async function loadRules() {
  const ruleString = await loadRuleString();
  return parseRules(ruleString);
}

export function tokenize(text: string) {
  return text.split(/(n['’]t|\W+)/);
}

export type TranslatorFunction = (text: string) => string;

export async function createTranslator({
  getRandom,
  getProbability,
}: {
  getRandom?: () => number;
  getProbability?: ProbabilityFunction;
} = {}): Promise<TranslatorFunction> {
  const rules = await loadRules();
  const translateToken = rulesToFunction(rules, { getRandom, getProbability });

  return (text: string) => {
    const tokens = tokenize(text);
    return tokens.map(translateToken).join("");
  };
}

export * from "./rules";
