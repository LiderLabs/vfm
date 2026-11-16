// src/utils/searchEngine.js

// Common conversational filler words to ignore in queries
const STOP_WORDS = new Set([
  "how", "do", "i", "can", "we", "the", "a", "an", "is", "are", 
  "to", "for", "of", "in", "on", "what", "where", "when", "why", 
  "who", "which", "my", "our", "it", "with", "about", "at", "by", 
  "or", "and", "from", "be", "get", "need", "want"
]);

// Fast Levenshtein distance algorithm for typo tolerance
function getEditDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Determines if two words are a fuzzy match (allows 1-2 typos based on word length)
function isFuzzyMatch(word, target) {
  if (target.includes(word) || word.includes(target)) return true;
  if (word.length <= 3) return word === target;
  
  const maxDistance = word.length >= 6 ? 2 : 1;
  return getEditDistance(word, target) <= maxDistance;
}

/**
 * Intelligent weighted search algorithm
 * @param {string} rawQuery - The user's input
 * @param {Array} articles - The helpArticles array
 * @returns {Array} - Ranked and filtered results
 */
export function searchHelpArticles(rawQuery, articles) {
  if (!rawQuery || !rawQuery.trim()) {
    return articles;
  }

  const cleanQuery = rawQuery.toLowerCase().trim();

  // 1. Tokenize query into meaningful search words
  const rawTokens = cleanQuery.replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  const meaningfulTokens = rawTokens.filter((token) => !STOP_WORDS.has(token));
  const searchTokens = meaningfulTokens.length > 0 ? meaningfulTokens : rawTokens;

  // 2. Score each article based on weighted relevance
  const scoredArticles = articles.map((article) => {
    let score = 0;
    const titleLower = article.title.toLowerCase();
    const answerLower = article.answer.toLowerCase();
    const categoryLower = article.category.toLowerCase();
    const keywordsLower = article.keywords.map((k) => k.toLowerCase());

    // Exact full query match bonuses
    if (titleLower.includes(cleanQuery)) score += 50;
    if (keywordsLower.some((k) => k.includes(cleanQuery))) score += 40;
    if (answerLower.includes(cleanQuery)) score += 15;

    // Token-by-token matching
    searchTokens.forEach((token) => {
      // Title match (Weight: 15)
      if (titleLower.includes(token)) {
        score += 15;
      } else if (titleLower.split(/\s+/).some((w) => isFuzzyMatch(token, w))) {
        score += 8; // Fuzzy title match
      }

      // Keyword match (Weight: 20)
      if (keywordsLower.some((k) => k === token)) {
        score += 20;
      } else if (keywordsLower.some((k) => k.includes(token))) {
        score += 12;
      } else if (keywordsLower.some((k) => isFuzzyMatch(token, k))) {
        score += 7; // Fuzzy keyword match
      }

      // Category match (Weight: 8)
      if (categoryLower.includes(token)) {
        score += 8;
      }

      // Answer body match (Weight: 4)
      if (answerLower.includes(token)) {
        score += 4;
      }
    });

    return { article, score };
  });

  // 3. Filter out non-matching articles & sort by highest score first
  return scoredArticles
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.article);
}