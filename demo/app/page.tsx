import { loadRuleString } from "../../src/index";
import { Translator } from "./Translator";

export default async function DemoPage() {
  const ruleString = await loadRuleString();

  return <Translator ruleString={ruleString} />;
}
