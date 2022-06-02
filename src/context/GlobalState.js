import { createContext, useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import AppReducer from './AppReducer'
import axios from 'axios'

const initialState = {
  watchlist: localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist')) : [],
  isWatchlistLoading: false,
  watchlistError: null,
}

const GlobalContext = createContext(initialState)

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(state.watchlist))
  }, [state])

  function addAssetToWatchlist(asset) {
    dispatch({ type: 'SET_WATCHLIST_ERROR', payload: null })
    dispatch({ type: 'SET_IS_WATCHLIST_LOADING', payload: true })
    setTimeout(async () => {
      try {
        const { data } = await axios({
          url: 'https://testnets-api.opensea.io/api/v1/events',
          method: 'GET',
          params: {
            asset_contract_address: asset.asset_contract.address,
            token_id: asset.token_id,
            event_type: 'successful',
          },
        })
        asset['asset_events'] = data.asset_events
        dispatch({ type: 'ADD_ASSET_TO_WATCHLIST', payload: asset })
      } catch (error) {
        dispatch({ type: 'SET_WATCHLIST_ERROR', payload: error })
      } finally {
        dispatch({ type: 'SET_IS_WATCHLIST_LOADING', payload: false })
      }
    }, 2000)
  }

  function removeAssetFromWatchlist(id) {
    dispatch({ type: 'REMOVE_ASSET_FROM_WATCHLIST', payload: id })
  }

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        isWatchlistLoading: state.isWatchlistLoading,
        watchlistError: state.watchlistError,
        addAssetToWatchlist,
        removeAssetFromWatchlist,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

GlobalProvider.propTypes = {
  children: PropTypes.element,
}

export { GlobalContext, GlobalProvider }
