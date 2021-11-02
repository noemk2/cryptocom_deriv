const axios = require("axios");

async function price_now(moneda) {
	const datos = await axios
		.get(
			`https://deriv-api.crypto.com/v1/public/get-trades?instrument_name=${moneda}USD-PERP`
		)
		.then(
			(response) => {
				return response.data.result.data.filter((x) => x.s === "BUY")[2].p;
			},
			(error) => {
				console.log(error);
			}
		);
	return datos;
}

async function primero() {
	let resultado = await price_now(process.argv[2].toUpperCase());
	console.log(resultado);
}

primero();

