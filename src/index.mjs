"use strict";

import "./index.css";
import key from "./lib/io/ls_key.mjs";

import software_db from './lib/software_db.mjs';
import ui_filter from "./lib/ui_filter.mjs";
import ui_populate from "./lib/ui_populate.mjs";
import ui_select from "./lib/ui_select.mjs";
import ui_share from "./lib/ui_share.mjs";

function load_software() {
	const el_container = document.querySelector(".software-picker");
	for (const software in software_db) {
		const def = software_db[software];
		
		const el = document.createElement("span");
		el.textContent = def.name;
		el.dataset.url = def.url;
		el.dataset.name = software;
		el_container.appendChild(el);
	}
}

window.addEventListener("load", () => {
	load_software();
	
	const el_text = document.querySelector("#share-payload");
	const el_instance = document.querySelector("#instance-url");
	const el_search = document.querySelector("#software");
	const el_container = document.querySelector(".software-picker");
	const el_share = document.querySelector("#share-button");
	
	ui_filter(
		el_search,
		el_container
	);
	
	ui_select(
		el_search,
		el_container
	);
	
	ui_populate(
		el_text,
		el_instance,
		el_search
	);
	
	ui_share(
		el_share,
		el_text,
		el_instance,
		el_search
	);
	
	el_instance.addEventListener("keyup", () => {
		const content_local = JSON.parse(localStorage.getItem(key) ?? "{}");
		content_local.instance = el_instance.value;
		localStorage.setItem(key, JSON.stringify(content_local));
	});
});