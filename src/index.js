import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { UserProvider } from './AuthWrapper';
import App from './App';
import MenuAppBar from './components/AppBarComponent';
import BottomNavigation from './components/BottomNav';

// service-workerの設定
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js").then((registration) => {
      registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  // 新しいService Workerを適用する
                  newWorker.postMessage({ type: "SKIP_WAITING" });
                  window.location.reload();  // ページをリロードして最新キャッシュを適用
              }
          });
      });
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));


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
