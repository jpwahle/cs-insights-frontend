import React from 'react';
import '../App.css';
import { Autocomplete, CircularProgress, debounce, TextField } from '@mui/material';
import { getData } from '../network';
import { FilterCategoricalProps } from '../types';
import { useSnack } from '../context/SnackbarContext';

export default function FilterCategorical<T extends { _id: string; [key: string]: string }>(
  props: FilterCategoricalProps<T>
) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<T[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const setSnack = useSnack();

  const handleInputChangeDebounce = debounce(async (newInputValue: string) => {
    if (newInputValue.length >= 3) {
      const data = await getData(`fe/${props.route}/list?pattern=${newInputValue}&`, setSnack);
      if (data) {
        setOptions(data);
        setLoading(false);
      }
    }
  }, 1000);

  function handleInputChange(newInputValue: string) {
    setLoading(true);
    return handleInputChangeDebounce(newInputValue);
  }

  return (
    <div className="categoricalFilter">
      <Autocomplete
        id="categorical-filter"
        sx={{ width: 300 }}
        size="small"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        value={props.value}
        onChange={(event, value) => props.setValue(value)}
        onInputChange={(event, newInputValue) => handleInputChange(newInputValue)}
        isOptionEqualToValue={(option: T, value: T) => option._id === value._id}
        getOptionLabel={(option: T) => option[props.label]}
        options={options}
        loading={loading}
        filterOptions={(x) => x}
        renderInput={(params) => (
          <TextField
            {...params}
            label={'Search'}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading && open ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </div>
  );
}
