import { Fragment, useCallback, useEffect, useState } from 'react';
import { FilterRangeProps, FilterTextFieldProps } from '../types';

import FilterLabel from './FilterLabel';
import { debounce, Stack, TextField } from '@mui/material';
import { DEBOUNCE_DELAY_TEXTFIELD } from '../consts';

function FilterTextField(props: FilterTextFieldProps) {
  const [inputValue, setInputValue] = useState<string>(props.value);

  // Clicking "Clear filters" will only set the filter value (props.value), not the inputValue
  // We have to check for this case manually
  useEffect(() => {
    if (props.value === '' && inputValue !== '') {
      setInputValue('');
    }
  }, [props.value]);

  // 2 functions, so debounce reference does not get lost
  const handleInputChangeDebounce = useCallback(
    debounce(async (newInputValue: string) => {
      props.setValue(newInputValue);
    }, DEBOUNCE_DELAY_TEXTFIELD),
    []
  );

  function handleInputChange(newInputValue: string) {
    setInputValue(newInputValue);
    handleInputChangeDebounce(newInputValue);
  }

  return (
    <TextField
      label={props.label}
      size="small"
      value={inputValue}
      type={'number'}
      onChange={(event) => handleInputChange(event.target.value)}
      InputProps={{
        inputProps: {
          min: 0,
        },
      }}
      sx={{ width: '135px' }}
    />
  );
}

export default function FilterRange(props: FilterRangeProps) {
  return (
    <Fragment>
      <FilterLabel label={props.label} helpTooltip={props.helpTooltip}></FilterLabel>
      <Stack direction="row" style={{ alignItems: 'center' }} justifyContent={'space-between'}>
        <FilterTextField
          label={props.labelStart}
          value={props.valueStart}
          setValue={props.setValueStart}
        />
        <div>-</div>
        <FilterTextField
          label={props.labelEnd}
          value={props.valueEnd}
          setValue={props.setValueEnd}
        />
      </Stack>
    </Fragment>
  );
}
