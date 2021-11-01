const axios = require("axios");

const s = require("./signRequest.js");
const f = require("./price_module.js");

const instruments = require('./get-instruments.json')


require('dotenv').config()

const apiKey = process.env.KEY;
const apiSecret = process.env.SKEY;

const coin = process.argv[2].toUpperCase()
const coin_decimals = instruments.filter(a => a.base_currency === coin)[0].quantity_decimals
const method = "private/create-order"
const cantidad_a_vender = parseFloat(process.argv[3])

//npm run sell btc 0.00001
async function main() {

	const price_actual = await f.price_now(coin, "SELL");
	const quantity = parseFloat((cantidad_a_vender / price_actual).toFixed(coin_decimals))

	let request = {
		id: 11,
		method: method,
		api_key: apiKey,
		params: {
			instrument_name: `${coin}_USDT`,
			side: "SELL",
			type: "LIMIT",
			price: price_actual,
			quantity: quantity,
			client_oid: "my_order_0002",
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
