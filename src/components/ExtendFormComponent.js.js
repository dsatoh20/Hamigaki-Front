import { useState } from "react";
import { MenuItem, Button, Menu } from "@mui/material";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';

const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_BASE_URL
  : 'http://127.0.0.1:8000';

  function addZeros(arr, n) { // 延長n日分のゼロをarrの末尾に追加
    arr.push(...new Array(n).fill(0));
    return arr;
  }

export default function ClickExtend({ id, title, duration, btnColor, status }) {
  const token = localStorage.getItem('authToken');
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
      let updatedStatus = [...status];
      addZeros(updatedStatus, e.target.value);
      console.log("updated: ", status.length, " --> ", updatedStatus.length)
      fetch(`${apiBaseUrl}/api/calenders/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ 
          duration: Number(e.target.value + duration),
          completed: false,
          status: updatedStatus,

        }), // 初期値に選択値を加える
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
