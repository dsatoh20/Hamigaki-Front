const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_BASE_URL
  : 'http://127.0.0.1:8000';

// ログアウト関数
export const handleLogout = async (setIsLoggedin, fetchUserInfo) => {

    try {
        const response = await fetch(`${apiBaseUrl}/api/v1/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            localStorage.removeItem('authToken');
            fetchUserInfo();
            setIsLoggedin(false);
            console.log("Logged out successfully");
            alert("Successfully logged out!")
            
            // 必要に応じてログアウト後のリダイレクトや状態更新
        } else {
            console.error("Logout failed");
            alert("failed to logout...")
        }
    } catch (error) {
        console.error("Error during logout:", error);
        alert("unexpected error occured")
    }
};
