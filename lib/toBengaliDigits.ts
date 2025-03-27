export const toBengaliDigits = (num: string) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.replace(/\d/g, (digit) => banglaDigits[parseInt(digit)]);
};
