import { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useNetworkGet } from '../network';
import { useModelId } from '../context/ModelIdContext';
import { AutocompleteLoadingIcon } from './FilterAutocomplete';

export function ModelIdAutocomplete() {
  const [options, setOptions] = useState<readonly string[]>([]);
  const [open, setOpen] = useState(false);
  const modelId = useModelId();

  const { refetch, isFetching } = useNetworkGet(`fe/topics/models`, 'ldaModelId', (data) => {
    setOptions(data.models);
  });

  useEffect(() => {
    if (open && options.length === 0) {
      refetch();
    }
  }, [open]);

  return (
    <Autocomplete
      id={'autocomplete-modelid'}
      sx={{ width: 300, padding: 0 }}
      size="small"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={modelId.modelId}
      onChange={(event, newValue) => {
        modelId.setModelId(newValue);
      }}
      options={options}
      loading={isFetching}
      renderInput={(params) => (
        <TextField
          {...params}
          label={'Select'}
          InputProps={{
            ...params.InputProps,
            endAdornment: <AutocompleteLoadingIcon isFetching={isFetching} params={params} />,
          }}
        />
      )}
    />
  );
}
