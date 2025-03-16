import React, { useEffect, useState } from 'react';
import './App.css';
import { Typography, Stack, Box } from '@mui/material';
import Container from '@mui/material/Container';
import OutlinedCard from './components/CardComponent';
import SimpleGrow from './components/TransitionsGrow';
import { useUser } from './AuthWrapper';


const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_BASE_URL
  : 'http://127.0.0.1:8000';


function App() {
  const [calendars, setCalendars] = useState([])
  const user = useUser();
  const [userId, setUserId] = useState();

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/calenders/`)
      .then(response => response.json())
      .then(data => setCalendars(data));
    if (user.user !== null) {
      setUserId(user.user?.id);
    } else {
      setUserId();
    };
  }, [user]);

  const inProgressCalendars = calendars.filter(item => new Date(item.end_date) >= new Date() && item.completed === false && item.owner === userId);
  console.log("次のユーザーのカレンダーを表示中", user.user?.username, userId, inProgressCalendars)

  const demoCalendars = calendars.filter(item => item.owner === 3); // ハードコーディング
  

  return (
    <div className="App">
      <Container maxWidth="sm">
        <br></br>
        <Stack spacing={2}>
          {inProgressCalendars.map((item, index) => (
            <OutlinedCard item={item} key={index} bgcolor="primary.light" />
          ))}
        </Stack>
      </Container>
      {!user.user && (
        <Container maxWidth="sm">
          <Typography variant='body1' className='calendar-group-title'><u>_Demos_</u></Typography>
          <br></br>
          <Stack spacing={2}>
            {demoCalendars.map((item, index) => (
              <OutlinedCard item={item} key={index} bgcolor="primary.light" />
            ))}
          </Stack>
        </Container>
      )}
      <Container maxWidth="sm">
        <Typography variant='body1' className='calendar-group-title'><u>_History_</u></Typography>
        <SimpleGrow />
      </Container>
      
      <Box height='15vh' />
    </div>
  );
}

export default App;
