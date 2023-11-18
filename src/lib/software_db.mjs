"use strict";

import mastodon from '../images/mastodon.svg';
import diaspora from '../images/diaspora.svg';
import gnusocial from '../images/gnusocial.svg';
import other from '../images/other.svg';

export default {
	other: {
		name: "Other",
		url: "/share?text={text}",
		image: other
	},
	mastodon: {
		name: "Mastodon",
		url: "/share?text={text}",
		image: mastodon
	},
	diaspora: {
		name: "Diaspora",
		url: "/bookmarklet?url={text}",
		image: diaspora
	},
	gnusocial: {
		name: "GNU Social",
		url: "/notice/new?status_textarea={text}",
		image: gnusocial
	}
}