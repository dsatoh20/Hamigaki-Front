import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function ColorsTimeline({status}) {
    
  return (
    <Timeline position="alternate">
      {status.map((stat, index) => (
          <TimelineItem key={index}>
              <TimelineSeparator>
                  <TimelineDot color={stat === 1 ? "secondary" : "primary"} />
                  {index !== status.length && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent color='secondary.dark'>{stat === 1 ? "Done" : "Pending"}</TimelineContent>
          </TimelineItem>
      ))}
      
    </Timeline>
  );
}
