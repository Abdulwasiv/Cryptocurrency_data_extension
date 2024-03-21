function fetchDataPeriodically() {
    setInterval(() => {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                processCryptocurrencyData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, 60000); 
}

function processCryptocurrencyData(data) {
    const gainers = [];
    const losers = [];

    data.forEach(coin => {
        if (coin.price_change_percentage_24h > 0) {
            gainers.push(`${coin.name}: ${coin.price_change_percentage_24h.toFixed(2)}%`);
        } else {
            losers.push(`${coin.name}: ${coin.price_change_percentage_24h.toFixed(2)}%`);
        }
    });

    console.log('Top 10 Gainers:', gainers.slice(0, 10));
    console.log('Top 10 Losers:', losers.slice(0, 10));

}

fetchDataPeriodically();
