import { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ListingPage from './pages/ListingPage'
import WatchlistPage from './pages/WatchlistPage'
import { GlobalProvider } from './context/GlobalState'

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}></Suspense>
        <Routes>
          <Route path="/" element={<ListingPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Routes>
      </Router>
    </GlobalProvider>
  )
}

export default App
