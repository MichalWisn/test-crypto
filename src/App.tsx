import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { CoinsData } from "./types";
import { fetchCoinData } from "./utils";
import { CRYPTOCURRENCIES, REAL_CURRENCIES } from "./consts";

import CurrencySelector from "./components/CurrencySelector";
import Datagrid from "./components/Datagrid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: 'auto',
      paddingTop: theme.spacing(6),
      width: 760
    },
  })
);

function App() {
  const styles = useStyles();
  const [coinData, setCoinData] = React.useState<CoinsData>({});
  const [currency, setCurrency] = React.useState<string>("EUR");
  React.useEffect(() => {
    fetchCoinData(setCoinData, CRYPTOCURRENCIES, REAL_CURRENCIES);
  }, []);

  return (
    <div className={styles.container}>
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
