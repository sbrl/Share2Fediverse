"use strict";

import depostify from './io/depostify.mjs';
import software_db from './software_db.mjs';

import key from './io/ls_key.mjs';

export default function(el_text, el_instance, el_software) {
	const content_hash = depostify(location.hash.substring(1));
	const content_local = JSON.parse(localStorage.getItem(key) ?? "{}");
	console.log(content_local);
	
	for(const item_key in content_hash) {
		content_local[item_key] = content_hash[item_key];
	}

	if (typeof content_local.text !== "undefined")
		el_text.value = content_local.text;
	if (typeof content_local.instance !== "undefined")
		el_instance.value = content_local.instance;
	if (typeof content_local.software !== "undefined") {
		el_software.value = content_local.software;
		el_software.dataset.name = content_local.software_name;
		el_software.dataset.url = content_local.software_url;
	}
}