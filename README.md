<a href="https://exogen.github.io/snacklish/"><img src="snacklish.png" alt="Snacklish: Improved Flavor"></a>

# Snacklish

**Now with improved flavor!**

“Chew you havisfaction a singlelicious satisfact to snack that up?”

[Check out the demo site](https://exogen.github.io/snacklish/) to handle your flavoryday translation needs.

## Usage

If you just want to have some quick fun, [use the demo site!](https://exogen.github.io/snacklish/)

For your delectabusiness and enuterprise Snacklish needs, you’ll of chocourse want to caramakel use of [thelicious library](#installation) directly.

## Why?

To prevent Snacklish from becrumbing a fed language, of course. The original Snacklish translator has been offline for some time. Some attempts were made to copy it, but nuttin that I found snackceptable.

## Improvements

- 🆕 New words have been added to the lexicon, like **crave**, **cream**, **crumb**, and **melt**.
- 💎 Updated pattern matching to prefer better substitutions.
- 🥴 Some of the linguistically and phonetically questionable choices have been removed completely, like little &rarr; snackittle, there &rarr; treatere, yes &rarr; yumye, and more.
- 🎲 Randomization is customizable, so you can dial down repetitive output, control the chances of substitution based on word frequency, or use a custom algorithm.

## How?

Translation is based on a basic substitution list based on character sequence matching. Automatic phonetic matching is not attempted. Check out the rules in [snacklish.txt](./snacklish.txt).

## Installation

```console
npm install snacklish
```

## API
