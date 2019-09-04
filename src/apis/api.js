
export const getDashboardListing = (url) => fetch(url, {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        "access-control-allow-origin" : "*",
        'Content-Type': 'application/json'
    }
}).then(res => res.json())
    .then(data => data.Items)
    .catch(console.log);