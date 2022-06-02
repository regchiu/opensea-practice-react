import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { Link } from 'react-router-dom'
import './AssetsLayout.css'
import EmptyImage from '../components/EmptyImage'
import Card from '../components/Card'
import { convertEthToUSDPrice } from '../utils/converter'

function WatchlistPage() {
  const { watchlist, removeAssetFromWatchlist, watchlistError } = useContext(GlobalContext)
  const [totalWatchedValues, setTotalWatchedValues] = useState(0)
  const [totalWatchedAssetsSoldPrice, setTotalWatchedAssetsSoldPrice] = useState(0)

  useEffect(() => {
    setTotalWatchedValues(
      watchlist
        .map((asset) => convertEthToUSDPrice(asset.last_sale?.total_price, asset.last_sale?.payment_token?.usd_price))
        .reduce((acc, curr) => (acc * 10e1 + curr * 10e1) / 10e1, 0)
    )
    setTotalWatchedAssetsSoldPrice(
      watchlist
        .map((asset) =>
          asset.asset_events
            .map((event) => convertEthToUSDPrice(event.total_price, event.payment_token?.usd_price))
            .reduce((acc, curr) => (acc * 10e1 + curr * 10e1) / 10e1, 0)
        )
        .reduce((acc, curr) => (acc * 10e1 + curr * 10e1) / 10e1, 0)
    )
  }, [watchlist])

  return (
    <div className="assets-layout">
      <Link to="/">
        <h4>NFTs</h4>
      </Link>
      <h1 className="text-center">Watchlist</h1>
      <div>
        <h4>Total watched values: ${totalWatchedValues}(USD)</h4>
        <h4>
          Total watched assets sold price:{' '}
          {watchlistError ? 'Oops!Something Error...' : `$${totalWatchedAssetsSoldPrice}(USD)`}
        </h4>
      </div>
      <div className="assets-result">
        {watchlist?.map((asset) => (
          <Card
            className="asset-card"
            key={asset.id}
            cover={asset.image_url ? <img alt="cover" src={asset.image_url}></img> : <EmptyImage></EmptyImage>}
            body={
              <div className="relative">
                <div className="absolute-right text-right">
                  <div>sold price</div>
                  <div>
                    ${convertEthToUSDPrice(asset.last_sale?.total_price, asset.last_sale?.payment_token?.usd_price)}
                  </div>
                </div>
                <div>num_sales: {asset.num_sales}</div>
                <div className="text-ellipsis">name: {asset.name ?? '-'}</div>
                <div className="text-ellipsis">address: {asset.asset_contract?.address}</div>
              </div>
            }
            action={<button onClick={() => removeAssetFromWatchlist(asset.id)}>Remove from watchlist</button>}
          ></Card>
        ))}
      </div>
    </div>
  )
}

export default WatchlistPage
