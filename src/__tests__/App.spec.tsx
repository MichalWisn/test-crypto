import { shallow } from "enzyme";

import App from "../App";
import CurrencySelector from "../components/CurrencySelector";

jest.mock("../utils", () => ({
  fetchCoinData: jest.fn(),
}));

describe("App component", () => {
  it("renders CurrencySelector", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(CurrencySelector).length).toBe(1);
  });

  it("renders Datagrid", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(CurrencySelector).length).toBe(1);
  });
});
