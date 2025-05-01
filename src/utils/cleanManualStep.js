export const cleanManualStep = (data) => {
  const manualSteps = [];
  if (data) {
    for (let i = 1; i <= 20; i++) {
      const key = `MANUAL${i.toString().padStart(2, "0")}`;
      if (data[key] && data[key].trim() !== "") {
        // 숫자와 점, 그 뒤의 데이터 제거하는 정규식
        const cleanedText = data[key].trim().replace(/^\d+\.\s*/, "");
        manualSteps.push(cleanedText);
      }
    }
  }
  return manualSteps;
};
