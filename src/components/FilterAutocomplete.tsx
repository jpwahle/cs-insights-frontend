import { Fragment, ReactElement, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import '../App.css';
import {
  Autocomplete,
  Box,
  capitalize,
  Chip,
  CircularProgress,
  debounce,
  TextField,
} from '@mui/material';
import { useNetworkGet } from '../network';
import { FilterAutocompleteProps } from '../types';
import {
  ACCESS_TYPE_OPEN,
  ACCESS_TYPE_OTHER,
  DEBOUNCE_DELAY_AUTOCOMPLETE,
  FIELDS_OF_STUDY,
  TYPES_OF_PAPER,
} from '../consts';
import FilterLabel from './FilterLabel';

function useDebounce<T>(
  route: string,
  label: string,
  setOptions: (value: T[]) => void,
  inputValue: string,
  setInputValue: (value: string) => void
): {
  handleInputChange: (newInputValue: string, event: SyntheticEvent, reason: string) => void;
  isFetching: boolean;
} {
  const [pattern, setPattern] = useState<string>('');

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
    }, DEBOUNCE_DELAY_AUTOCOMPLETE),
    []
  );

  function handleInputChange(newInputValue: string, event: SyntheticEvent, reason: string) {
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

function TagsAndTooltip<T extends { _id: string; [key: string]: string } | string>(props: {
  helpTooltip: string;
  label: string;
  labelName: string;
  value: T[];
  setValue: (value: T[]) => void;
  children: ReactElement;
}) {
  function chipLabel(chipValue: { _id: string; [key: string]: string } | string) {
    const str = typeof chipValue === 'string' ? chipValue : chipValue[props.labelName];
    return capitalize(str);
  }
  return (
    <Fragment>
      <FilterLabel label={props.label} helpTooltip={props.helpTooltip} />
      <div>
        {props.children}
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
              label={chipLabel(chipValue)}
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
    </Fragment>
  );
}

export function FilterMultipleObjectFetch<T extends { _id: string; [key: string]: string }>(
  props: FilterAutocompleteProps<T[]>
) {
  const [options, setOptions] = useState<readonly T[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const { handleInputChange, isFetching } = useDebounce(
    props.route,
    props.labelName,
    setOptions,
    inputValue,
    setInputValue
  );

  return (
    <TagsAndTooltip
      helpTooltip={props.helpTooltip}
      label={props.label}
      labelName={props.labelName}
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
        getOptionLabel={(option: T) => option[props.labelName]}
        options={options}
        loading={isFetching}
        filterOptions={(x) => x}
        renderOption={(renderProps, option) => (
          <li {...renderProps} key={option._id}>
            {option[props.labelName]}
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
                <Fragment>
                  {isFetching ? (
                    <CircularProgress color="inherit" size={20} sx={{ marginRight: '30px' }} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
          />
        )}
      />
    </TagsAndTooltip>
  );
}

export function FilterMultipleStringFetch(props: FilterAutocompleteProps<string[]>) {
  const [options, setOptions] = useState<readonly string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const { handleInputChange, isFetching } = useDebounce(
    props.route,
    props.labelName,
    setOptions,
    inputValue,
    setInputValue
  );

  return (
    <TagsAndTooltip
      helpTooltip={props.helpTooltip}
      label={props.label}
      labelName={props.labelName}
      value={props.value}
      setValue={props.setValue}
    >
      <Autocomplete
        multiple
        id={'autocomplete-' + props.labelName}
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
                <Fragment>
                  {isFetching ? (
                    <CircularProgress color="inherit" size={20} sx={{ marginRight: '30px' }} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
          />
        )}
      />
    </TagsAndTooltip>
  );
}

export function FilterMultipleStringLocal(props: FilterAutocompleteProps<string[]>) {
  let options: string[] = [];

  switch (props.labelName) {
    case 'typesOfPaper':
      options = TYPES_OF_PAPER;
      break;
    case 'fieldsOfStudy':
      options = FIELDS_OF_STUDY;
      break;
  }

  return (
    <TagsAndTooltip
      helpTooltip={props.helpTooltip}
      label={props.label}
      labelName={props.labelName}
      value={props.value}
      setValue={props.setValue}
    >
      <Autocomplete
        multiple
        id={'autocomplete-' + props.labelName}
        sx={{ width: 300 }}
        size="small"
        value={props.value}
        onChange={(event, value) => props.setValue(value)}
        getOptionLabel={(option) => capitalize(option)}
        options={options}
        renderTags={() => null}
        renderInput={(params) => <TextField {...params} label={'Select'} />}
      />
    </TagsAndTooltip>
  );
}

export function FilterSingleStringLocal(props: FilterAutocompleteProps<string | null>) {
  const options = [ACCESS_TYPE_OPEN, ACCESS_TYPE_OTHER];

  return (
    <Fragment>
      <FilterLabel label={props.label} helpTooltip={props.helpTooltip} />
      <Autocomplete
        id={'autocomplete-' + props.labelName}
        sx={{ width: 300 }}
        size="small"
        value={props.value}
        onChange={(event, value) => props.setValue(value)}
        options={options}
        renderInput={(params) => <TextField {...params} label={'Select'} />}
      />
    </Fragment>
  );
}
