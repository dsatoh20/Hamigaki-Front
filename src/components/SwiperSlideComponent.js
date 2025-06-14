// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import { Box, Typography } from "@mui/material"

const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_BASE_URL
  : 'http://127.0.0.1:8000';

export default function ProgressSlide({id, status, setStatus, start_date}) {
  function handleClick(index) {
    const token = localStorage.getItem('authToken');
    let tempArray = [...status];
    tempArray[index] === 0 ? tempArray[index] = 1 : tempArray[index] = 0;
    setStatus(tempArray);
    fetch(`${apiBaseUrl}/api/calenders/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      credentials: 'include',
      body: JSON.stringify({ status: tempArray }),
    })
    .then(response => response.json())
    .then(data => {
      if (data) {
        console.log('Succeed', data);
      } else {
        console.log('Failed');
      };
    });
  };
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
  //Dateを月・日にする
  function simplifyDate(date) {
    return date.toDateString().split(' ').slice(1, 3).join(' ')
  }
  return (
    <>
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
                        borderColor: "#E1565F",
                        borderRadius: 2,
                        width: '100%',
                        height: '100%',
                        boxSizing: "border-box"
                        }}>
                          {status.map((stat, index) => (
                            <Box key={index}
                            sx={{
                                bgcolor: new Date() < calcDate(start_date, index) ? '#fff': new Date() > calcDate(start_date, index) & stat===1 ? '#00A2E8': '#E1565F',
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
      <Box sx={{}}>
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
          initialSlide={getTodayId(start_date)-2}
        >
          {status.map((stat, index) => (
              <SwiperSlide key={index}>
                  <Box 
                      sx={{bgcolor: "primary.light", 
                          opacity: new Date().toDateString() === calcDate(start_date, index).toDateString()? '100%': '50%',
                          height: "auto",
                          width: "auto",
                          marginTop: "1vh",
                          animation: new Date().toDateString() === calcDate(start_date, index).toDateString()? 'blinking 2s infinite': 'blinking 0s infinite',
                          '@keyframes blinking': {
                            '0%': {opacity: 1},
                            '50%': {opacity: 0},
                            '100%': {opacity: 1},
                          },
                          }}
                      onClick = {() => handleClick(index)}
                  >
                      <Typography variant='body2'>{simplifyDate(calcDate(start_date, index))}</Typography>
                      {stat === 1 
                      ? <img src={`${process.env.PUBLIC_URL}/done.png`} alt='Done' width='100%' height='auto'/> 
                      : <img src={`${process.env.PUBLIC_URL}/pending.png`} alt='Pending' width='100%' height='auto'/>}
                  </Box>
              </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}
