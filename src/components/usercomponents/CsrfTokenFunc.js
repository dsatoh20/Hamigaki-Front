/*export const getCsrfToken = () => {
    const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    console.log("cookie: ", document.cookie);
    console.log("csrfToken: ", csrfToken)
    return csrfToken;
}; */

const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_BASE_URL
  : 'http://127.0.0.1:8000';
export const getCsrfToken = async () => {
    const response = await fetch(`${apiBaseUrl}/api/v1/get-csrf-token/`, {
        method: 'GET',
        credentials: 'include'
    })
    const data = await response.json()
    console.log("csrftoken from django endpoint: ", data)
    return data.csrftoken;
};