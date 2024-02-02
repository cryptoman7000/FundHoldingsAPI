const filePath = './wallet.json';
const fs = require('fs');

const wallet = JSON.parse(fs.readFileSync(filePath));

async function fetchData() {

  for (let i = 0; i < wallet.length; i++) {

    try {

      const response = await fetch(`https://fundholdingsapi.p.rapidapi.com/${wallet[i]}`, {
        headers: {
          'X-RapidAPI-Key': 'YOU_API_KEY', 
          'X-RapidAPI-Host': 'fundholdingsapi.p.rapidapi.com'
        }
    });

      const data = await response.json();
      if (data.total_usd_value>0) {
        console.log(`{"address": "${wallet[i]}","price": ${data.total_usd_value}}`);
      }
      else{}
      
    } catch (error) {
      console.error(error);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

fetchData();