# @feltcoop/svelte-mutable-store

> [Svelte](https://svelte.dev) stores for mutable values with the
> [`immutable`](https://svelte.dev/docs#compile-time-svelte-compile) compiler option

npm:
[`@feltcoop/svelte-mutable-store`](https://www.npmjs.com/package/@feltcoop/svelte-mutable-store)

full example:
[feltcoop.github.io/svelte-mutable-store](https://feltcoop.github.io/svelte-mutable-store)

minimal example: [repl](https://svelte.dev/repl/08660ee9225a48aeb0cb5cb695715bbe?version=3.46.2)

## todo

- finalize API for 1.0 (help wanted!)
- write automated tests ([the website demo](https://feltcoop.github.io/svelte-mutable-store)
  covers all behavior, but automated tests are good & make good docs)
- write the API readme section
- video intro?

## motivation

The Svelte compiler has [an `immutable` option](https://svelte.dev/docs#compile-time-svelte-compile)
that's disabled by default. When detecting value changes with `immutable` disabled,
Svelte assumes all objects and functions are _not equal_ because they _could_ have been mutated.
By enabling `immutable`, the developer is telling the compiler,
"I won't mutate things, so knowing that, please avoid as much wasted work as you can",
and it then detects value changes using simple referential equality.

> for more on `immutable`, see
> [this short writeup](https://github.com/spiderspace/mutable#more-about-immutable)
> in the prototype that became this library

This library currently offers no guidance on whether you _should_ enable `immutable`.
There are complex ergonomic and performance tradeoffs that
depend on your personal preferences, code style, architecture, usecases,
and the specifics of your runtime data.

For developers who choose to enable `immutable`, this library offers a `mutable` store
that allows mutation without breaking reactivity.
Sometimes mutation is required, like with the unclonable
[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
and APIs that mutate things outside of your control,
and other times it's desirable, like with large collections that are expensive to copy.

> for a demo of why this new store is needed,
> see [the full](https://feltcoop.github.io/svelte-mutable-store) and
> [minimal REPL](https://svelte.dev/repl/08660ee9225a48aeb0cb5cb695715bbe?version=3.46.2) examples

You may be wondering: why not use
[`<svelte:options immutable={true|false} />`](https://svelte.dev/docs#template-syntax-svelte-options)
to opt in or out of immutability at the component level?

- it adds mental overhead to ensure the option and usage stay in sync in each component
- it's error-prone because there's no compile-time help for detecting mistakes
- it makes developers context-switch as they move around a codebase
  because components can behave in two different ways
- the lack of granularity is less efficient because it applies to the whole component,
  not specific values

Some caveats:

- when reading values in components, the actual value is `$store.value` not just `$store`
- you must pass store around as props and component-level vars,
  not the inner `.value`, so Svelte can detect changes
- `mutable` swaps between two stable object references, which may cause issues in some cases,
  while `safeMutable` creates a new object reference on each change,
  which is safer but slightly less efficient

## usage

```bash
npm i -D @feltcoop/svelte-mutable-store
```

Enable [`immutable`](https://svelte.dev/docs#compile-time-svelte-compile)
either [globally](/svelte.config.js) or
[per-component](https://svelte.dev/docs#template-syntax-svelte-options);
otherwise mutable values work fine in
[`writable`](https://svelte.dev/docs#run-time-svelte-store-writable) stores.
In other words, you should not use this library unless you're also enabling
[`immutable`](https://svelte.dev/docs#compile-time-svelte-compile)
because of the ergonomic and performance downsides.

This library's API is intentionally different from `writable`
so it stands out, highlighting its incompatible semantics.
Maybe that's not best?

> [view this example in a REPL on svelte.dev](https://svelte.dev/repl/08660ee9225a48aeb0cb5cb695715bbe?version=3.46.2)

```svelte
<svelte:options immutable />

<script>
	import {mutable, safeMutable} from '@feltcoop/svelte-mutable-store';
	import {writable} from 'svelte/store';

	const someObj = {};
	const data = [[someObj, 1]];
	// `mutable` is the more efficient option; swaps between 2 stable objects refs
	const a = mutable(new WeakMap(data));
	// `safeMutable` is slightly less efficient; creates a new object ref every mutation
	const b = safeMutable(new WeakMap(data));
	// `writable` doesn't work in this case with `immutable` enabled
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
	const reset = () => {
		a.swap(new WeakMap(data));
		b.swap(new WeakMap(data));
		$c = new WeakMap(data); // aka `c.set(new WeakMap(data))`
	};
</script>

<pre>
	mutable (count: {$a.value.get(someObj)})
	and safeMutable (count: {$b.value.get(someObj)})
	both react to changes even though their values are mutated
	and the immutable option is enabled,
	but the writable (count: {$c.get(someObj)})
	does not unless you disable the immutable option at the top of the page
</pre>

<button on:click={increment}>increment</button>
<button on:click={reset}>reset</button>
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

[Publish](https://github.com/feltcoop/gro/blob/main/src/docs/publish.md) to npm:

```bash
npm run npm-publish patch|minor|major|etc
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

## license [🐦](https://wikipedia.org/wiki/Free_and_open-source_software)

public domain ⚘ [The Unlicense](license)

Feel free to copypaste and modify this code however you wish;
there's no need to drag a license file around with it.
Attribution is appreciated but you do you.
