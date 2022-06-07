import React, { useCallback, useEffect } from 'react';
import '../App.css';
import {
  Autocomplete,
  Chip,
  CircularProgress,
  debounce,
  TextField,
  Tooltip as MuiTooltip,
} from '@mui/material';
import { useNetworkGet } from '../network';
import { FilterCategoricalProps } from '../types';
import {
  ACCESS_TYPE_OPEN,
  ACCESS_TYPE_OTHER,
  DEBOUNCE_DELAY,
  FIELDS_OF_STUDY,
  TYPES_OF_PAPER,
} from '../consts';
import Box from '@mui/material/Box';

function useDebounce<T>(
  route: string,
  label: string,
  setOptions: (value: T[]) => void,
  inputValue: string,
  setInputValue: (value: string) => void
): {
  handleInputChange: (newInputValue: string, event: React.SyntheticEvent, reason: string) => void;
  isFetching: boolean;
} {
  const [pattern, setPattern] = React.useState<string>('');

  const { refetch, isFetching } = useNetworkGet(
    `fe/${route}/list`,
    'list-' + label,
    (data) => {
      setOptions(data);
    },
    { column: label, pattern: inputValue }
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

  return { handleInputChange, isFetching };
}

function Tooltip(props: { tooltip: string; children: React.ReactElement }) {
  return (
    <MuiTooltip placement="top-end" title={props.tooltip}>
      {props.children}
    </MuiTooltip>
  );
}

function TagsAndTooltip<T extends { _id: string; [key: string]: string } | string>(props: {
  tooltip: string;
  label: string;
  value: T[];
  setValue: (value: T[]) => void;
  children: React.ReactElement;
}) {
  return (
    <div className="categoricalFilter">
      <Tooltip tooltip={props.tooltip}>{props.children}</Tooltip>
      <Box
        mt={0.5}
        sx={{
          '& > :not(:last-child)': { mr: 0.5 },
          '& > *': { mr: 0.5 },
        }}
      >
        {props.value.map((chipValue) => (
          <Chip
            key={typeof chipValue === 'string' ? chipValue : chipValue._id}
            label={typeof chipValue === 'string' ? chipValue : chipValue[props.label]}
            onDelete={() =>
              props.setValue(
                props.value.filter((filterValue) =>
                  typeof chipValue === 'string' || typeof filterValue === 'string'
                    ? filterValue !== chipValue
                    : filterValue._id !== chipValue._id
                )
              )
            }
            sx={{ marginBottom: 0.5 }}
          />
        ))}
      </Box>
    </div>
  );
}

export function FilterMultipleObjectFetch<T extends { _id: string; [key: string]: string }>(
  props: FilterCategoricalProps<T[]>
) {
  const [options, setOptions] = React.useState<readonly T[]>([]);
  const [inputValue, setInputValue] = React.useState<string>('');

  const { handleInputChange, isFetching } = useDebounce(
    props.route,
    props.label,
    setOptions,
    inputValue,
    setInputValue
  );

  return (
    <TagsAndTooltip
      tooltip={props.tooltip}
      label={props.label}
      value={props.value}
      setValue={props.setValue}
    >
      <Autocomplete
        multiple
        id={'autocomplete-' + props.route}
        sx={{ width: 300 }}
        size="small"
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
            label={'Search'}
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
    </TagsAndTooltip>
  );
}

export function FilterMultipleStringFetch(props: FilterCategoricalProps<string[]>) {
  const [options, setOptions] = React.useState<readonly string[]>([]);
  const [inputValue, setInputValue] = React.useState<string>('');

  const { handleInputChange, isFetching } = useDebounce(
    props.route,
    props.label,
    setOptions,
    inputValue,
    setInputValue
  );

  return (
    <TagsAndTooltip
      tooltip={props.tooltip}
      label={props.label}
      value={props.value}
      setValue={props.setValue}
    >
      <Autocomplete
        multiple
        id={'autocomplete-' + props.label}
        sx={{ width: 300 }}
        size="small"
        value={props.value}
        onChange={(event, value) => props.setValue(value)}
        inputValue={inputValue}
        onInputChange={(event, newInputValue, reason) =>
          handleInputChange(newInputValue, event, reason)
        }
        options={options}
        loading={isFetching}
        filterOptions={(x) => x}
        renderTags={() => null}
        renderInput={(params) => (
          <TextField
            {...params}
            label={'Search'}
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
    </TagsAndTooltip>
  );
}

export function FilterMultipleStringLocal(props: FilterCategoricalProps<string[]>) {
  let options: string[] = [];

  switch (props.label) {
    case 'typesOfPaper':
      options = TYPES_OF_PAPER;
      break;
    case 'fieldsOfStudy':
      options = FIELDS_OF_STUDY;
      break;
  }

  return (
    <TagsAndTooltip
      tooltip={props.tooltip}
      label={props.label}
      value={props.value}
      setValue={props.setValue}
    >
      <Autocomplete
        multiple
        id={'autocomplete-' + props.label}
        sx={{ width: 300 }}
        size="small"
        value={props.value}
        onChange={(event, value) => props.setValue(value)}
        options={options}
        renderTags={() => null}
        renderInput={(params) => <TextField {...params} label={'Select'} />}
      />
    </TagsAndTooltip>
  );
}

export function FilterSingleStringLocal(props: FilterCategoricalProps<string | null>) {
  const options = [ACCESS_TYPE_OPEN, ACCESS_TYPE_OTHER];

  return (
    <Tooltip tooltip={props.tooltip}>
      <Autocomplete
        id={'autocomplete-' + props.label}
        sx={{ width: 300 }}
        size="small"
        value={props.value}
        onChange={(event, value) => props.setValue(value)}
        options={options}
        renderInput={(params) => <TextField {...params} label={'Select'} />}
      />
    </Tooltip>
  );
}
