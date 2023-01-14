import { CryptoTable, MarketDetail, Navbar } from "./Components"

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='Parent'>
        <MarketDetail className="market" />
        <CryptoTable className="table" />
      </div>
    </div>
  );
}

export default App;
