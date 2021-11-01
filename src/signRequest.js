const crypto = require("crypto-js");

function signRequest(request, apiKey, apiSecret) {
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

exports.signRequest = signRequest
