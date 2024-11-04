export const getCsrfToken = () => {
    const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    console.log("cookie: ", document.cookie);
    console.log("csrfToken: ", csrfToken)
    return csrfToken;
};
