const axios = require("axios");

const s = require("./signRequest.js");
//const f = require("./price_module.js");

//const instruments = require('./get-instruments.json')

require('dotenv').config()

const apiKey = process.env.KEY;
const apiSecret = process.env.SKEY;

const coin = `${process.argv[2].toUpperCase()}USD-PERP`
//const coin_decimals = instruments.filter(a => a.base_currency === coin)[0].quantity_decimals
const method = "private/cancel-all-orders"
//const cantidad_a_transferir = parseFloat(process.argv[3])


// npm run cancel_all btc 
async function main() {

	//const price_actual = parseFloat(process.argv[4])
	//const quantity = parseFloat((cantidad_a_comprar / price_actual).toFixed(coin_decimals))

	let request = {
		id: 12,
		method: method,
		api_key: apiKey,
		params: {
			instrument_name: `${coin}`
		},
		nonce: Date.now()
	}

	const requestBody = JSON.stringify(s.signRequest(request, apiKey, apiSecret));
	const options = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const datos = await axios
		.post(
			`https://deriv-api.crypto.com/v1/${method}`,
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
