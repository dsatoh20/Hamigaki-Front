import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70vw',
  height: '60vh',
  overflow: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>What is Hamigaki Calender?</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            0. What is Hamigaki Calender?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            勉強、筋トレ、ストレッチ、花の水やり...毎日コツコツがんばりたい。そんなあなたの継続をHamigaki Calenderが可視化します。
          </Typography>
          <Typography variant='h6'>1. Create an account</Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Don't have an account?横のトグルスイッチを押すと、Sign upフォームが表示されます。
          </Typography>
          <img src={`${process.env.PUBLIC_URL}/demo/Top.png`} alt="top page" width="100%" text-align="center"/>
          <Typography variant='h6'>2. Set a calender</Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            画面下の+ボタンから、カレンダーを追加します。
          </Typography>
          <img src={`${process.env.PUBLIC_URL}/demo/Home.png`} alt="top page" width="100%" text-align="center"/>
          <img src={`${process.env.PUBLIC_URL}/demo/Set.png`} alt="top page" width="100%" text-align="center"/>
          <Typography variant='h6'>3. Check off today's item</Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            タスクを実行したら、今日のカレンダーをタップしましょう。カレンダーに色が付きます。<br />カレンダー上のバーで進捗を確認できますよ。
          </Typography>
          <img src={`${process.env.PUBLIC_URL}/demo/Before.png`} alt="top page" width="100%" text-align="center" />
          <img src={`${process.env.PUBLIC_URL}/demo/After.png`} alt="top page" width="100%" text-align="center"/>
          <Typography variant='h6'>4. Contact us</Typography>
          <Typography>ご不明点、ご意見、ご要望あればお気軽に<a href='https://docs.google.com/forms/d/e/1FAIpQLSfWCQYAAbk7eGAg30dgcn3gY1tFrSamf1hZF69P9O2N2wjgGQ/viewform' target="_blank" rel="noopener noreferrer">お問い合わせ</a>ください。</Typography>
          
        </Box>
      </Modal>
    </div>
  );
}
