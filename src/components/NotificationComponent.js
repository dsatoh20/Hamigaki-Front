import {Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useUser } from '../AuthWrapper';
import { format, parseISO } from 'date-fns';
import '../App.css';
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';



const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_BASE_URL
  : 'http://127.0.0.1:8000';

export default function NotificationApp() {
    const [notifications, setNotifications] = useState([])
    const user = useUser();
    const [userId, setUserId] = useState();

    useEffect(() => {
        fetch(`${apiBaseUrl}/api/notifications/`)
        .then(response => response.json())
        .then(data => setNotifications(data));
        if (user.user !== null) {
        setUserId(user.user?.id);
        } else {
        setUserId();
        };
    }, [user]);

    const myNotifications = notifications.filter(item => item.reciever === userId).reverse(); // client宛てのitemを取得
    return (
      <div className="App BottomMenu">
        <Box height={'56px'} />
        <Timeline
            sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2,
            },
            }}
        >
            
            {myNotifications.map((item, index) => (
                <TimelineItem>
                    <TimelineOppositeContent color="white">
                        {item.created_at ? format(parseISO(item.created_at), 'MMM dd, HH:mm') : ''}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'left',
                            marginBottom: 1,
                            color: '#FFFFF0'
                        }}>
                            <AccountCircleIcon />
                            <Typography sx={{ marginLeft: 1, fontSize: 12}}>
                                {item.owner}
                            </Typography>
                            <Typography sx={{ marginLeft: 2 }}>
                                {item.title}
                            </Typography>
                        </Box>
                    </TimelineContent>
                </TimelineItem>
            ))}
            <TimelineItem>
                <TimelineOppositeContent color="white">
                    Dec 12, 00:58
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'left',
                        marginBottom: 1,
                        color: '#FFFFF0'
                    }}>
                        <AccountCircleIcon />
                        <Typography sx={{ marginLeft: 1, fontSize: 12}}>
                            HC staff
                        </Typography>
                        <Typography sx={{ marginLeft: 2 }}>
                            Welcome to Hamigaki Calender!
                        </Typography>
                    </Box>
                </TimelineContent>
            </TimelineItem>
            
        </Timeline>
        <Box height='15vh' />
      </div>
    );
  }