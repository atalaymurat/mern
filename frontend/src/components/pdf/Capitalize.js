export const capitalize = (str) => {
  if (!str) return "";

  return str
    .split("\n")
    .map((line) =>
      line
        .split(" ")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() +
            word.slice(1).toLowerCase()
        )
        .join(" ")
    )
    .join("\n");
};
