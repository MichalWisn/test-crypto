import React from 'react';

import { CoinsData } from './types';
import { fetchCoinData } from './utils';
import { CRYPTOCURRENCIES, REAL_CURRENCIES } from './consts';

import CurrencySelector from './components/CurrencySelector';

function App() {
  const [coinData, setCoinData] = React.useState<CoinsData>({});
  const [currency, setCurrency] = React.useState<string>('EUR');
  React.useEffect(() => {
    fetchCoinData(setCoinData, CRYPTOCURRENCIES, REAL_CURRENCIES);
  }, []);

  console.log('coin data', coinData[currency])
  return (
    <div>
      <CurrencySelector
        currency={currency}
        setCurrency={setCurrency}
        availableCurrencies={REAL_CURRENCIES}
      />
      <p>datagrid placeholder</p>
    </div>
  );
}

export default App;
