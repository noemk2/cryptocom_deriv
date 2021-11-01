const axios = require("axios");
const fs = require('fs');

async function price_now() {
	const datos = await axios
		.get(
			`https://api.crypto.com/v2/public/get-instruments`
		)
		.then(
			(response) => {
				//esto es un array
				return response.data.result.instruments;
			},
			(error) => {
				console.log(error);
			}
		);
	return datos;
}

async function primero() {
	let resultado = await price_now();
	//console.log(JSON.stringify(resultado.filter(a => a.quote_currency === "USDT")));
	let resultado_usdt = JSON.stringify(resultado.filter(a => a.quote_currency === "USDT"))

	fs.writeFile('./src/get-instruments.json', resultado_usdt, (err) => {
		if (err) throw err;

		console.log('coins saved!');
	});
}

primero();

