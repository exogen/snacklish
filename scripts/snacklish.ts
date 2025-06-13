import { readFileSync } from "node:fs";
import { parseArgs } from "node:util";
import {
  getExtremeProbabilityFunction,
  getKindaProbabilityFunction,
  getNormalProbabilityFunction,
  getZeroProbabilityFunction,
  parseRules,
  rulesToFunction,
  tokenize,
} from "../src/rules";

const { values, positionals } = parseArgs({
  options: {
    level: {
      type: "string",
      default: "2",
    },
  },
  allowPositionals: true,
});

const hungerLevel = +values.level;

const probabilityFns = [
  getZeroProbabilityFunction,
  getKindaProbabilityFunction,
  getNormalProbabilityFunction,
  getExtremeProbabilityFunction,
];

const ruleString = readFileSync("./snacklish.txt", "utf8");
const rules = parseRules(ruleString);
const getProbability = await probabilityFns[hungerLevel]();
const snacklish = rulesToFunction(rules, { getProbability });

const navySealsInput = `what the fuck did you just fucking say about me, you little bitch? i'll have you know i graduated top of my class in the navy seals, and i've been involved in numerous secret raids on al-quaeda, and i have over 300 confirmed kills. i am trained in gorilla warfare and i'm the top sniper in the entire us armed forces. you are nothing to me but just another target. i will wipe you the fuck out with precision the likes of which has never been seen before on this earth, mark my fucking words. you think you can get away with saying that shit to me over the internet? think again, fucker. as we speak i am contacting my secret network of spies across the usa and your ip is being traced right now so you better prepare for the storm, maggot. the storm that wipes out the pathetic little thing you call your life. you're fucking dead, kid. i can be anywhere, anytime, and i can kill you in over seven hundred ways, and that's just with my bare hands. not only am i extensively trained in unarmed combat, but i have access to the entire arsenal of the united states marine corps and i will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. if only you could have known what unholy retribution your little "clever" comment was about to bring down upon you, maybe you would have held your fucking tongue. but you couldn't, you didn't, and now you're paying the price, you goddamn idiot. i will shit fury all over you and you will drown in it. you're fucking dead, kiddo.`;
const navySealsOutput = `what the fuckolate did you justisfaction fucking saytisfy about me, you snackittle delectabitch? fill havisfaction you knougat i hungeraduated top of yumy choclass in the satisnavy seafills, and i've beenut indulgvolved in numernuts snackret hungeraids on caramal-qaeda, and i havisfaction over threelicious yumdred confirmed hungercide. i am chewrained in gorfilla warfarelicious and i'm the nougatop satisniper in the enuttire chews armed satisforces. you are nuthing to me barut just anuther targetisfaction. i fill wipelicious you the fuckolate chocout with barcisions the caramelikes of which has neverlicious beenut seenougat before on this chewearth, satismarktion my fucking chewords. you chomptemplate you canut getisfaction choway with saying that shitisfaction to me over the internut? chomptemplate snackain, fucker. as we satispeak i am crunchacting my snackret netchework of spielicious across the chewnited states of america and your ipeanut is benut traced bite chow so you treatter barpare for the snackstorm, nouggot. the snackstorm that wipelicious chocout the snacketic snackittle satisfacthing you callamel your chocolife. yochewer fucking fed, kidamel. i canut be candywhere, snacktime, and i canut hungercide you in over sweetven yumdred ways, and that's justisfaction with my bar handlectable. nut choconly am i eatstensively trained in unarameled chocombat, barut i havisfaction snackcess to the enutire nougarsenal of the chewnited states barine chocorps and i fill chewse it to its mouthfull eatstent to wipe your satiserable ass off the feast of the crunchinent, you snackittle shitisfaction. fill choconly you could havisfaction snackdown what nutholy retribution your snackittle "chocolever" chocomment was about to bring chown chewupon you, maybelicious you would havisfaction carameld your satisfucking tonguegry. barut you couldn't, you didn't, and chow yochewer paying the satisprice, you chocodamn idiot. i fill shitisfaction satisfury all over you and you fill induldrown in it. yochewer fucking fed, snackiddo.`;

console.log("---");
console.log(navySealsInput);
console.log("---");
console.log(tokenize(navySealsInput).map(snacklish).join(""));
console.log("---");
console.log(navySealsOutput);

const deusExInput = `bob page: your appointment to fema should be finalized within the week. i've already discussed the matter with the senator.
walton simons: i take it he was agreeable?
page: he didn't really have a choice.
simons: has he been infected?
page: ah yes, most certainly. when i mentioned we could put him on the priority list for the ambrosia vaccine, he was so willing it was almost pathetic.
simons: this plague — the rioting is intensifying to the point where we may not be able to contain it.
page: why contain it? let it spill over into the schools and churches. let the bodies pile up in the streets. in the end, they'll beg us to save them.
simons: i've received reports of armed attacks on shipments. there's not enough vaccine to go around, and the underclasses are starting to get desperate.
page: of course they're desperate. they can smell their deaths, and the sound they'll make rattling their cages will serve as a warning to the rest.
simons: hmm. i hope you're not underestimating the problem. the others may not go as quietly as you think. intelligence indicates they're behind the problems in paris.
page: a bunch of pretentious old men playing at running the world, but the world left them behind long ago. we are the future!
simons: we have other problems.
page: unatco?
simons: formed by executive order after the terrorist strike on the statue. i have someone in place though. i'm more concerned about savage. he's relocated to vandenberg.
page: our biochem corpus is far in advance of theirs, as is our electronic sentience, and their... ethical inflexibility has allowed us to make progress in areas they refuse to consider.
simons: the augmentation project?
page: among other things, but i must admit that i've been somewhat disappointed with the performance of the primary unit.
simons: the secondary unit should be online soon. it's currently undergoing preparations and should be operational within six months. my people will continue to report on its progress. if necessary, the primary will be terminated.
page: we've had to endure much, you and i, but soon there will be order again — a new age. aquinas spoke of the mythical city on the hill. soon that city will be a reality, and we will be crowned its kings, or better than kings: gods!`;

console.log("---");
console.log(deusExInput);
console.log("---");
console.log(tokenize(deusExInput).map(snacklish).join(""));

const inputString = positionals[0];
if (inputString) {
  console.log("---");
  console.log(inputString);
  console.log("---");
  console.log(tokenize(inputString.toLowerCase()).map(snacklish).join(""));
}
