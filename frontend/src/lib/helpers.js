export const localeDate = (date) => {
  return new Date(date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

export const formPrice = (number) => {
    let n = Number(number)
    return n.toLocaleString('tr-TR', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
    })
}