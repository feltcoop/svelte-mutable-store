# felt-template

> a web app template with [SvelteKit](https://github.com/sveltejs/kit),
> [Felt](https://github.com/feltcoop/felt), and [Gro](https://github.com/feltcoop/gro)

deployed:
[feltcoop.github.io/felt-template](https://feltcoop.github.io/felt-template)

## usage

If you're logged into GitHub, click "Use this template" above or clone with
[`degit`](https://github.com/Rich-Harris/degit):

```bash
npx degit feltcoop/felt-template cooltoy
cd cooltoy
npm i
# then
npm run dev
# or
gro dev # npm i -g @feltcoop/gro
```

> learn more about [Gro](https://github.com/feltcoop/gro)

The template includes
[`@sveltejs/adapter-static`](https://github.com/sveltejs/kit/tree/master/packages/adapter-static)
so it can deploy with no further configuration.
To learn how to swap it out for another deployment target, see
[the SvelteKit adapter docs](https://kit.svelte.dev/docs#adapters).

To make it your own, change `felt-template` to your project name in the following files:

- [`package.json`](package.json)
- [`svelte.config.js`](svelte.config.js)
- [`src/routes/__layout.svelte`](src/routes/__layout.svelte)
- [`src/routes/index.svelte`](src/routes/index.svelte)

Then run `npm i` to update `package-lock.json`.

Optionally add a [license file](https://choosealicense.com/)
and [`package.json` value](https://spdx.org/licenses/), like `"license": "MIT"`.

See [SvelteKit](https://github.com/sveltejs/kit)
and [Vite](https://github.com/vitejs/vite) for more.

## build

```bash
npm run build
# or
gro build
```

## deploy

[Deploy](https://github.com/feltcoop/gro/blob/main/src/docs/deploy.md)
(build, commit, and push) to the `deploy` branch, e.g. for GitHub Pages:

```bash
npm run deploy
# or
gro deploy
```

## credits 🐢<sub>🐢</sub><sub><sub>🐢</sub></sub>

[Svelte](https://github.com/sveltejs/svelte) ∙
[SvelteKit](https://github.com/sveltejs/kit) ∙
[Vite](https://github.com/vitejs/vite) ∙
[esbuild](https://github.com/evanw/esbuild) ∙
[uvu](https://github.com/lukeed/uvu) ∙
[TypeScript](https://github.com/microsoft/TypeScript) ∙
[Prettier](https://github.com/prettier/prettier) ∙
[Felt](https://github.com/feltcoop/felt) ∙
[Gro](https://github.com/feltcoop/gro)
& [more](package.json)

## [🐦](https://wikipedia.org/wiki/Free_and_open-source_software)
