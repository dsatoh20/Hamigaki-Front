import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function NativeSelectDate({dayToAdd, setDayToAdd}) {
  const handleChange = (e) => {
    setDayToAdd(Number(e.target.value));
  };
  
  return (
    <Box sx={{ 
        minWidth: 120,
        
     }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          開始
        </InputLabel>
        <NativeSelect
          value={dayToAdd}
          onChange={handleChange}
          inputProps={{
            name: 'dayToAdd',
            id: 'uncontrolled-native',
          }}
        >
          <option value={0}>Today</option>
          <option value={1}>Tomorrow</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
