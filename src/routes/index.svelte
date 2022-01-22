<script lang="ts">
	import {writable, derived} from 'svelte/store';
	import Message from '@feltcoop/felt/ui/Message.svelte';

	import {mutable} from '$lib/mutable';
	import {safeMutable} from '$lib/safeMutable';
	import examples from '$lib/examples.json';

	const data: [any, any][] = [['a', 1]]; // pretend there's lots of data here; cloning usually performs fine with small data

	const writableMap = writable(new Map(data)); // A.
	const writableMapCloned = writable(new Map(data)); // B.
	const derivedWritableMap = derived(writableMap, ($v) => ({value: $v})); // C.
	const mutableMap = mutable(new Map(data)); // D.
	const safeMutableMap = safeMutable(new Map(data)); // E.
	const mutableMapManual = mutable(new Map(data)); // F.
	const mutableMapSwap = mutable(new Map(data)); // G.

	const toHue = (count: number) => count * 37 + '';
</script>

<main class="markup column">
	<header>
		<h1>@feltcoop/svelte-mutable-store</h1>
		<section class="markup">
			<p>
				<a href="https://svelte.dev">Svelte</a> stores for mutable values with the
				<a href="https://svelte.dev/docs#compile-time-svelte-compile"><code>immutable</code></a>
				compiler option —
				<a href="https://github.com/feltcoop/svelte-mutable-store">learn more on GitHub</a>
			</p>
			<pre class="panel-inset">
					npm i -D <a href="https://www.npmjs.com/package/@feltcoop/svelte-mutable-store"
					>@feltcoop/svelte-mutable-store</a
				>
				</pre>
		</section>
	</header>

	<button
		on:click={() => {
			// A. A `writable` store that doesn't work because
			// it tries to mutate with under the `immutable=true` compiler option.
			$writableMap.set('a', $writableMap.get('a') + 1);
			$writableMap = $writableMap;

			// B. A `writable` store that works because it's inefficiently cloned.
			$writableMapCloned.set('a', $writableMapCloned.get('a') + 1);
			$writableMapCloned = new Map($writableMapCloned);
			// or use `update` instead:
			// writableMapCloned.update(($v) => {
			// 	$v.set('a', $v.get('a') + 1);
			// 	return new Map($v);
			// });

			// C. See `derivedWritableMap` above.

			// D. A `mutable` store from a library that allows mutation with `immutable=true`
			// as efficently as possible, but doesn't compose as an immutable value stream,
			// because every other value is referentially equal to avoid garbage.
			mutableMap.mutate(($v) => {
				$v.set('a', $v.get('a') + 1);
			});

			// E. A `safeMutable` store from a library that allows mutation with `immutable=true`.
			safeMutableMap.mutate(($v) => {
				$v.set('a', $v.get('a') + 1);
			});

			// F. A `mutable` store that updates through what seems like an antipattern.
			// Note that unlike the `update` method used in D., we have to use `.value` here.
			$mutableMapManual.value.set('a', $mutableMapManual.value.get('a') + 1);
			mutableMapManual.mutate();

			// G. A `mutable` store that swaps its reference in the rare cases that's useful.
			// If this is the only way you're using `mutable` and the values are used immutably,
			// use a `writable` instead,
			// because the `mutable` store has ergonomic and performance downsides.
			const nextRef = new Map($mutableMapSwap.value);
			nextRef.set('a', nextRef.get('a') + 1);
			mutableMapSwap.swap(nextRef);
		}}
	>
		click me to make number++ go up
	</button>

	<h2>
		A. <code>writable</code> store (broken! D:)
	</h2>
	<section style:--hue={toHue($writableMap.get('a'))}>
		<pre class="panel-inset">
			{@html examples.ADef}
		</pre>
		<div class="count-with-label">
			<p class="count-wrapper panel-outset">
				<span class="count">{$writableMap.get('a')}</span>
				<span class="read-example">{@html examples.ARead}</span>
			</p>
			<p class="count-label">
				Fails to update as a <code>writable</code> store because <code>immutable</code> is enabled and
				we're mutating the map.
			</p>
		</div>
		<pre class="panel-inset">
			{@html examples.AWrite}
		</pre>
	</section>

	<h2>
		B. <code>writable</code> store with cloning
	</h2>
	<section style:--hue={toHue($writableMapCloned.get('a'))}>
		<pre class="panel-inset">
			{@html examples.BDef}
		</pre>
		<div class="count-with-label">
			<p class="count-wrapper panel-outset">
				<span class="count">{$writableMapCloned.get('a')}</span>
				<span class="read-example">{@html examples.BRead}</span>
			</p>
			<p class="count-label">
				Works for <code>Map</code>, but in some cases, causes tremendous garbage and slowness; also,
				it does not work for
				<a
					href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap"
					><code>WeakMap</code></a
				>, one of the motivating usecases for this library.
			</p>
		</div>
		<pre class="panel-inset">
			{@html examples.BWrite}
		</pre>
	</section>

	<section class="message">
		<Message>
			<div>
				in the examples below, notice that you need to access <code>.value</code> for reads, unlike above
			</div>
		</Message>
	</section>

	<h2>
		C. <code>derived</code> from <code>writable</code> store
	</h2>
	<section style:--hue={toHue($derivedWritableMap.value.get('a'))}>
		<pre class="panel-inset">
			{@html examples.CDef}
		</pre>
		<div class="count-with-label">
			<p class="count-wrapper panel-outset">
				<span class="count">{$derivedWritableMap.value.get('a')}</span>
				<span class="read-example">{@html examples.CRead}</span>
			</p>
			<p class="count-label">
				Works with no new modules, and doesn't clone the map, but now we're juggling two stores, one
				for writes and one for reads; this is also error-prone because reading the <code
					>writable</code
				> isn't reactive!
			</p>
		</div>
		<pre class="panel-inset">
			{@html examples.CWrite}
		</pre>
	</section>

	<h2>
		D. <code
			><a href="https://github.com/feltcoop/svelte-mutable-store/blob/main/src/lib/mutable.ts"
				>mutable</a
			></code
		> store
	</h2>
	<section style:--hue={toHue($mutableMap.value.get('a'))}>
		<pre class="panel-inset">
			{@html examples.DDef}
		</pre>
		<div class="count-with-label">
			<p class="count-wrapper panel-outset">
				<span class="count">{$mutableMap.value.get('a')}</span>
				<span class="read-example">{@html examples.DRead}</span>
			</p>
			<p class="count-label">
				Works because it's a <code
					><a href="https://github.com/feltcoop/svelte-mutable-store/blob/main/src/lib/mutable.ts"
						>mutable</a
					></code
				>
				store. Doesn't clone the map, but notice that you need to access <code>.value</code> on reads.
			</p>
		</div>
		<pre class="panel-inset">
			{@html examples.DWrite}
		</pre>
	</section>

	<h2>
		E. <code
			><a href="https://github.com/feltcoop/svelte-mutable-store/blob/main/src/lib/safeMutable.ts"
				>safeMutable</a
			></code
		> store
	</h2>
	<section style:--hue={toHue($safeMutableMap.value.get('a'))}>
		<pre class="panel-inset">
			{@html examples.EDef}
		</pre>
		<div class="count-with-label">
			<p class="count-wrapper panel-outset">
				<span class="count">{$safeMutableMap.value.get('a')}</span>
				<span class="read-example">{@html examples.ERead}</span>
			</p>
			<p class="count-label">
				Works because it's a <code
					><a
						href="https://github.com/feltcoop/svelte-mutable-store/blob/main/src/lib/safeMutable.ts"
						>safeMutable</a
					></code
				>
				store, which compared to
				<code
					><a href="https://github.com/feltcoop/svelte-mutable-store/blob/main/src/lib/mutable.ts"
						>mutable</a
					></code
				>
				is slightly less efficient because it creates a new reference on every change, unlike the regular
				<code>mutable</code>
				which swaps between two stable object references; <code>safeMutable</code> composes better as
				an immutable value stream, but given that you're expected to mutate the store value, this is
				probably useful only in rare cases.
			</p>
		</div>
		<pre class="panel-inset">
			{@html examples.EWrite}
		</pre>
	</section>

	<h2>
		F. <code
			><a href="https://github.com/feltcoop/svelte-mutable-store/blob/main/src/lib/mutable.ts"
				>mutable</a
			></code
		> store with manual update
	</h2>
	<pre class="panel-inset">
		{@html examples.FDef}
	</pre>
	<section style:--hue={toHue($mutableMapManual.value.get('a'))}>
		<div class="count-with-label">
			<p class="count-wrapper panel-outset">
				<span class="count">{$mutableMapManual.value.get('a')}</span>
				<span class="read-example">{@html examples.FRead}</span>
			</p>
			<p class="count-label">
				Works because it's a <code
					><a href="https://github.com/feltcoop/svelte-mutable-store/blob/main/src/lib/mutable.ts"
						>mutable</a
					></code
				>
				store, but mutates the value directly and then manually calls <code>.mutate()</code> with no
				args, which may reduce readability with action-at-a-distance but is sometimes useful.
			</p>
		</div>
		<pre class="panel-inset">
			{@html examples.FWrite}
		</pre>
	</section>

	<h2>
		G. <code
			><a href="https://github.com/feltcoop/svelte-mutable-store/blob/main/src/lib/mutable.ts"
				>mutable</a
			></code
		> store with swapped value references
	</h2>
	<section style:--hue={toHue($mutableMapSwap.value.get('a'))}>
		<pre class="panel-inset">
			{@html examples.GDef}
		</pre>
		<div class="count-with-label">
			<p class="count-wrapper panel-outset">
				<span class="count">{$mutableMapSwap.value.get('a')}</span>
				<span class="read-example">{@html examples.GRead}</span>
			</p>
			<p class="count-label">
				You can swap a <code>mutable</code> store reference in the rare cases that's useful. If this
				is the only way you're using <code>mutable</code> and the values are used immutably, use a
				<code>writable</code>
				instead, because the <code>mutable</code> store has ergonomic and performance downsides.
			</p>
		</div>
		<pre class="panel-inset">
			{@html examples.GWrite}
		</pre>
	</section>

	<hr />
	<footer class="markup">
		<p>
			<a href="https://github.com/feltcoop/svelte-mutable-store"
				>get the docs and public domain source code on GitHub</a
			>
		</p>
	</footer>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
	}
	h1 {
		text-align: center;
	}
	pre {
		padding: var(--spacing_lg);
		margin-bottom: var(--spacing_lg);
		overflow: auto;
	}
	button {
		font-weight: bold;
		font-size: 1.5em;
		padding: var(--spacing_xl3);
		color: var(--orange);
		border: 2px solid var(--orange);
	}
	.message {
		padding: var(--spacing_xl7) 0;
	}
	.count-with-label {
		display: flex;
	}
	.count-wrapper {
		display: flex;
	}
	.count {
		display: flex;
		align-items: center;
		background-color: hsl(var(--hue), 70%, 90%);
		padding: var(--spacing_sm) var(--spacing_lg);
		font-size: var(--font_size_xl);
	}
	.read-example {
		display: flex;
		align-items: center;
		padding: var(--spacing_lg);
		font-family: var(--font_family_mono);
	}
	@media (max-width: 400px) {
		.read-example {
			flex-wrap: wrap;
		}
	}
	.count-label {
		padding: var(--spacing_lg);
	}
	h2 {
		margin-top: 1.5em;
	}
	footer {
		padding-bottom: var(--spacing_xl5);
		text-align: center;
	}
	@media (max-width: 600px) {
		h1 {
			font-size: var(--font_size_xl);
		}
		.count-with-label {
			flex-wrap: wrap;
		}
		.count-wrapper {
			flex-wrap: wrap;
		}
		.count-label {
			padding: 0;
		}
	}
</style>
