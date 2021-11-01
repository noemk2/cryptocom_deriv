const axios = require("axios");

async function price_now(moneda, order) {
	const datos = await axios
		.get(
			`https://api.crypto.com/v2/public/get-trades?instrument_name=${moneda}_USDT`
		)
		.then(
			(response) => {
				return parseFloat(response.data.result.data.filter((x) => x.s === order)[2].p);
			},
			(error) => {
				console.log(error);
			}
		);
	return datos;
}

//function hola() {
//console.log('HOLAAAA');
//}

exports.price_now = price_now
//exports.hola = hola
