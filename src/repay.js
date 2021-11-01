const axios = require("axios");

const s = require("./signRequest.js");
//const f = require("./price_module.js");

//const instruments = require('./get-instruments.json')


require('dotenv').config()

const apiKey = process.env.KEY;
const apiSecret = process.env.SKEY;

const coin = process.argv[2].toUpperCase()
//const coin_decimals = instruments.filter(a => a.base_currency === coin)[0].quantity_decimals
const method = "private/margin/repay"
const cantidad_a_pagar = parseFloat(process.argv[3])


// npm run repay btc 1 
async function main() {

	//const price_actual = parseFloat(process.argv[4])
	//const quantity = parseFloat((cantidad_a_comprar / price_actual).toFixed(coin_decimals))


	let request = {
		id: 11,
		method: method,
		api_key: apiKey,
		params: {
			currency: coin,
			amount: cantidad_a_pagar
		},
		nonce: Date.now(),

	}


	const requestBody = JSON.stringify(s.signRequest(request, apiKey, apiSecret));
	const options = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const datos = await axios
		.post(
			`https://api.crypto.com/v2/${method}`,
			requestBody,
			options
		)
		.then(
			(response) => {
				console.log(response.data);
			},
			(error) => {
				console.log(error);
			}
		);
}

main();
