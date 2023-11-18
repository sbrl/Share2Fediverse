#!/usr/bin/env node
"use strict";

import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

import esbuild from 'esbuild';

const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));
const outdir = path.resolve(__dirname, "../dist");

const copy = [
	"../favicon.png",
	"../favicon.svg",
];

/**
 * Hashes the contents of a file.
 * @ref		https://stackoverflow.com/a/44643479/1460422
 * @param	{string}	hashName	The name of the hash algorithm to use.
 * @param	{string}	path		The path to the file to hash.
 * @return	{string}	The resulting hash as a hexadecimal string.
 */
function hash_file(hashName, path) {
	return new Promise((resolve, reject) => {
		const hash = crypto.createHash(hashName);
		const stream = fs.createReadStream(path);
		stream.once("error", reject);
		stream.on("data", chunk => hash.update(chunk));
		stream.once("end", () => {
			stream.off("error", reject);
			resolve(hash.digest('base64'));
		});
	});
}

async function do_html() {
	// We *would* use SHA3 here, but we need to use SHA2 for subresource integrity
	let algorithm = "sha256";
	let css_hash = await hash_file(algorithm, path.join(outdir, "index.css"));
	let js_hash = await hash_file(algorithm, path.join(outdir, "index.js"));
	
	let html = (await fs.promises.readFile(path.join(__dirname, "index.html"), "utf-8"))
		.replace(/\{JS_HASH\}/g, js_hash)
		.replace(/\{CSS_HASH\}/g, css_hash)
		.replace(/\{JS_HASH_SHORT\}/g, js_hash.substring(0, 7).replace(/[+/=]/, ""))
		.replace(/\{CSS_HASH_SHORT\}/g, css_hash.substring(0, 7).replace(/[+/=]/, ""))
		.replace(/\{ALGO\}/g, algorithm);

	await fs.promises.writeFile(path.join(outdir, "index.html"), html);
	
	for (const filepath of copy) {
		await fs.promises.copyFile(
			path.join(__dirname, filepath),
			path.join(outdir, path.basename(filepath))
		)
	}
}

function make_context() {
	return {
		entryPoints: [
			"./index.mjs",
			// "./index.css",
		].map(filepath => path.resolve(__dirname, filepath)),
		outdir,
		bundle: true,
		minify: typeof process.env.NO_MINIFY === "undefined",
		sourcemap: true,
		treeShaking: true,
		loader: {
			".html": "text",
			".svg": "file",
			".png": "file",
			".woff2": "file",
			".woff": "file",
			".eot": "file",
			".ttf": "file",
		},
		external: ["fs", "path"],
		plugins: [
			{
				name: "copy-html",
				setup(build) {
					build.onEnd(result => {
						if (result.errors.length > 0 || result.warnings.length > 0)
							console.log(result);
						console.log(`${new Date().toISOString()} | Build complete`);
						do_html();
					})
				}
			}
		]
	};
}

(async () => {
	"use strict";
	switch(process.env.ES_MODE ?? "build") {
		case "build":
			const result = await esbuild.build(make_context());
			if (result.errors.length > 0 || result.warnings.length > 0)
				console.log(result);
			break;
		
		case "watch":
			const ctx = await esbuild.context(make_context());
			await ctx.watch();
			console.log(`>>> Watching for changes`);
			break;
	}
	
	
	// await do_html();
	// console.log(await esbuild.analyzeMetafile(result.metafile));
})();

