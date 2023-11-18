"use strict";

function normalise_url(url) {
	if(url.match(/^[a-z]+:\/\//) !== null) return url;
	return `https://${url}`;
}

function do_share(el_text, el_instance, el_software) {
	const text = el_text.value;
	const instance = normalise_url(el_instance.value);
	const software = el_software.value;
	const url_stem = el_software.dataset.url;
	
	const url = `${instance}${url_stem.replace(`{text}`, encodeURIComponent(text))}`;
	
	location.href = url;
}

export default function(el_share, el_text, el_instance, el_software) {
	const bound = do_share.bind(null, el_text, el_instance, el_software);
	el_share.addEventListener("click", bound);
	el_share.addEventListener("touchend", bound);
}