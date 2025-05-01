export const parseIngredients = (text) => {
  if (!text) return [];

  const withoutNewlines = text.replace(/\n/g, " ");
  const parts = withoutNewlines.split(/●|재료 |육수 |양념 /).filter(Boolean);
  const items = parts.flatMap((part) => {
    return part
      .split(",")
      .map((item) =>
        item
          .replace(/\([^)]*\)/g, "") // 괄호 제거
          .replace(/\d+(g|ml)?/gi, "") // 숫자 제거
          .replace(/:/g, "") // 콜론 제거
          .trim()
      )
      .filter(Boolean);
  });

  return items;
};
