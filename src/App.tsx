import React from 'react';

import { CoinsData } from './types';
import { fetchCoinData } from './utils';
import { CRYPTOCURRENCIES, REAL_CURRENCIES } from './consts';

function App() {
  const [coinData, setCoinData] = React.useState<CoinsData>({});
  React.useEffect(() => {
    fetchCoinData(setCoinData, CRYPTOCURRENCIES, REAL_CURRENCIES);
  }, []);

  console.log('coin data', coinData)
  return (
    <div className="App">
      <p>currencyselect placeholder</p>
      <p>datagrid placeholder</p>
    </div>
  );
}

export default App;
