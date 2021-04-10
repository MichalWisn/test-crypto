import axios from "axios";

import { fetchCoinData, parseResponse, createRows } from "../utils";
import { ApiResponse, CoinsData, CoinStats } from "../types";

jest.mock("axios");

describe("utils", () => {
  describe("fetchCoinData", () => {
    it("calls setData", async () => {
      (axios.get as any).mockImplementationOnce(() => Promise.resolve({}));
      const setData = jest.fn();

      await fetchCoinData(setData, [], []);

      expect(setData).toHaveBeenCalled();
    });
  });

  describe("parseResponse", () => {
    it("properly formats response", async () => {
      const TEST_CRYPTO_CURRENCIES = ["DOGE", "BTC"];
      const TEST_FIAT_CURRENCUIES = ["EUR"];

      const OPENDAY = 100;
      const CHANGEDAY = 200;
      const PRICE = 300;
      const CHANGEPCTDAY = 400;

      const mockResponse: ApiResponse = {
        RAW: {
          DOGE: {
            EUR: {
              OPENDAY,
              CHANGEDAY,
              CHANGEPCTDAY,
              PRICE,
            },
          },
          BTC: {
            EUR: {
              OPENDAY,
              CHANGEDAY,
              CHANGEPCTDAY,
              PRICE,
            },
          },
        },
      };

      const expectedFormat: CoinsData = {
        EUR: {
          DOGE: {
            currentPrice: PRICE,
            openingPrice: OPENDAY,
            priceIncrease: CHANGEDAY,
            priceIncreasePercent: CHANGEPCTDAY,
          },
          BTC: {
            currentPrice: PRICE,
            openingPrice: OPENDAY,
            priceIncrease: CHANGEDAY,
            priceIncreasePercent: CHANGEPCTDAY,
          },
        },
      };

      const formattedData = parseResponse(
        mockResponse,
        TEST_CRYPTO_CURRENCIES,
        TEST_FIAT_CURRENCUIES
      );
      expect(formattedData).toStrictEqual(expectedFormat);
    });
  });

  describe("createRows", () => {
    it("correctly maps rows", () => {
      const openingPrice = 1;
      const currentPrice = 2;
      const priceIncrease = 3;
      const priceIncreasePercent = 4;
      const firstCurr = "BTC";
      const secondCurr = "ETH";

      const data: CoinStats = {
        [firstCurr]: {
          openingPrice,
          currentPrice,
          priceIncrease,
          priceIncreasePercent,
        },
        [secondCurr]: {
          openingPrice,
          currentPrice,
          priceIncrease,
          priceIncreasePercent: priceIncreasePercent + 1,
        },
      };
      const rows = createRows(data);

      // sorted by price
      expect(rows[0].symbol).toBe(secondCurr);

      // all fields present
      expect(rows[1]).toEqual({
        id: firstCurr,
        symbol: firstCurr,
        openingPrice: 1,
        currentPrice: 2,
        priceIncrease: 3,
        priceIncreasePercent: 4,
      });
    });
  });
});
