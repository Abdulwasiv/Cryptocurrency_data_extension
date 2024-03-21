document.addEventListener('DOMContentLoaded', function () {
    const gainersList = document.getElementById('gainers-list');
    const losersList = document.getElementById('losers-list');  

    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en')
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
       const topGainers = data.filter(coin => coin.price_change_percentage_24h > 0).slice(0, 10);
        const topLosers = data.filter(coin => coin.price_change_percentage_24h < 0).slice(0, 10);

        topGainers.forEach(coin => {
          gainersList.innerHTML += `<li>${coin.name}: ${coin.price_change_percentage_24h.toFixed(2)}%</li>`;
        });
        topLosers.forEach(coin => {
          losersList.innerHTML += `<li>${coin.name}: ${coin.price_change_percentage_24h.toFixed(2)}%</li>`;
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
});