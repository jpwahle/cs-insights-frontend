import React, { useCallback, useEffect } from 'react';
import '../App.css';
import { Autocomplete, Chip, CircularProgress, debounce, TextField, Tooltip } from '@mui/material';
import { useNetworkGet } from '../network';
import { FilterCategoricalProps } from '../types';
import { DEBOUNCE_DELAY } from '../consts';
import Box from '@mui/material/Box';

export default function FilterCategorical<T extends { _id: string; [key: string]: string }>(
  props: FilterCategoricalProps<T>
) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<readonly T[]>([]);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [pattern, setPattern] = React.useState<string>('');

  const { refetch, isFetching } = useNetworkGet(
    `fe/${props.route}/list?pattern=${inputValue}&`,
    'list-' + props.route,
    (data) => {
      setOptions(data);
    }
  );
  useEffect(() => {
    if (pattern && inputValue) {
      refetch();
    }
  }, [pattern]);

  // 2 functions, so debounce reference does not get lost
  const handleInputChangeDebounce = useCallback(
    debounce(async (newInputValue: string) => {
      if (newInputValue.length >= 3) {
        setPattern(() => newInputValue);
      }
    }, DEBOUNCE_DELAY),
    []
  );

  function handleInputChange(newInputValue: string, event: React.SyntheticEvent, reason: string) {
    if (event && event.type !== 'blur' && reason === 'reset') {
      setInputValue('');
      setOptions([]);
      setPattern('');
    } else if (reason !== 'reset') {
      setInputValue(newInputValue);
      handleInputChangeDebounce(newInputValue);
    }
  }

  return (
    <div className="categoricalFilter">
      <Tooltip placement="top-end" title={props.tooltip}>
        <Autocomplete
          multiple
          id={'autocomplete-' + props.route}
          sx={{ width: 300 }}
          size="small"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          value={props.value}
          onChange={(event, value) => props.setValue(value)}
          inputValue={inputValue}
          onInputChange={(event, newInputValue, reason) =>
            handleInputChange(newInputValue, event, reason)
          }
          isOptionEqualToValue={(option: T, value: T) => option._id === value._id}
          getOptionLabel={(option: T) => option[props.label]}
          options={options}
          loading={isFetching}
          filterOptions={(x) => x}
          renderOption={(renderProps, option) => (
            <li {...renderProps} key={option._id}>
              {option[props.label]}
            </li>
          )}
          renderTags={() => null}
          renderInput={(params) => (
            <TextField
              {...params}
              label={'Search '}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {isFetching ? (
                      <CircularProgress color="inherit" size={20} sx={{ marginRight: '30px' }} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </Tooltip>
      <Box
        mt={0.5}
        sx={{
          '& > :not(:last-child)': { mr: 0.5 },
          '& > *': { mr: 0.5 },
        }}
      >
        {props.value.map((chipValue) => (
          <Chip
            key={chipValue._id}
            label={chipValue[props.label]}
            onDelete={() =>
              props.setValue(props.value.filter((filterValue) => filterValue._id !== chipValue._id))
            }
            sx={{ marginBottom: 0.5 }}
          />
        ))}
      </Box>
    </div>
  );
}
