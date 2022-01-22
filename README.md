# [`@feltcoop/svelte-mutable-store`](https://www.npmjs.com/package/@feltcoop/svelte-mutable-store)

> [Svelte](https://svelte.dev) stores for mutable values with the immutable compiler option

> status: **alpha**

npm:
[`@feltcoop/svelte-mutable-store`](https://www.npmjs.com/package/@feltcoop/svelte-mutable-store)

deployed:
[feltcoop.github.io/svelte-mutable-store](https://feltcoop.github.io/svelte-mutable-store)

## motivation

TODO -- for now, see [spiderspace/mutable](https://github.com/spiderspace/mutable)

## usage

```bash
npm i @feltcoop/svelte-mutable-store
```

Enable `immutable` either [globally](/svelte.config.js) or per-component;
otherwise mutable values work fine in `writable stores:

> TODO REPL link

```svelte
<svelte:options immutable />

<script>
	import {mutable, safeMutable} from '@feltcoop/svelte-mutable-store';
	import {writable} from 'svelte/store';

	const someObj = {};
	const data = [[someObj, 1]];
	const a = mutable(new WeakMap(data)); // the more efficient option; swaps between 2 stable objects refs
	const b = safeMutable(new WeakMap(data)); // generates a new reference on every mutation
	const c = writable(new WeakMap(data));

	const increment = () => {
		a.mutate(($a) => {
			$a.set(someObj, $a.get(someObj) + 1);
		});
		b.mutate(($b) => {
			$b.set(someObj, $b.get(someObj) + 1);
		});
		$c.set(someObj, $c.get(someObj) + 1);
		$c = $c;
	};
</script>

mutable (count: {$a.value.get(someObj)}) and safeMutable (count: {$b.value.get(someObj)}) both react
to changes even though their values are mutated and the immutable option is enabled, but the
writable does not (count: {$c.get(someObj)})
```

## api

TODO

## develop

```bash
npm i
# then
npm run dev
# or
gro dev # npm i -g @feltcoop/gro
```

> learn more about [SvelteKit](https://github.com/sveltejs/kit),
> [Vite](https://github.com/vitejs/vite),
> and [Gro](https://github.com/feltcoop/gro)

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

## publish

Publish to npm:

```bash
npm run publish -- patch|minor|major|etc
# or
gro publish patch|minor|major|etc
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

public domain ⚘ [The Unlicense](license)
