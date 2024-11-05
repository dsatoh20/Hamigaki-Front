export const getCsrfToken = () => {
    const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    console.log("cookie: ", document.cookie);
    console.log("csrfToken: ", csrfToken)

    return csrfToken;
};

/*const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_BASE_URL
  : 'http://127.0.0.1:8000';


export const getCsrfToken = async (csrfToken, setCsrfToken) => {
    if (csrfToken === "") {
        const response = await fetch(`${apiBaseUrl}/api/v1/get-csrf-token/`, {
            method: 'GET',
            credentials: 'include'
        })
        const data = await response.json();
        console.log("csrftoken from django endpoint: ", data);
        setCsrfToken(data.csrftoken);
        localStorage.setItem("csrfToken", csrfToken);
    } else {
        console.log("csrftoken has already existed: ", csrfToken);
        localStorage.setItem("csrfToken", csrfToken)
        console.log("csrfToken localstorage: ", localStorage.getItem("csrfToken"))
    };
};*/