import { getCsrfToken } from "./CsrfTokenFunc";

const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_BASE_URL
  : 'http://127.0.0.1:8000';

// ログアウト関数
export const handleLogout = async (setIsLoggedin, fetchUserInfo) => {
    const csrfToken = await getCsrfToken();

    try {
        const response = await fetch(`${apiBaseUrl}/api/v1/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,  // CSRFトークンをヘッダーに追加
            },
            credentials: 'include',  // セッション情報を含める
        });

        if (response.ok) {
            localStorage.removeItem('authToken');
            fetchUserInfo();
            setIsLoggedin(false);
            console.log("Logged out successfully");
            
            // 必要に応じてログアウト後のリダイレクトや状態更新
        } else {
            console.error("Logout failed");
        }
    } catch (error) {
        console.error("Error during logout:", error);
    }
};
