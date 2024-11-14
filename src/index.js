import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { UserProvider } from './AuthWrapper';
import App from './App';
import MenuAppBar from './components/AppBarComponent';
import BottomNavigation from './components/BottomNav';


const root = ReactDOM.createRoot(document.getElementById('root'));
const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_BASE_URL
  : 'http://127.0.0.1:8000';

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
      fetchData();  // 再開時にデータを更新
  }
});

function fetchData() {
  fetch(`${apiBaseUrl}/api/calenders`, { cache: "no-store" })  // キャッシュを無効化して最新データを取得
      .then((response) => response.json())
      .then((data) => {
          // データをアプリに反映
          console.log(data);  // 必要な更新処理を実行
      })
      .catch((error) => {
          console.error("データの取得に失敗しました:", error);
      });
}



root.render(
  <ThemeProvider theme={theme}>
    <UserProvider>
      <MenuAppBar />
      <App />
      <BottomNavigation />
    </UserProvider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
