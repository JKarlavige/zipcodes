const arrayMatch = (arr1, arr2) => {
  return arr1.some(i => arr2.includes(i))
}

module.exports = arrayMatch