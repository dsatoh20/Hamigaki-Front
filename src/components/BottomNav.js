import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Button, TextField, Typography, Menu, MenuItem } from '@mui/material';
import NativeSelectDate from './SelectStartdate';
import NativeSelectDuration from './SelectDuration';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useUser } from '../AuthWrapper';
import { getCsrfToken } from './usercomponents/CsrfTokenFunc';

const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_BASE_URL
  : 'http://127.0.0.1:8000';

export default function SimpleBottomNavigation() {
  console.log('Buttom Navが動いてます')
  const user = useUser();
  const [userId, setUserId] = React.useState(3); // ハードコーディング

  // userの変更時に一度だけuserIdを更新
  React.useEffect(() => {
    if (user) {
      setUserId(user.user?.id);
    } else {
      setUserId(3); // testuserのid
    }
  }, [user]);

  const [value, setValue] = React.useState(0);
  //const [addOn, setAddOn] = React.useState(0);
  const [title, setTitle] = React.useState('');
  const [purpose, setPurpose] = React.useState('');
  const [duration, setDuration] = React.useState(7);
  const [dayToAdd, setDayToAdd] = React.useState(0); // 0 or 1 = today or tomorrow
  // addフォームを開く
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // addフォームを閉じる
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  function SetNewCalender() {
    const token = localStorage.getItem('authToken');
    const calcStart_date = (dayToAdd) => { // 0 or 1を入力
        const today = new Date();
        today.setDate(today.getDate() + dayToAdd);
        return today.toISOString();
    }
    const newCalenderData = {
        owner: Number(userId),
        title: title,
        purpose: purpose,
        start_date: calcStart_date(dayToAdd),
        duration: duration,
    };


    fetch(`${apiBaseUrl}/api/calenders/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(newCalenderData)
    })
    .then(response => {
        response.json();
        if (response.ok) {
            // Reset the Form
            setTitle('');
            setPurpose('');
            setDayToAdd(0);
            setDuration(7);
            handleClose(); // addをoffに
            alert('Successflly set a new calender!');
            window.location.assign(window.location.href);
        } else {
            alert('Failed to set...')
        }
    })
    .then(data => {
        console.log('Success: ', data);
        
    })
    .catch((error) => {
        console.error('Error: ', error)
    })

    
  }

  return (
    <Box 
        sx={{
            zIndex: "1",
            position: "absolute"
        
    }}>
        
        <Box 
            component="footer"
            sx = {{
            position: 'fixed',
            bottom: '9vh',
            width: '100%',
            display: 'fixed',
            justifyContent: 'center',
            }}
        >
        
            <Menu 
                width= '100vw'
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                open={Boolean(anchorEl)}
                onClose={handleClose}     
                sx = {{
                    margin: '100%',
                    height: '100vh'
                }}           
            >
                <Box
                    border={1}
                    boxShadow={4}
                    sx = {{
                        position: 'fixed',
                        bottom: '20vh',
                        padding: '2vh',
                        bgcolor: 'primary.contrastText',
                        color: 'secondary.contrastText',
                        borderColor: 'primary.dark',
                        left: '50%',
                        transform: 'translateX(-50%)', 
                        width: '60vw'
                        }}
                >
                    <Typography variant='h6' color='primary.dark'>New Calender</Typography>
                    <MenuItem><TextField 
                        id='standard-basic' 
                        label='タイトル' 
                        variant='standard'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        ></TextField></MenuItem>
                    <MenuItem><TextField 
                        id='standard-basic' 
                        label='意気込み' 
                        variant='standard'
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        ></TextField></MenuItem>
                    <MenuItem><NativeSelectDate dayToAdd={dayToAdd} setDayToAdd={setDayToAdd}/></MenuItem>
                    <MenuItem><NativeSelectDuration duration={duration} setDuration={setDuration} /></MenuItem>
                    <MenuItem><Button 
                        variant='outlined'
                        sx={{
                            width: '100%',
                            marginTop: '1vh',
                            color: 'primary.dark'
                        }}
                        onClick={SetNewCalender}
                    >Set
                    </Button></MenuItem>
                </Box>
            </Menu>
            <Fab sx={{
                 bgcolor: 'secondary.main',
                 right: '0',
                 }} 
                 aria-label="add"
                 onClick={handleMenu}
            >
                <AddIcon />
            </Fab>
        </Box>
        <Box 
            sx={{ 
                position: 'fixed',
                width: '100vw', 
                bgcolor: "primary.dark",
                bottom: '0',
            }}
        >
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);

            switch (newValue) {
                case 0:
                  console.log('Homeページ');
                  // My Calendarsが選択されたときのアクション
                  break;
                case 1:
                  console.log('友だちの挑戦から刺激を受けられる予定');
                  // Timelineが選択されたときのアクション
                  break;
                case 2:
                  console.log('お知らせが届く予定');
                  // Notificationが選択されたときのアクション
                  break;
                default:
                  console.log('Unknown action');
                }
            }}
            sx={{ bgcolor: 'primary.dark' }}    
        >
            <BottomNavigationAction label="My Calenders" icon={<DateRangeIcon />} />
            <BottomNavigationAction label="Timeline" icon={<ViewTimelineIcon />} />
            <BottomNavigationAction label="Notification" icon={<NotificationsIcon />} />
        </BottomNavigation>
        </Box>
    </Box>
  );
}
