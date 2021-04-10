import { Dispatch, SetStateAction } from "react";
import axios from "axios";

import { CoinsData, ApiResponse, CoinStats } from "./types";
import { API_URL } from "./consts";

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

const parseResponse = (
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
