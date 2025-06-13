import { readFile } from "node:fs/promises";
import { Translator } from "./Translator";

async function loadRuleString() {
  const ruleString = await readFile("./snacklish.txt", "utf8");
  return ruleString;
}

export default async function DemoPage() {
  const ruleString = await loadRuleString();

  return <Translator ruleString={ruleString} />;
}
