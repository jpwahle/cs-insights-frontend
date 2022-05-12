import React, { useEffect } from 'react';
import '../App.css';
import { Autocomplete, CircularProgress, debounce, TextField, Tooltip } from '@mui/material';
import { useNetworkGet } from '../network';
import { FilterCategoricalProps } from '../types';
import { DEBOUNCE_DELAY } from '../consts';

export default function FilterCategorical<T extends { _id: string; [key: string]: string }>(
  props: FilterCategoricalProps<T>
) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<T[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>('');

  const refetch = useNetworkGet(`fe/${props.route}/list?pattern=${inputValue}&`, 'list', (data) => {
    setOptions(data);
    setLoading(false);
  });

  useEffect(() => {
    if (inputValue) {
      refetch();
    }
  }, [inputValue]);

  // 2 functions, so reference does not get lost
  const handleInputChangeDebounce = debounce(async (newInputValue: string) => {
    if (newInputValue.length >= 3) {
      setInputValue(() => newInputValue);
    }
  }, DEBOUNCE_DELAY);

  function handleInputChange(newInputValue: string) {
    setLoading(true);
    return handleInputChangeDebounce(newInputValue);
  }

  return (
    <div className="categoricalFilter">
      <Tooltip placement="top-end" title={props.tooltip}>
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
      </Tooltip>
    </div>
  );
}
