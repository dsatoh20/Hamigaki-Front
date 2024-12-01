import * as React from 'react';
import {Box, Card, CardActions, CardContent, Button, Typography } from '@mui/material';


import ProgressSlide from './SwiperSlideComponent';
import { useState } from 'react';
import FeedBackIcon from '@mui/icons-material/Feedback';
import EventAvaliableIcon from '@mui/icons-material/EventAvailable';
import ClickDone from './ClickDoneFunc';
import ClickExtend from './ExtendFormComponent.js';
import PublicBooleanField from './PublicComponent.js';


const CustomCard = ({id, title, purpose, start_date, duration, end_date, status, completed, publicStat}) => {
  const [stat, setStatus] = useState(status);
  
  function handleClick() {
    alert(`初心を思い出そう！：「${purpose}」`)};

  
  return (
    <React.Fragment>
      <CardContent sx={{paddingBottom: '5%'}}>
        <PublicBooleanField id={id} publicStat={publicStat}/>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {start_date} ~ {end_date} ({duration} days)
        </Typography>
        <Typography variant="h5" component="div" color="text.primary">
          {title}<Button color='primary.dark' sx={{minWidth: 2,}} onClick={handleClick}><FeedBackIcon fontSize='small' /></Button>
        </Typography>
        
        <ProgressSlide id={id} status={stat} setStatus={setStatus} start_date={start_date}/>
      </CardContent>
      <CardActions sx={{position: "relative", padding: 3}}>
        <ClickExtend id={id} title={title} duration={duration} btnColor="primary.dark" status={stat}/>
        <Button size="small" sx={{ color: "primary.dark", position: "absolute", right: "3vw", bottom: "20%"}} onClick={() => ClickDone(id, title, status, duration, completed)}>Done<EventAvaliableIcon sx={{marginLeft: 1}} /></Button>
      </CardActions>
    </React.Fragment>
  );
  
};

export default function OutlinedCard({ item, bgcolor }) {
  return (
    <Box sx={{ minWidth: 275, height: 'auto', position: 'relative'}} >
      <Card variant="outlined" sx={{ bgcolor: bgcolor, boxShadow: '1px 2px 4px 1px rgba(0, 0, 0, 0.2)' }}>
        <CustomCard 
          id={item.id}
          title={item.title}
          purpose={item.purpose}
          start_date={new Date(item.start_date).toLocaleDateString()}
          duration={item.duration}
          end_date={new Date(item.end_date).toLocaleDateString()}
          status={item.status}
          completed={item.completed}
          publicStat={item.public}
        />
      </Card>
    </Box>
  );
};
