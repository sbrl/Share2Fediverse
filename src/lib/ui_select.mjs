"use strict";

import key from "./io/ls_key.mjs";

function handle_click(el_search, el_container, event) {
	const target = event.target.closest("div");
	// 1: Update search box
	el_search.value = target.textContent;
	el_search.dataset.url = target.dataset.url;
	el_search.dataset.name = target.dataset.name;
	
	
	// 2: Update localStorage
	const content_local = JSON.parse(localStorage.getItem(key) ?? `{}`);
	content_local.software = target.textContent;
	content_local.software_url = target.dataset.url;
	content_local.software_name = target.dataset.name;
	localStorage.setItem(key, JSON.stringify(content_local));
	
	
	// 3: Update classes
	for(const child of el_container.children) {
		child.classList.remove("active");
		child.classList.add("inactive");
	}
	target.classList.remove("inactive");
	target.classList.add("active");
}

export default function(el_search, el_container) {
	const bound = handle_click.bind(null, el_search, el_container);
	for(const child of el_container.children) {
		child.addEventListener("click", bound);
		child.addEventListener("touchend", bound);
		child.addEventListener("mouseup", bound);
	}
}