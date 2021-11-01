const crypto = require("crypto-js");
const axios = require("axios");

require('dotenv').config()

const apiKey = process.env.KEY;
const apiSecret = process.env.SKEY;

// program

const signRequest = (request, apiKey, apiSecret) => {
	const {id, method, params, nonce} = request;

	const paramsString =
		params == null
			? ""
			: Object.keys(params)
				.sort()
				.reduce((a, b) => {
					let value = params[b];
					if (value != null && Array.isArray(value)) {
						let len = value.length;
						let lastIdx = len - 1;
						let valueString = '';
						value.forEach(function (v) {
							if (v == null) {
								valueString += 'null';
							} else {
								valueString += v;
							}
							if (i < lastIdx) {
								valueString += ',';
							}
							i++;
						});
						return a + b + valueString;
					} else {
						return a + b + value;
					}
				}, "");

	const sigPayload = method + id + apiKey + paramsString + nonce;

	request.sig = crypto
		.HmacSHA256(sigPayload, apiSecret)
		.toString(crypto.enc.Hex);

	return request;
};

let request = {
	id: 11,
	method: "private/user-balance",
	api_key: apiKey,
	params: {},
	nonce: Date.now(),
};

async function main() {
	const requestBody = JSON.stringify(signRequest(request, apiKey, apiSecret));
	const options = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const datos = await axios
		.post(
			"https://deriv-api.crypto.com/v1/private/user-balance",
			requestBody,
			options
		)
		.then(
			(response) => {
				console.log(response.data.result);
			},
			(error) => {
				console.log(error);
			}
		);
}

main();
