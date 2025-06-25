export type ProbabilityFunction = (
  word: string,
  { type, pattern }: { type: string; pattern: string }
) => number;

export function defaultRandom() {
  return Math.random();
}

// let slugify = (word: string) => word;
// let cromulence;

export function getZeroProbabilityFunction(): ProbabilityFunction {
  return (word, { type, pattern }) => {
    return 0;
  };
}

export function getExtremeProbabilityFunction(): ProbabilityFunction {
  return (word, { type, pattern }) => {
    return 1;
  };
}

export function getNormalProbabilityFunction(): ProbabilityFunction {
  return (word, { type, pattern }) => {
    const firstPattern = pattern.split(",")[0]!;
    return firstPattern.length / 5;
  };
}

export function getKindaProbabilityFunction(): ProbabilityFunction {
  // if (!cromulence) {
  //   const cromulenceModule = await import("cromulence");
  //   const { Cromulence, loadWordlist } = cromulenceModule;
  //   slugify = cromulenceModule.slugify;
  //   const wordlist = await loadWordlist();
  //   cromulence = new Cromulence(wordlist);
  // }
  return (word, { type, pattern }) => {
    // const slug = slugify(word);
    // const info = cromulence.info(slug);
    // return 5 / 1.5 ** info.zipf;
    const firstPattern = pattern.split(",")[0]!;
    switch (type) {
      case "exact":
        return firstPattern.length / 6;
      default:
        return firstPattern.length / 7;
    }
  };
}

export function parseRules(ruleString: string) {
  const lines = ruleString
    .split(/[\r\n]+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const stopWords = new Set<string>();
  const stopPatterns = new Set<string>();
  const exactSubs = new Map<string, string[]>();
  const patternSubs = new Map<string, string[]>();

  for (const line of lines) {
    if (line.startsWith("-")) {
      if (line.includes("*")) {
        stopPatterns.add(line.slice(1));
      } else {
        stopWords.add(line.slice(1));
      }
    }
    const [left, right] = line.split("->").map((side) => side.trim());
    if (left && right) {
      const rightWords = right.split(",");
      if (left.includes("*")) {
        patternSubs.set(left, rightWords);
      } else {
        exactSubs.set(left, rightWords);
      }
    }
  }

  return { stopWords, stopPatterns, exactSubs, patternSubs };
}

export type RuleSet = ReturnType<typeof parseRules>;

function patternToRegex(pattern: string) {
  return new RegExp(`^${pattern}$`.replace(/\*/g, "(.+)"));
}

function patternToFunction(inputPattern: string, outputPattern: string) {
  const okPatterns: string[] = [];
  const antiPatterns: string[] = [];
  for (const pattern of inputPattern.split(",")) {
    if (pattern.startsWith("-")) {
      antiPatterns.push(pattern.slice(1));
    } else {
      okPatterns.push(pattern);
    }
  }
  const okRegexes = okPatterns.map((pattern) => patternToRegex(pattern));
  const antiRegexes = antiPatterns.map((pattern) => patternToRegex(pattern));
  const primaryRegex = okRegexes[0]!;
  let n = 1;
  const subString = outputPattern.replace(/\*/g, () => `$${n++}`);
  return (text: string) => {
    const isMatch =
      okRegexes.every((regex) => regex.test(text)) &&
      !antiRegexes.some((regex) => regex.test(text));
    return {
      match: isMatch,
      output: isMatch ? text.replace(primaryRegex, subString) : text,
    };
  };
}

export function randomChoice<T>(
  array: T[],
  getRandom: () => number = defaultRandom
) {
  const index = Math.floor(getRandom() * array.length);
  return array[index];
}

export function rulesToFunction(
  rules: RuleSet,
  {
    getRandom = defaultRandom,
    getProbability = getNormalProbabilityFunction(),
  }: {
    getRandom?: () => number;
    getProbability?: (
      word: string,
      options: { type: string; pattern: string }
    ) => number;
  } = {}
) {
  const stopPatternFunctions: Array<(word: string) => boolean> = [];
  const patternFunctions: Array<ReturnType<typeof patternToFunction>> = [];

  for (const pattern of rules.stopPatterns) {
    const regex = patternToRegex(pattern);
    const fn = (word: string) => regex.test(word);
    stopPatternFunctions.push(fn);
  }

  for (const [pattern, subs] of rules.patternSubs.entries()) {
    const fns = subs.map((sub) => patternToFunction(pattern, sub));
    const fn = (word: string) => {
      const result = randomChoice(fns, getRandom)!(word);
      if (result.match) {
        const probability = getProbability(word, { type: "pattern", pattern });
        const random = getRandom();
        const shouldSub = random < probability;
        return shouldSub
          ? result
          : {
              match: false,
              output: word,
            };
      } else {
        return result;
      }
    };
    patternFunctions.push(fn);
  }

  return (word: string) => {
    if (!word) {
      return word;
    }

    const normalizedWord = word.toLowerCase();
    const isAllUpper = word === word.toUpperCase();
    const isAllLower = word === normalizedWord;
    const isKindaCapitalized =
      word[0] === word[0].toUpperCase() && !isAllUpper && !isAllLower;

    const matchCase = (output: string) => {
      if (output === normalizedWord) {
        return word;
      } else if (isAllUpper) {
        return output.toUpperCase();
      } else if (isKindaCapitalized) {
        return output[0].toUpperCase() + output.slice(1);
      } else {
        return output;
      }
    };

    if (rules.stopWords.has(normalizedWord)) {
      return word;
    }
    for (const testFn of stopPatternFunctions) {
      if (testFn(normalizedWord)) {
        return word;
      }
    }

    if (rules.exactSubs.has(normalizedWord)) {
      const subs = rules.exactSubs.get(normalizedWord)!;
      const probability = getProbability(word, {
        type: "exact",
        pattern: normalizedWord,
      });
      const random = getRandom();
      const shouldSub = random < probability;
      return shouldSub ? matchCase(randomChoice(subs, getRandom)) : word;
    }

    if (word.length <= 2) {
      return word;
    }

    for (const resultFn of patternFunctions) {
      const result = resultFn(normalizedWord);
      if (result.match) {
        return matchCase(result.output);
      }
    }

    return word;
  };
}
