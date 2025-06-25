import type { Metadata } from "next";
import cryptoRandomString from "crypto-random-string";
import { loadRuleString } from "../../src";
import { Translator } from "./Translator";

export const metadata: Metadata = {
  title: "Snacklish: Improved Flavor!",
  description: "Snacklish translator.",
};

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
