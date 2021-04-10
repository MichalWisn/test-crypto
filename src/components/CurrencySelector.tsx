import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

interface CurrenncySelectorProps {
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  availableCurrencies: string[];
}

const CurrencySelector: React.FC<CurrenncySelectorProps> = ({
  currency,
  setCurrency,
  availableCurrencies,
}) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCurrency(event.target.value as string);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="currency-select-label">Currency</InputLabel>
        <Select
          labelId="currency-select-label"
          value={currency}
          onChange={handleChange}
        >
          {availableCurrencies.map((curr) => (
            <MenuItem key={curr} value={curr}>{curr}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CurrencySelector;
