import React from "react";

import { CoinsData } from "./types";
import { fetchCoinData } from "./utils";
import { CRYPTOCURRENCIES, REAL_CURRENCIES } from "./consts";

import CurrencySelector from "./components/CurrencySelector";
import Datagrid from "./components/Datagrid";

function App() {
  const [coinData, setCoinData] = React.useState<CoinsData>({});
  const [currency, setCurrency] = React.useState<string>("EUR");
  React.useEffect(() => {
    fetchCoinData(setCoinData, CRYPTOCURRENCIES, REAL_CURRENCIES);
  }, []);

  return (
    <div>
      <CurrencySelector
        currency={currency}
        setCurrency={setCurrency}
        availableCurrencies={REAL_CURRENCIES}
      />
      <Datagrid data={coinData[currency]} currency={currency} />
    </div>
  );
}

export default App;
