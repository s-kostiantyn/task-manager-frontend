export const formatDate = (dateString: string) => {
  if (!dateString) return "";

  const parts = dateString.split("/").map(Number);

  if (parts.length !== 3) return "";

  const [part1, part2, year] = parts;

  const month = part1 > 12 ? part2 : part1;
  const day = part1 > 12 ? part1 : part2;

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
};
