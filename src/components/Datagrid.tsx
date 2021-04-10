import React from "react";
import { DataGrid } from "@material-ui/data-grid";

import { CoinStats } from "../types";
import { createColumns, createRows } from '../utils';

interface DatagridProps {
  currency: string;
  data: CoinStats;
}

const Datagrid: React.FC<DatagridProps> = ({ currency, data }) => {
  const rows = createRows(data || []);
  const columns = createColumns(currency);
  return (
      <DataGrid
        columns={columns}
        rows={rows}
        pageSize={10}
        hideFooter
        autoHeight
      />
  );
};
export default Datagrid;
