import { shallow, ShallowWrapper } from "enzyme";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import CurrencySelector from "../CurrencySelector";

describe("CurrencySelector component", () => {
  let wrapper: ShallowWrapper;
  const setCurrencyMock = jest.fn();
  const availableCurrencies = ["curr1", "curr2"];
  const currency = "curr";

  beforeEach(() => {
    wrapper = shallow(
      <CurrencySelector
        currency={currency}
        setCurrency={setCurrencyMock}
        availableCurrencies={availableCurrencies}
      />
    );
  });

  it("renders MenuItems based on provided currencies", () => {
    expect(wrapper.find(Select).length).toBe(1);
    expect(wrapper.find(Select).prop("value")).toBe(currency);

    expect(wrapper.find(MenuItem).length).toBe(availableCurrencies.length);
    availableCurrencies.forEach((availableCurr, idx) => {
      expect(wrapper.find(MenuItem).at(idx).prop("value")).toBe(availableCurr);
    });
  });

  it("sets currency on change", () => {
    expect(setCurrencyMock).not.toHaveBeenCalled();
    const value = "value";
    (wrapper.find(Select).prop("onChange") as any)({ target: { value } });

    expect(setCurrencyMock).toHaveBeenCalledWith(value);
  });
});
