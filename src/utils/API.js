const apiAttributes = {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
        'Authorization': 'bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
    }
};

export default {
    getItems: () => {
        return fetch('https://xxx.api/article')
            .then(res => res.json());
    },
    getDashboardListing: (dashboard_listing_url) => {
    }
}