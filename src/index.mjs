"use strict";

import "./index.css";

import software_db from './lib/software_db.mjs';

window.addEventListener("load", () => {
	for(const software in software_db) {
		const el_container = document.querySelector("software-picker");
		const def = software_db[software];
		
		
	}
});