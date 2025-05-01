export const parseIngredients = (text) => {
  const matches =
    text &&
    text.match(/([가-힣]+)(?=\s*\d+g|\s*\d+ml|\s*\d+\(|\s*\d+\s*[\w(])/g);
  return matches ? matches.map((str) => str.trim()) : [];
};
