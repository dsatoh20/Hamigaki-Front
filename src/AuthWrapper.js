import React, { createContext, useContext, useState, useEffect } from 'react';

const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_BASE_URL
  : 'http://127.0.0.1:8000';
  
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUserInfo = async () => {
        const token = localStorage.getItem('authToken');  // 毎回最新のトークンを取得
        console.log("Fetching user info with token:", token);
        
        if (!token) {
            console.log("tokenがない！")
            setUser(null);  // トークンがない場合は未ログイン状態に設定
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}/api/v1/current-user/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                setUser(null);  // 認証エラーの場合も未ログイン状態に設定
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
            setUser(null);
        }
    };

    // 初期レンダリング時にユーザー情報を取得
    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <UserContext.Provider value={{ user, fetchUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};

// カスタムフックでコンテキストを簡単に利用できるようにする
export const useUser = () => useContext(UserContext);
