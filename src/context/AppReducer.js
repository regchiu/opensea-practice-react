function uniqueElementsBy(array, fn) {
  return array.reduce((acc, curr) => {
    if (!acc.some((item) => fn(item, curr))) {
      acc.push(curr)
    }
    return acc
  }, [])
}

export default function (state, action) {
  switch (action.type) {
    case 'ADD_ASSET_TO_WATCHLIST':
      return {
        ...state,
        watchlist: uniqueElementsBy([...state.watchlist, action.payload], (a, b) => a.id === b.id),
      }
    case 'REMOVE_ASSET_FROM_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter((asset) => asset.id !== action.payload),
      }
    case 'SET_IS_WATCHLIST_LOADING':
      return {
        ...state,
        isWatchlistLoading: action.payload,
      }
    case 'SET_WATCHLIST_ERROR':
      return {
        ...state,
        watchlistError: action.payload,
      }
    default:
      return state
  }
}
