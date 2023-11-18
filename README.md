# Share2Fediverse
> Simple static share page to share content to the Fediverse

Share2Fediverse is a simple static webpage to share content to the Fediverse. It's designed to be hosted anywhere - subdirectories, subdomains, shared hosting, anywhere you have a spare corner!

The problem with the Fediverse is that there isn't a single dedicated link you can use for share buttons like traditional centralised social media sites (e.g. `https://example.com/share?text=blah`). I looked for other options, but they didn't satisfy my needs.

If your favourite Fediverse software isn't listed, please [open an issue](https://github.com/sbrl/Share2Fediverse/issues/new) or a pull request (hint: it's [`software_db.mjs`](https://github.com/sbrl/Share2Fediverse/blob/main/src/lib/software_db.mjs) you want to edit)!

A demo site can be seen here:

<https://starbeamrainbowlabs.com/share2fediverse>


## Usage
Share2Fediverse is built with [esbuild](https://esbuild.github.io/), but you can download a copy from the releases page:

<https://github.com/sbrl/Share2Fediverse/releases/latest>

Simply download and extract the provided tarball to a directory on your web server, and you're ready to go!

To use, simply supply URI-encoded text like so:

```
https://example/path/to/Share2Fediverse/#text=blah
```

...replacing `blah` with the aforementioned URI-encoded text you want the user to share to the Fediverse.


## Building for source
Alternatively, you can build Share2Fediverse from source. This involves having [Node.js](https://nodejs.org/) (and [npm](https://npmjs.org/), which comes bundled) available. Note that you do **not** need Node.js on the server - just for the build environment.

First, clone this repository:

```bash
git clone https://github.com/sbrl/Share2Fediverse.git
cd Share2Fediverse; # cd into the newly cloned repository
```

Then, install dependencies:

```bash
npm install
```

Next, build Share2Fediverse:

```bash
npm run build
```

The build output will be located in the `dist/` directory. If you'd like to test the build, try this:

```bash
npx serve dist/
```

Finally, upload the contents of the `dist` directory to your web server, and you're away :D


## Contributing
Contributions are very welcome - both issues and pull requests! Please mention in your pull request that you release your work under the Apache 2.0 licence (see below).

If you're feeling that way inclined, the sponsor button at the top of the page (if you're on GitHub) will take you to my [Liberapay profile](https://liberapay.com/sbrl) if you'd like to donate to say an extra thank you :-)


## License
Share2Fediverse is released under the Apache License 2.0, a permissive open source licence. The full license text is included in the [`LICENSE`](https://github.com/sbrl/Share2Fediverse/blob/main/LICENSE) file in this repository. Tldr legal have a [great summary](https://tldrlegal.com/license/apache-license-2-0-apache-2-0) of the license if you're interested.
