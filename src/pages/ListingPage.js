import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState'
import EmptyImage from '../components/EmptyImage'
import Card from '../components/Card'
import Pagination from '../components/Pagination'
import axios from 'axios'
import './AssetsLayout.css'

const TOTAL_COUNT = 100
const PAGE_SIZE = 20

function ListingPage() {
  const { addAssetToWatchlist, isWatchlistLoading } = useContext(GlobalContext)

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [assets, setAssets] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function fetchAssets() {
      try {
        setIsLoading(true)
        const { data } = await axios({
          url: 'https://testnets-api.opensea.io/api/v1/assets',
          method: 'GET',
          params: {
            order_direction: 'desc',
            limit: 20,
            asset_contract_address: '0x939Dc2d64F9Ce403d752d1119c16dA3583D83f1A',
            offset: (currentPage - 1) * PAGE_SIZE,
            order_by: 'sale_count',
          },
        })
        setAssets(data.assets)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAssets()
  }, [currentPage])

  function onPageChange(page) {
    setCurrentPage(page)
  }

  return (
    <div className="assets-layout">
      <Link to="/watchlist">
        <h4>Watchlist</h4>
      </Link>
      <h1 className="text-center">NFTs</h1>
      {error ? (
        <div className="subtitle">Oops!Something Error...</div>
      ) : isLoading ? (
        <div className="subtitle">Loading...</div>
      ) : (
        <>
          <div className="assets-result">
            {assets.map((asset) => (
              <Card
                className="asset-card"
                key={asset.id}
                cover={asset.image_url ? <img alt="cover" src={asset.image_url}></img> : <EmptyImage></EmptyImage>}
                body={
                  <div>
                    <div>num_sales: {asset.num_sales}</div>
                    <div className="text-ellipsis">name: {asset.name ?? '-'}</div>
                    <div className="text-ellipsis">address: {asset.asset_contract?.address}</div>
                  </div>
                }
                action={
                  <button onClick={() => addAssetToWatchlist(asset)} disabled={isWatchlistLoading}>
                    {isWatchlistLoading ? 'Loading...' : 'Add to watchlist'}
                  </button>
                }
              ></Card>
            ))}
          </div>
          <div className="text-center">
            <Pagination
              currentPage={currentPage}
              totalCount={TOTAL_COUNT}
              pageSize={PAGE_SIZE}
              onPageChange={(page) => onPageChange(page)}
            ></Pagination>
          </div>
        </>
      )}
    </div>
  )
}

export default ListingPage
