"use strict";

export default {
	mastodon: {
		name: "Mastodon",
		url: "/share?text={text}",
		default: true
	},
	diaspora: {
		name: "Diaspora",
		url: "/bookmarklet?url={text}"
	},
	gnusocial: {
		name: "GNU Social",
		url: "/notice/new?status_textarea={text}"
	}
}