// this endpoint returns all data I need (price of different coins for various real word currencies)
export const API_URL = "https://min-api.cryptocompare.com/data/pricemultifull";

// maybe some enum (or more constraints) for currency symbols could be used
export const CRYPTOCURRENCIES = [
  "BTC",
  "BCH",
  "ETH",
  "XRP",
  "DOGE",
  "XLM",
  "EOS",
  "NEO",
  "DASH",
  "XTZ",
];

export const REAL_CURRENCIES = ["USD", "EUR", "GBP", "PLN"];

export const CURRENCY_SYMBOLS: {
  [name: string]: string;
} = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  PLN: "zł",
};
