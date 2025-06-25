"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import seedrandom from "seedrandom";
import cryptoRandomString from "crypto-random-string";
import {
  getZeroProbabilityFunction,
  getKindaProbabilityFunction,
  getNormalProbabilityFunction,
  getExtremeProbabilityFunction,
  parseRules,
  rulesToFunction,
  tokenize,
} from "../../src";
import { Controls } from "./Controls";
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
        let newChunk = chunk ? chunk + " " + word : word;
        if (newChunk.length > length) {
          if (chunk) {
            chunks.push(chunk);
            chunk = word;
          } else {
            chunks.push(newChunk);
            chunk = "";
          }
        } else if (newChunk.length === length) {
          chunks.push(newChunk);
          chunk = "";
        } else {
          chunk = newChunk;
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

function getAutoRandomSeed() {
  return cryptoRandomString({ length: 6, type: "hex" });
}

export function Translator({ ruleString, defaultRandomSeed }) {
  const [layout, setLayout] = useState("rows");
  const [inputString, setInputString] = useState("");
  const [autoRandomSeed, setAutoRandomSeed] = useState(defaultRandomSeed);
  const [customRandomSeed, setCustomRandomSeed] = useState("");
  const [barSize, setBarSize] = useState(18);
  const [hungerLevel, setHungerLevel] = useState(2);
  const [probabilityFunction, setProbabilityFunction] = useState(() =>
    probabilityFns[hungerLevel]()
  );

  const randomSeed = customRandomSeed || autoRandomSeed;

  const getRandom = useMemo(() => {
    return seedrandom(randomSeed);
  }, [inputString, randomSeed, hungerLevel, probabilityFunction]);

  const rules = useMemo(() => parseRules(ruleString), [ruleString]);

  const snacklish = useMemo(() => {
    return rulesToFunction(rules, {
      getRandom,
      getProbability: probabilityFunction,
    });
  }, [rules, getRandom, probabilityFunction]);

  const translate = useCallback(
    (inputString) => {
      const tokens = tokenize(inputString);
      const outputString = tokens.map(snacklish).join("");
      return outputString;
    },
    [inputString, snacklish]
  );

  const outputString = useMemo(() => {
    const outputText = translate(inputString.trim());
    return outputText;
  }, [translate, inputString]);

  const chunks = useMemo(
    () => chunkText(outputString, barSize),
    [outputString, barSize]
  );

  useEffect(() => {
    let cancelled = false;

    const loadProbabilityFn = async () => {
      const fn = await probabilityFns[hungerLevel]();
      if (!cancelled) {
        setProbabilityFunction(() => fn);
      }
    };

    loadProbabilityFn();

    return () => {
      cancelled = true;
    };
  }, [hungerLevel]);

  return (
    <form className={styles.Translator}>
      <header className={styles.Header}>
        <div className={styles.Title}>
          <h1>
            <span className={styles.Bar}>Snacklish</span>
          </h1>
          <h2>Improved flavor!</h2>
        </div>
        <Controls
          layout={layout}
          setLayout={setLayout}
          barSize={barSize}
          setBarSize={setBarSize}
          hungerLevel={hungerLevel}
          setHungerLevel={setHungerLevel}
          autoRandomSeed={autoRandomSeed}
          customRandomSeed={customRandomSeed}
          setCustomRandomSeed={setCustomRandomSeed}
          setProbabilityFunction={setProbabilityFunction}
        />
      </header>
      <div className={styles.Texts} data-layout={layout}>
        <div className={styles.Input}>
          <textarea
            autoFocus
            className={styles.InputText}
            cols={30}
            rows={2}
            value={inputString}
            placeholder="Type anything here"
            onChange={(event) => {
              setInputString(event.target.value);
              if (!event.target.value) {
                setAutoRandomSeed(getAutoRandomSeed());
              }
            }}
          />
        </div>
        <div className={styles.Output}>
          <output className={styles.OutputText} key={outputString}>
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
