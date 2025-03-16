import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';

import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid2, Typography, Stack } from '@mui/material';
import SquareCorners from './PaperComponent';
import { useUser } from '../AuthWrapper';

const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_BASE_URL
  : 'http://127.0.0.1:8000';

function GetCompleted(checked) {
  const [calendars, setCalendars] = useState([]);
  const user = useUser();
  

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/calenders/`)
      .then(response => response.json())
      .then(data => setCalendars(data));
  }, []);
  const expiredCalendars = calendars.filter(item => new Date(item.end_date) < new Date() && item.completed === false && item.owner === user.user?.id);
  const completedCalendars = calendars.filter(item => item.completed === true && item.owner === user.user?.id);
  return (
    <Grid2 container rowSpacing={2} columnSpacing={2}>
      {checked === false
      ? expiredCalendars.map((item, index) =>(
        <SquareCorners item={item} bgcolor="secondary.light" key={index}/>
      ))
      : completedCalendars.map((item, index) =>(
        <SquareCorners item={item} bgcolor="primary.light" key={index}/>
      ))}
    </Grid2>
  )
}



export default function SimpleGrow() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box 
        sx={{ 
            height: "100%",
            paddingBottom: '4vh',
            }}>
      <Stack direction="row" spacing={1} sx={{alignItems: 'center', justifyContent: 'center'}}>
        <Typography>Expired</Typography>
        <FormControlLabel sx={{display: 'flex'}}
          control={<Switch checked={checked} onChange={handleChange} />}/>
        <Typography>Completed</Typography>
      </Stack>
      <Box sx={{ display: '' }}>
        {/* Conditionally applies the timeout prop to change the entry speed. */}
        
        {GetCompleted(checked)}
        
      </Box>
    </Box>
  );
}
