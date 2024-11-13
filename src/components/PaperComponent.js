import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Button, Typography, CardActions } from '@mui/material';
import EventAvaliableIcon from '@mui/icons-material/EventAvailable';
import ClickExtend from './ExtendFormComponent.js';
import ClickDone from './ClickDoneFunc.js';
import FeedBackIcon from '@mui/icons-material/Feedback';

const RoundPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
  square: false,
  boxShadow: '1px 2px 4px 1px rgba(0, 0, 0, 0.2)'
}));

export default function SquareCorners({item, bgcolor}) {
  function handleClick() {
    alert(`初心を思い出そう！：「${item.purpose}」`)};

  return (
    <RoundPaper sx={{bgcolor: bgcolor}}>
        <Typography variant="h6" component="div" color="text.secondary" sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipse'}}>{item.title}<Button color='primary.dark' sx={{minWidth: 2,}} onClick={handleClick}><FeedBackIcon fontSize='small' /></Button></Typography>
        <Typography variant='body3' component="div" color="text.light">{item.status.filter(n => n === 1).length}days ~{new Date(item.end_date).toLocaleDateString()}</Typography>
        <CardActions sx={{position: "relative", height: '4vh'}}>
          <ClickExtend id={item.id} title={item.title} duration={item.duration} btnColor="secondary.dark" status={item.status}/>
          <Button size="small" sx={{ width: 'auto', color: "primary.dark", position: "absolute", right: "-5%"}} onClick={() => ClickDone(item.id, item.title, item.status, item.duration, item.completed)}><EventAvaliableIcon sx={{marginLeft: 1}} /></Button>
        </CardActions>
    </RoundPaper>
  );
}
