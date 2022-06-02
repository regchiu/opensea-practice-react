function convertFromWeiToEther(value) {
  if (Number.isNaN(Number(value))) {
    return 0
  }
  return Number(value) / 10e17
}

function formatTwoDecimal(value) {
  return Math.round(value * 10e1) / 10e1
}

function convertEthToUSDPrice(value, price) {
  const usdPrice = Number.isNaN(Number(price)) ? 0 : Number(price)
  return formatTwoDecimal(convertFromWeiToEther(value) * Number(usdPrice))
}

export { convertFromWeiToEther, convertEthToUSDPrice }
