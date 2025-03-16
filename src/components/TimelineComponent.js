import {Box, Card, CardContent, Button, Typography, Container, Stack } from '@mui/material';
import { Fragment, useState, useEffect } from 'react';
import FeedBackIcon from '@mui/icons-material/Feedback';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useUser } from '../AuthWrapper';
import '../App.css';
import SearchUserInput from './usercomponents/SearchUserComponent';


const CustomCard = ({id, title, purpose, start_date, duration, end_date, status, completed}) => {
  
  function handleClick() {
    alert(`こんな気持ちで頑張ってます！：「${purpose}」`)};
  const unitWidth = 100/status.length;
  // 日付を計算する関数
  function calcDate(startDate, passedDays) {
    let start = new Date(startDate);
    start.setDate(start.getDate() + passedDays)
    return start
  };
  // 今日のindexを取得する
  function getTodayId(startDate) {
    let start = new Date(startDate);
    return Math.floor((new Date() - start) / (1000 * 60 * 60 * 24))
  }

  return (
    <Fragment>
      <CardContent sx={{paddingBottom: '5%'}}>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {start_date} ~ {end_date} ({duration} days)
        </Typography>
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 1
        }}>
          <AccountCircleIcon />
          <Typography sx={{marginLeft: 1}}>
            ownerName
          </Typography>
        </Box>
        <Typography variant="h5" component="div" color="text.primary">
          {title}<Button color='primary.dark' sx={{minWidth: 2,}} onClick={handleClick}><FeedBackIcon fontSize='small' /></Button>
        </Typography>
        <Typography variant='body1' component="div" color='text.primary'>
            <Box
                sx={{
                    display: "inline-block",
                    width: "90%",
                    height: "2vh",
                    paddingRight: 1,
                    boxSizing: "border-box",
                }}>
                
                <Box 
                sx={{
                    display: 'inline-flex',
                    bgcolor: '#68534b',
                    border: 2,
                    borderColor: "#fff",
                    borderRadius: 2,
                    width: '100%',
                    height: '100%',
                    boxSizing: "border-box"
                    }}>
                      {status.map((stat, index) => (
                        <Box key={index}
                        sx={{
                            bgcolor: new Date() < calcDate(start_date, index) ? '#fff': new Date() > calcDate(start_date, index) & stat===1 ? '#00A2E8': '#68534b',
                            borderRadius: 0,
                            width: `${unitWidth}%`,
                            height: '100%',
                            position: 'relative',
                            boxSizing: "border-box",
                          }} />
                      ))}
                        

                </Box>
                
            </Box>
            <Box>{Math.round(Number(getTodayId(start_date) + 1)/Number(status.filter(n => n === 1).length) * 10) / 10}日あたり1回のペース</Box>

        </Typography>
      </CardContent>
    </Fragment>
  );
  
};

function TimelineCard({ item }) {
  return (
    <Box sx={{ minWidth: 275, height: 'auto' }} >
      <Card variant="outlined" sx={{ bgcolor: 'primary.light', boxShadow: '1px 2px 4px 1px rgba(0, 0, 0, 0.2)' }}>
        <CustomCard 
          id={item.id}
          title={item.title}
          purpose={item.purpose}
          start_date={new Date(item.start_date).toLocaleDateString()}
          duration={item.duration}
          end_date={new Date(item.end_date).toLocaleDateString()}
          status={item.status}
          completed={item.completed}
        />
      </Card>
    </Box>
  );
};


const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_BASE_URL
  : 'http://127.0.0.1:8000';

export default function TimelineApp() {
  const [calendars, setCalenders] = useState([])
  const user = useUser();
  const [userId, setUserId] = useState();

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/calenders/`)
      .then(response => response.json())
      .then(data => setCalenders(data));
    if (user.user !== null) {
      setUserId(user.user?.id);
    } else {
      setUserId();
    };
  }, [user]);

  const sharedCalenders = calendars.filter(item => item.completed === false && item.owner === userId && new Date(item.end_date) > new Date() && item.public === true); // 一旦自分のカレンダーだけ表示 --> 将来的には、相互フォローのユーザーのデータだけ表示
  return (
    <div className="App BottomMenu">
      <Box height={'56px'} />
      <Container maxWidth="sm">
        <br></br>
        <Stack spacing={2}>
          <SearchUserInput />
          {sharedCalenders.map((item, index) => (
            <TimelineCard item={item} key={index} bgcolor="primary.light" />
          ))}
        </Stack>
        <Box height={'15vh'} />
      </Container>
      
      <Box height='15vh' />
    </div>
  );
};