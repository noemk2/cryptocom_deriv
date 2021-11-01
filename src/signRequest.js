const crypto = require("crypto-js");

function signRequest(request, apiKey, apiSecret) {
	const {id, method, params, nonce} = request;

	const paramsString =
		params == null
			? ""
			: Object.keys(params)
				.sort()
				.reduce((a, b) => {
					return a + b + params[b];
				}, "");

	const sigPayload = method + id + apiKey + paramsString + nonce;
	request.sig = crypto
		.HmacSHA256(sigPayload, apiSecret)
		.toString(crypto.enc.Hex);
	return request;
};


exports.signRequest = signRequest
