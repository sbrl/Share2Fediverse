"use strict";
export default function depostify(query) {
	return query.split("&").reduce(function(key, value) {
		value = value.split("=").map(decodeURIComponent);
		key[value[0]] = +value[1] || value[1];
		return key;
	}, {});
}