"use strict";

import key from "./io/ls_key.mjs";

function handle_click(el_search, el_container, event) {
	// 1: Update search box
	el_search.value = event.target.textContent;
	el_search.dataset.url = event.target.dataset.url;
	el_search.dataset.name = event.target.dataset.name;
	
	
	// 2: Update localStorage
	const content_local = JSON.parse(localStorage.getItem(key) ?? `{}`);
	content_local.software = event.target.textContent;
	content_local.software_url = event.target.dataset.url;
	content_local.software_name = event.target.dataset.name;
	localStorage.setItem(key, JSON.stringify(content_local));
	
	
	// 3: Update classes
	for(const child of el_container.children) {
		child.classList.remove("active");
		child.classList.add("inactive");
	}
	event.target.classList.remove("inactive");
	event.target.classList.add("active");
}

export default function(el_search, el_container) {
	const bound = handle_click.bind(null, el_search, el_container);
	for(const child of el_container.children) {
		child.addEventListener("click", bound);
		child.addEventListener("touchend", bound);
		child.addEventListener("mouseup", bound);
	}
}