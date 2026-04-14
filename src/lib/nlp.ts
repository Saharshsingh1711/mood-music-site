import { Mood } from '@/types';

export interface VibeResult {
  mood: Mood | null;
  confidence: number;
  keywords: string[];
  isNegated: boolean;
}

type Keywords = {
  [key in Mood]: string[];
};

const MOOD_KEYWORDS: Keywords = {
  Chill: [
    'relax', 'calm', 'soft', 'peaceful', 'quiet', 'meditation', 'sleep', 
    'zen', 'smooth', 'gentle', 'ambient', 'easy', 'rest', 'lazy', 'sunday',
    'evening', 'unwind', 'breeze', 'floating', 'low-key', 'mellow', 'soulful',
    'lofi', 'chillout', 'serene', 'tranquil', 'beach', 'waves', 'campfire'
  ],
  Energetic: [
    'party', 'dance', 'workout', 'gym', 'upbeat', 'high', 'power', 
    'hype', 'fast', 'jump', 'club', 'celebration', 'exciting', 'active',
    'morning', 'run', 'sprint', 'rave', 'electric', 'vibrant', 'boost',
    'stadium', 'festival', 'pumping', 'dynamic', 'motivation', 'beast'
  ],
  Focus: [
    'study', 'work', 'concentration', 'deep', 'coding', 'programming', 
    'clean', 'minimal', 'smart', 'reading', 'writing', 'productive',
    'office', 'library', 'flow', 'task', 'brain', 'thinking', 'focus',
    'instrumental', 'classical', 'modern', 'structured', 'organized'
  ],
  Melancholic: [
    'sad', 'rain', 'cry', 'emotional', 'blue', 'heartbreak', 'lost', 
    'lonely', 'dark', 'night', 'memories', 'past', 'low', 'depressed',
    'somber', 'stormy', 'empty', 'missing', 'longing', 'heartache', 
    'piano', 'acoustic', 'tear', 'gloom', 'nostalgia', 'solitude'
  ],
  Intense: [
    'epic', 'grand', 'strong', 'heavy', 'fire', 'aggressive', 'battle', 
    'cinema', 'hero', 'chaos', 'powerful', 'loud', 'hard', 'extreme',
    'adventure', 'impact', 'crushing', 'voltage', 'storm', 'metal', 
    'rock', 'industrial', 'darkness', 'edge', 'cinematic', 'thunder'
  ]
};

const NEGATION_WORDS = ['not', 'no', 'never', 'dont', 'don\'t', 'wont', 'won\'t', 'avoid'];

/**
 * Detects the most likely mood from a natural language string with confidence scoring.
 */
export function detectVibe(text: string): VibeResult {
  const normalized = text.toLowerCase();
  const words = normalized.match(/\b[\w']+\b/g) || [];
  
  let isNegated = false;
  NEGATION_WORDS.forEach(neg => {
    if (words.includes(neg)) isNegated = true;
  });

  const scores: Record<Mood, number> = {
    Chill: 0,
    Energetic: 0,
    Focus: 0,
    Melancholic: 0,
    Intense: 0
  };

  const matchedKeywords: string[] = [];

  words.forEach((word, index) => {
    (Object.keys(MOOD_KEYWORDS) as Mood[]).forEach(mood => {
      if (MOOD_KEYWORDS[mood].includes(word)) {
        // Simple weighting: words closer to the front might be more important
        // or just count hits for now
        scores[mood] += 1;
        matchedKeywords.push(word);
      }
    });
  });

  // Check for phrase matches (they have high weight)
  for (const [phrase, mood] of Object.entries(PHRASE_MAPPINGS)) {
    if (normalized.includes(phrase)) {
      scores[mood] += 5;
    }
  }

  // Find top mood
  const sortedMoods = (Object.entries(scores) as [Mood, number][])
    .sort((a, b) => b[1] - a[1]);

  const topMood = sortedMoods[0];
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  
  // Calculate confidence as a ratio of top score to total score
  const confidence = totalScore > 0 ? topMood[1] / totalScore : 0;

  return {
    mood: topMood[1] > 0 ? topMood[0] : null,
    confidence,
    keywords: Array.from(new Set(matchedKeywords)),
    isNegated
  };
}

/**
 * Legacy support for the older function signature
 */
export function detectMoodFromText(text: string): Mood | null {
  const result = detectVibe(text);
  return result.isNegated ? null : result.mood;
}

/**
 * Common phrases to mood mapping for direct hits
 */
const PHRASE_MAPPINGS: Record<string, Mood> = {
  'late night drive': 'Melancholic',
  'gym session': 'Energetic',
  'ready to party': 'Energetic',
  'time to study': 'Focus',
  'lazy sunday': 'Chill',
  'rainy day': 'Melancholic',
  'pure chaos': 'Intense',
  'coding flow': 'Focus',
  'deep work': 'Focus',
  'zen mode': 'Chill'
};

export function getPhraseMatch(text: string): Mood | null {
  const normalized = text.toLowerCase();
  for (const [phrase, mood] of Object.entries(PHRASE_MAPPINGS)) {
    if (normalized.includes(phrase)) return mood;
  }
  return null;
}
