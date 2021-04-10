export interface CoinStats {
  [cryptoSymbol: string]: {
    openingPrice: number;
    currentPrice: number;
    priceIncrease: number;
    priceIncreasePercent: number;
  };
}

export interface CoinsData {
  [fiatSymbol: string]: CoinStats;
}

export interface ApiResponse {
  RAW: {
    [cryptoSymbol: string]: {
      [fiatSymbol: string]: {
        OPENDAY: number;
        PRICE: number;
        CHANGEPCTDAY: number;
        CHANGEDAY: number;
      };
    };
  };
}
