const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? process.env.API_BASE_URL
  : 'http://127.0.0.1:8000';
  
export default function ClickDone(id, title, status, duration, completed) { // Doneボタンに対応
    let tempCompleted = completed;
    if (completed === true) { // 達成済みの場合、再開するか確認する
      window.confirm(`「${title}」を再開しますか？`)
      ? tempCompleted = false: tempCompleted = true; 
    } else if (Math.floor(status.filter(n => n === 1).length / duration) < 1) { // 未達成の場合、済にするか確認する
      window.confirm("到達度100%を達成していないけど終了して大丈夫?")
      ? tempCompleted = true: tempCompleted = false; 
    } else {
      tempCompleted = false;
    }

    if (tempCompleted !== completed) { // completedが更新されたら、データベースに反映
      fetch(`${apiBaseUrl}/api/calenders/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: tempCompleted }),
      })
      .then(response => response.json())
      .then(data => {
        if (data) {
          console.log('Succeed', data);
          if (tempCompleted === true) {
            alert(`やったね！${title}を達成しました！(到達度：${Math.floor(status.filter(n => n === 1).length / duration * 100)}%)`);
            window.location.assign(window.location.href);
          } else {
            console.log('Canceled')
          }
        } else {
          console.log('Failed');
        };
      });
      window.location.assign(window.location.href);
    };
  };