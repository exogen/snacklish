import cryptoRandomString from "crypto-random-string";
import { loadRuleString } from "../../src";
import { Translator } from "./Translator";

function getAutoRandomSeed() {
  return cryptoRandomString({ length: 6, type: "hex" });
}

export default async function DemoPage() {
  const ruleString = await loadRuleString();

  return (
    <Translator
      ruleString={ruleString}
      defaultRandomSeed={getAutoRandomSeed()}
    />
  );
}
