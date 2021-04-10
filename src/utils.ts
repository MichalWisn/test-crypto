import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import {
  GridCellValue,
  GridColumns,
  GridRowModel,
  GridValueGetterParams,
} from "@material-ui/data-grid";

import { CoinsData, ApiResponse, CoinStats } from "./types";
import { API_URL, CURRENCY_SYMBOLS } from "./consts";

export const fetchCoinData = async (
  setData: Dispatch<SetStateAction<CoinsData>>,
  cryptocurrencies: string[],
  fiatCurrencies: string[]
): Promise<void> => {
  try {
    const { data } = await axios.get<ApiResponse>(
      `${API_URL}?fsyms=${cryptocurrencies.join(",")}&tsyms=${fiatCurrencies}`
    );
    const parsedData = parseResponse(data, cryptocurrencies, fiatCurrencies);
    setData(parsedData);
  } catch (err) {
    console.error("Error during initial data fetch", err.message);
  }
};

export const parseResponse = (
  data: ApiResponse,
  cryptocurrencies: string[],
  fiatCurrencies: string[]
): CoinsData => {
  const coinData: CoinsData = {};

  fiatCurrencies.forEach((fiatSymbol) => {
    const stats: CoinStats = {};
    cryptocurrencies.forEach((cryptoSymbol) => {
      stats[cryptoSymbol] = {
        openingPrice: Number(
          (data.RAW?.[cryptoSymbol]?.[fiatSymbol]?.OPENDAY || 0).toFixed(2)
        ),
        currentPrice: Number(
          (data.RAW?.[cryptoSymbol]?.[fiatSymbol]?.PRICE || 0).toFixed(2)
        ),
        // no need to calculate priceIncrease myself, as CHANGEDAY, CHANGEPCTDAY seem to be enough
        priceIncrease: Number(
          (data.RAW?.[cryptoSymbol]?.[fiatSymbol]?.CHANGEDAY || 0).toFixed(2)
        ),
        priceIncreasePercent: Number(
          (data.RAW?.[cryptoSymbol]?.[fiatSymbol]?.CHANGEPCTDAY || 0).toFixed(3)
        ),
      };
    });
    coinData[fiatSymbol] = stats;
  });
  return coinData;
};

export const createColumns = (currency: string): GridColumns => {
  if (!CURRENCY_SYMBOLS[currency]) {
    throw new Error(`No symbol for ${currency}!`);
  }
  return [
    { field: "symbol", headerName: "Symbol", width: 160 },
    {
      field: "openingPrice",
      headerName: `Opening Price (${currency})`,
      width: 200,
      // decorate value with symbol
      valueGetter: (params: GridValueGetterParams) => {
        return `${CURRENCY_SYMBOLS[currency]}${params.value}`;
      },
      // needed to properly sort by values
      sortComparator: (v1: GridCellValue, v2: GridCellValue) =>
        (v2 as number) - (v1 as number),
    },
    {
      field: "currentPrice",
      headerName: `Current Price (${currency})`,
      width: 200,
      valueGetter: (params: GridValueGetterParams) => {
        return `${CURRENCY_SYMBOLS[currency]}${params.value}`;
      },
      sortComparator: (v1: GridCellValue, v2: GridCellValue) =>
        (v2 as number) - (v1 as number),
    },
    {
      field: "priceIncreasePercent",
      headerName: "Price Increase %",
      width: 200,
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.value}% (${CURRENCY_SYMBOLS[currency]}${params.row.priceIncrease})`;
      },
      sortComparator: (v1: GridCellValue, v2: GridCellValue) =>
        (v2 as number) - (v1 as number),
    },
  ];
}

export const createRows = (data: CoinStats): GridRowModel[] =>
  Object.entries(data)
    .map(([symbol, stats]) => ({
      id: symbol, // required by DataGrid
      symbol,
      ...stats,
    }))
    // default sort by price (increasing)
    .sort(
      (
        { currentPrice: currentPriceFirst },
        { currentPrice: currentPriceSecond }
      ) => currentPriceSecond - currentPriceFirst
    );