import { useState } from "react";
import { MenuItem, Button, Menu } from "@mui/material";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';

const url = require('../ApiRoot.json');
const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? url.API_ROOT
  : 'http://127.0.0.1:8000';

export default function ClickExtend({ id, title, duration, btnColor }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // メニューを開くための関数
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // ボタンの位置にメニューを表示
  };

  // メニューを閉じるための関数
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    if (window.confirm('延長するけど大丈夫？')) {
      fetch(`${apiBaseUrl}/api/calenders/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ duration: Number(e.target.value + duration) }), // 初期値に選択値を加える
      })
      .then(response => response.json())
      .then(data => {
        if (data) {
          console.log('Succeed', data);
          alert(`${title}の終了を延長しました！あなたの意識の高さに脱帽！`);
          window.location.assign(window.location.href);
        } else {
          console.log('Failed');
        };
      });
    }
    handleClose(); // メニューを閉じる
  };

  return (
    <>
      <Button
        size="small"
        sx={{ color: btnColor, position: "absolute", left: "3vw", bottom: "20%" }}
        onClick={handleClick} // メニューを開く
      >
        <EventRepeatIcon sx={{ marginRight: 1 }} />
        Extend
      </Button>
      
      <Menu
        anchorEl={anchorEl} // メニューを開く位置
        open={open} // メニューが開いているかどうか
        onClose={handleClose} // メニューを閉じる
      >
        <MenuItem value={7} onClick={handleChange}>1week</MenuItem>
        <MenuItem value={31} onClick={handleChange}>1month</MenuItem>
        <MenuItem value={91} onClick={handleChange}>3months</MenuItem>
      </Menu>
    </>
  );
}