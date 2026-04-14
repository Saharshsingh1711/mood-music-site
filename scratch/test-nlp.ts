import { detectVibe } from '../src/lib/nlp';

const testPhrases = [
  "I want to cry",
  "ready to party tonight!",
  "need to focus on coding",
  "feeling very lazy and calm",
  "a grand epic battle",
  "not sad",
  "I don't want to work",
  "late night drive in the rain"
];

console.log("--- NLP TEST RESULTS ---");
testPhrases.forEach(phrase => {
  const result = detectVibe(phrase);
  console.log(`Input: "${phrase}"`);
  console.log(`  Mood: ${result.mood}`);
  console.log(`  Confidence: ${Math.round(result.confidence * 100)}%`);
  console.log(`  Keywords: ${result.keywords.join(', ')}`);
  console.log(`  Is Negated: ${result.isNegated}`);
  console.log('---');
});
