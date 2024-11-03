import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';


export default function NativeSelectDuration({duration, setDuration}) {
  const handleChange = (e) => {
    setDuration(e.target.value);
  };

  return (
    <Box sx={{ 
        minWidth: 120,
        
     }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          継続期間
        </InputLabel>
        <NativeSelect
          value={duration}
          onChange={handleChange}
          inputProps={{
            name: 'duration',
            id: 'uncontrolled-native',
            value: duration,
          }}
        >
          <option value={7}>7days</option>
          <option value={14}>2weeks</option>
          <option value={31}>1month</option>
          <option value={93}>3months</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
