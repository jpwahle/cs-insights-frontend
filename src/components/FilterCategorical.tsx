//@ts-nocheck
/*eslint-disable*/
import React from 'react';
import '../App.css';
import { Autocomplete, CircularProgress, debounce, TextField } from '@mui/material';
import { getData } from '../network';

export default function FilterCategorical(props) {
  // console.log(props);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly Film[]>([]);
  const [loading, setLoading] = React.useState(false);

  function handleInputChange(newInputValue) {
    setLoading(true);
    return handleInputChangeDebounce(newInputValue);
  }

  const handleInputChangeDebounce = debounce(async (newInputValue) => {
    if (newInputValue.length >= 2) {
      const data = await getData(`fe/${props.route}/list?pattern=${newInputValue}`);
      //fixme pos1 not working
      //todo smaller size
      setOptions(data);
      setLoading(false);
    }
  }, 1000);

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
        isOptionEqualToValue={(option, value) => option._id === value._id}
        getOptionLabel={(option) => option[props.label]}
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
