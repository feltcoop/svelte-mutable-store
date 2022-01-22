<!-- to see `writable` work, uncomment this:
<svelte:options immutable={false} /> -->
<script lang="ts">
	import {mutable} from '$lib/mutable';
	import {safeMutable} from '$lib/safeMutable';
	import {writable} from 'svelte/store';

	const someObj = {};
	const data: [object, number][] = [[someObj, 1]];
	const a = mutable(new WeakMap(data)); // the more efficient option; swaps between 2 stable objects refs
	const b = safeMutable(new WeakMap(data)); // generates a new reference on every mutation
	const c = writable(new WeakMap(data)); // demonstrates how mutation isn't reactive with immutable enabled

	const increment = () => {
		a.mutate(($a) => {
			$a.set(someObj, $a.get(someObj)! + 1);
		});
		b.mutate(($b) => {
			$b.set(someObj, $b.get(someObj)! + 1);
		});
		$c.set(someObj, $c.get(someObj)! + 1);
		$c = $c;
	};

	const reset = () => {
		a.swap(new WeakMap(data));
		b.swap(new WeakMap(data));
		c.set(new WeakMap(data));
	};
</script>

<main class="column markup">
	<h1>@feltcoop/svelte-mutable-store</h1>
	<section class="column-sm">
		<p>
			<a href="https://github.com/feltcoop/svelte-mutable-store/blob/main/src/lib/mutable.ts"
				><code>mutable</code></a
			>
			(<small>count:</small>
			<strong>{$a.value.get(someObj)}</strong>) and<br />
			<a href="https://github.com/feltcoop/svelte-mutable-store/blob/main/src/lib/safeMutable.ts"
				><code>safeMutable</code></a
			>
			(<small>count:</small>
			<strong>{$b.value.get(someObj)}</strong>) <br /> both react to changes even though their
			values are mutated and the
			<a href="https://svelte.dev/docs#compile-time-svelte-compile"><code>immutable</code></a>
			option is enabled
		</p>
		<p>
			their
			<a href="https://svelte.dev/docs#run-time-svelte-store-writable"><code>writable</code></a>
			counterpart (<small>count:</small>
			<strong>{$c.get(someObj)}</strong>) <br />does not update because it mutates its value, but it
			will update if
			<a href="https://svelte.dev/docs#compile-time-svelte-compile"><code>immutable</code></a> is disabled
		</p>
		<p class="buttons">
			<button on:click={increment}>click me to increment</button>
			<button on:click={reset}>reset</button>
		</p>
	</section>
	<footer class="markup">
		<p>
			<a href="https://github.com/feltcoop/svelte-mutable-store"
				>learn more and get the source code on GitHub</a
			>
		</p>
	</footer>
</main>

<style>
	main {
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	h1 {
		text-align: center;
	}
	@media (max-width: 660px) {
		h1 {
			font-size: var(--font_size_xl);
		}
	}
	.buttons {
		display: flex;
	}
	footer {
		text-align: center;
		padding-bottom: var(--spacing_xl5);
	}
</style>
