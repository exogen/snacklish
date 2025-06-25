import { readFileSync } from "node:fs";
import { inspect } from "node:util";
import nlp from "compromise";
// import syllablesPlugin from "compromise-syllables";
import speechPlugin from "compromise-speech";

type JsonDoc = Array<{
  text: string;
  terms: Array<{
    text: string;
    tags: string[];
    syllables: string[];
    soundsLike: string;
    pre: string;
    post: string;
  }>;
}>;

nlp.extend(speechPlugin);

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const domainWords = readFileSync("./words.txt", "utf8")
  .split(/\s+/)
  .map((word) => word.trim());

const domainDoc = nlp(domainWords.join(" "));
domainDoc.compute("syllables");
domainDoc.compute("soundsLike");

const domainJson: JsonDoc[0] = domainDoc.json()[0];

const hardCodedReplacements = new Map<string, string[]>([
  ["back", ["back", "backcap"]],
  ["frisk", ["disc"]],
  ["front", ["front", "frontgrab"]],
  ["have", ["have", "hof", "vehave"]],
  ["having", ["having", "hoffing", "vehaving"]],
  ["made", ["madium", "made", "madeair"]],
  ["miss", ["miss", "mistcane"]],
  ["missed", ["mistcane"]],
  ["one", ["one", "gun"]],
  ["key", ["ski"]],
  ["riddance", ["raindance"]],
  ["risk", ["disc"]],
  ["then", ["gen", "thaen", "thenergy"]],
  ["whisk", ["disc"]],
  ["you", ["youmir"]],
  ["your", ["your", "yourollercoaster"]],
]);

let inputDoc = nlp(process.argv[2]);
inputDoc.compute("syllables");
inputDoc.compute("soundsLike");

const inputJson: JsonDoc = inputDoc.json();

const output: string[] = [];
for (const sentence of inputJson) {
  for (const token of sentence.terms) {
    if (
      token.text.length > 2 &&
      token.text.toLowerCase() !== "i'll" &&
      token.text !== "did" &&
      token.text !== "the" &&
      token.text !== "and" &&
      token.text !== "with" &&
      token.text !== "this" &&
      token.text !== "it's"
    ) {
      const replacements = hardCodedReplacements.get(token.text);
      if (replacements) {
        const replacement = randomChoice(replacements);
        output.push(`${token.pre}${replacement}${token.post}`);
        continue;
      }
      if (token.syllables.length === 1 && Math.random() < 0.3) {
        if (token.tags.includes("Adjective")) {
          output.push(`${token.pre}${token.text}crossing${token.post}`);
          continue;
        } else if (token.tags.includes("Noun")) {
          if (token.text.startsWith("st") && !token.text.endsWith("nge")) {
            output.push(`${token.pre}${token.text}henge${token.post}`);
            continue;
          } else {
            output.push(`${token.pre}${token.text}dance${token.post}`);
            continue;
          }
        }
      }
      const firstSyllable = token.syllables[0];
      const lastSyllable = token.syllables[token.syllables.length - 1];
      const firstSyllableStart = firstSyllable.slice(0, 3);
      const lastSyllableEnd = lastSyllable.slice(-3);
      const soundsLikeStart = token.soundsLike.slice(0, 3);
      const soundsLikeEnd = token.soundsLike.slice(-3);
      // console.log(inspect(token, { depth: Infinity, colors: true }));
      const allMatches: JsonDoc[0]["terms"] = [];
      const perfectSoundsLikeMatches = domainJson.terms.filter(
        (domainToken) => domainToken.soundsLike === token.soundsLike
      );
      allMatches.push(...perfectSoundsLikeMatches);
      const headMatches = domainJson.terms
        .map((domainToken) => {
          if (
            domainToken.syllables[domainToken.syllables.length - 1] ===
            firstSyllable
          ) {
            return {
              text: domainToken.syllables.slice(0, -1).join("") + token.text,
            };
          }
          let endSize =
            firstSyllable.startsWith("sh") ||
            firstSyllable.startsWith("th") ||
            domainToken.text.endsWith("ng")
              ? 2
              : 1;
          if (
            domainToken.syllables[domainToken.syllables.length - 1].slice(
              -endSize
            ) === firstSyllable.slice(0, endSize)
          ) {
            return {
              text: domainToken.text.slice(0, -endSize) + token.text,
            };
          }
        })
        .filter(Boolean);
      allMatches.push(...headMatches);
      if (!token.text.endsWith("e")) {
        const tailMatches = domainJson.terms
          .map((domainToken) => {
            if (domainToken.syllables[0] === lastSyllable) {
              return {
                text: token.syllables.slice(0, -1).join("") + domainToken.text,
              };
            }
            if (
              domainToken.syllables[0].slice(0, 2) === lastSyllable.slice(-2)
            ) {
              return {
                text: token.text.slice(0, -2) + domainToken.text,
              };
            }
          })
          .filter(Boolean);
        allMatches.push(...tailMatches);
      }

      if (allMatches.length > 0 && Math.random() < 0.8) {
        const choice = randomChoice(allMatches);
        output.push(`${token.pre}${choice.text}${token.post}`);
      } else {
        output.push(`${token.pre}${token.text}${token.post}`);
      }
    } else {
      output.push(`${token.pre}${token.text}${token.post}`);
    }
  }
}

console.log(output.join(""));
