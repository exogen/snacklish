"use client";
import React, { useCallback, useMemo, useState, useTransition } from "react";
import {
  getZeroProbabilityFunction,
  getKindaProbabilityFunction,
  getNormalProbabilityFunction,
  getExtremeProbabilityFunction,
  parseRules,
  rulesToFunction,
  tokenize,
} from "../../src/rules";
import styles from "./Translator.module.css";

const probabilityFns = [
  getZeroProbabilityFunction,
  getKindaProbabilityFunction,
  getNormalProbabilityFunction,
  getExtremeProbabilityFunction,
];

function chunkText(text: string, length = 16) {
  const chunks = [];
  const lines = text.split(/([\r\n]+)/).filter(Boolean);
  for (const line of lines) {
    const isContentLine = line.trim() !== "";
    if (isContentLine) {
      let chunk = "";
      const words = line.split(/[ \t]+/);
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (chunk) {
          chunk += " " + word;
        } else {
          chunk = word;
        }
        if (chunk.length >= length) {
          chunks.push(chunk);
          chunk = "";
        }
      }
      if (chunk) {
        chunks.push(chunk);
      }
    } else {
      chunks.push(line);
    }
  }
  return chunks;
}

export function Translator({ ruleString }) {
  const [inputString, setInputString] = useState("");
  const [hungerLevel, setHungerLevel] = useState(2);
  const [isPending, startTransition] = useTransition();
  const [probabilityFunction, setProbabilityFunction] = useState(() =>
    probabilityFns[hungerLevel]()
  );

  const rules = useMemo(() => parseRules(ruleString), [ruleString]);

  const snacklish = useMemo(() => {
    return rulesToFunction(rules, {
      getProbability: probabilityFunction,
    });
  }, [rules, probabilityFunction]);

  const translate = useCallback(
    (inputString) => {
      const tokens = tokenize(inputString);
      const outputString = tokens.map(snacklish).join("");
      return outputString;
    },
    [inputString, snacklish]
  );

  const isAllUpperCase = useMemo(
    () => inputString === inputString.toUpperCase(),
    [inputString]
  );

  const outputString = useMemo(() => {
    const outputText = translate(inputString.trim().toLowerCase());
    return isAllUpperCase ? outputText.toUpperCase() : outputText;
  }, [translate, inputString, isAllUpperCase]);

  const chunks = useMemo(() => chunkText(outputString), [outputString]);

  return (
    <form className={styles.Translator}>
      <header>
        <div className={styles.Title}>
          <h1>
            <span className={styles.Bar}>Snacklish</span>
          </h1>
          <h2>Improved flavor!</h2>
        </div>
        <div className={styles.Controls}>
          <label htmlFor="hungerLevel">Hunger Level</label>
          <input
            id="hungerLevel"
            type="range"
            min={1}
            max={3}
            value={hungerLevel}
            onChange={(event) => {
              const value = +event.target.value;
              setHungerLevel(value);
              startTransition(async () => {
                const fn = await probabilityFns[value]();
                startTransition(() => {
                  setProbabilityFunction(() => fn);
                });
              });
            }}
          />
        </div>
      </header>
      <div className={styles.Texts}>
        <div className={styles.Input}>
          <textarea
            className={styles.InputText}
            cols={80}
            rows={10}
            value={inputString}
            onChange={(event) => {
              setInputString(event.target.value);
            }}
          />
        </div>
        <div className={styles.Output}>
          <output className={styles.OutputText}>
            {chunks.map((chunk, i) =>
              chunk.trim() ? (
                <React.Fragment key={i}>
                  <span className={styles.Bar}>{chunk}</span>
                  {chunks[i + 1] && chunks[i + 1].trim() ? " " : ""}
                </React.Fragment>
              ) : (
                chunk
              )
            )}
          </output>
        </div>
      </div>
    </form>
  );
}
