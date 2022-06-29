import { FilterRangeProps, FilterTextfield } from '../types';

import FilterLabel from './FilterLabel';
import { debounce, Stack, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { DEBOUNCE_DELAY_TEXTFIELD } from '../consts';

function FilterTextField(props: FilterTextfield) {
  const [inputValue, setInputValue] = useState<string>('');

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
      onChange={(event) => handleInputChange(event.target.value)}
      sx={{ width: '135px' }}
    />
  );
}

export default function FilterRange(props: FilterRangeProps) {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
