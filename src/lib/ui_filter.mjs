"use strict";

import { transliterate } from 'transliteration';

function normalise(str) {
	return transliterate(str).toLowerCase();
}

function update_filter(el_search, el_container) {
	const query = normalise(el_search.value);
	
	for(const child of [...el_container.children]) {
		child.classList.remove("active", "inactive");
		if(normalise(child.textContent).indexOf(query) === -1) {
			child.classList.add("gone");
		}
		else {
			child.classList.remove("gone");
		}
	}
}

export default function(el_search, el_container) {
	const bound = update_filter.bind(null, el_search, el_container);
	el_search.addEventListener("keyup", bound);
}