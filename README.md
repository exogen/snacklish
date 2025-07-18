<a href="https://exogen.github.io/snacklish/"><img src="snacklish.png" alt="Snacklish: Improved Flavor"></a>

# Snacklish

**Now with improved flavor!** [Check out the demo site](https://exogen.github.io/snacklish/)
to handle your flavoryday translation needs.

## Introduction

Snacklish is a delicious language invented for Snickers based on snack-related
wordplay. This library and demo site were created to put English-to-Snacklish
translations back into the mouths of the people.

If you just want to have some quick fun, [use the demo site!](https://exogen.github.io/snacklish/)

For your delectabusiness and enuterprise Snacklish needs, you’ll of chocourse want
to caramakel use of [thelicious library](#installation) directly.

## Why?

To prevent Snacklish from becrumbing a fed language, of course. The original Snacklish
translator has been offline for far chew long. Some attempts were made to chompy
it, but nuttin that I found snackceptable.

## Improvements

Improved flavor, you say? [Chew you havisfaction a singlelicious satisfact to snack that up?](https://www.youtube.com/watch?v=hNUNx319UCM)

- 🆕 New words have been added to the lexicon, like **crave**, **cream**, **crumb**,
  and **melt**.
- 💎 Updated pattern matching to prefer better substitutions.
- 🥴 Some of the linguistically and phonetically questionable choices have been
  removed completely, like little &rarr; snackittle, there &rarr; treatere, yes
  &rarr; yumye, and more.
- 🎲 Randomization is customizable, so you can dial down repetitive output, control
  the chances of substitution based on word frequency, or use a custom algorithm.

## How?

Translation is based on simple pattern-based substitution rules. Automatic phonetic
matching is not attempted. Check out the rules in [snacklish.txt](./src/snacklish.txt).

## Installation

```console
npm install snacklish
```

## Usage

```ts
import { createTranslator } from "snacklish";

const translate = await createTranslator();

translate("hello, world!");
// -> "caramello, chocoworld!"
```

## API

### createTranslator

Return a function that can be used to translate a text document from English to
Snacklish.

```ts
createTranslator(options: {
  getRandom: () => number;
  getProbability: ProbabilityFunction;
}): Promise<TranslatorFunction>
```

### loadRules

Load and parse the default Snacklish ruleset. The result is a ruleset that can
be used with [rulesToFunction](#rulesToFunction).

```ts
loadRules(): Promise<RuleSet>
```

### loadRuleString

Load the default Snacklish document as a string from [snacklish.txt](./src/snacklish.txt).

```ts
loadRuleString(): Promise<string>
```

### parseRules

Parse a string containing substitution rules.

```ts
parseRules(ruleString: string): RuleSet
```

### rulesToFunction

Turn a parsed ruleset into a function that translates a single token at a time.
To translate a document using this function, you will need to call it for each
token and join the results.

```ts
rulesToFunction(
  rules: RuleSet;
  options: {
    getRandom: () => number;
    getProbability: (token: string) => number;
  }
): (token: string) => string
```

### tokenize

Split a text document into tokens using the default tokenizer.

```ts
tokenize(text: string): string[]
```

### Custom Random Source

The `getRandom` option can be used to provide a custom random source (for example,
to supply a seeded PRNG). The default is `Math.random()`.

### Probability Functions

To customize the frequency of substitutions, you may pass a custom “probability
function.” The function will be passed the original token, and must return a
number. If the result of `Math.random()` is less than the number, the token is
replaced. For example, a function that always returns 1 will always substitute;
one that returns 0 will never substitute.

The following exports are included with the library to create probability
functions.

#### getZeroProbabilityFunction

Never substitute.

#### getKindaProbabilityFunction

Substitute sometimes. Shorter patterns are less likely to be substituted, longer
words are more likely.

#### getNormalProbabilityFunction

Substitute sometimes. Shorter patterns are less likely to be substituted, longer
words are more likely.

#### getExtremeProbabilityFunction

Always substitute.

## Disclaimer

This is a fan project and has no affiliation with Snickers, Mars Inc., or TBWA
NY.

Snickers is a registered trademark of Mars Inc.
