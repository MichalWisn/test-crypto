import { shallow, ShallowWrapper } from "enzyme";
import { DataGrid } from "@material-ui/data-grid";

import Datagrid from "../Datagrid";
import { createRows, createColumns } from "../../utils";

jest.mock("../../utils.ts");

describe("Datagrid component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls createRows, createColumns on render", () => {
    expect(createRows as jest.Mock).not.toHaveBeenCalled();
    expect(createColumns as jest.Mock).not.toHaveBeenCalled();

    shallow(
      <Datagrid
        currency={"currency"}
        // @ts-ignore
        data={"data"}
      />
    );
    expect(createRows as jest.Mock).toHaveBeenCalled();
    expect(createColumns as jest.Mock).toHaveBeenCalled();
  });

  it("renders material-ui DataGrid with created rows and columns", () => {
    (createRows as jest.Mock).mockReturnValue("createdRows");
    (createColumns as jest.Mock).mockReturnValue("createdColumns");

    const wrapper = shallow(
      <Datagrid
        currency={"currency"}
        // @ts-ignore
        data={"data"}
      />
    );

    expect(wrapper.find(DataGrid).length).toBe(1);
    expect(wrapper.find(DataGrid).prop("columns")).toBe("createdColumns");
    expect(wrapper.find(DataGrid).prop("rows")).toBe("createdRows");
  });
});
