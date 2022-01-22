<script lang="ts">
	import {icons} from '@feltcoop/felt';
	import {randomItem} from '@feltcoop/felt/util/random.js';

	const items: string[] = Object.values(icons);

	let mreows = ['🐱'];

	const mreow = (): void => {
		mreows = [randomItem(items)!].concat(mreows);
	};
</script>

<button on:click={mreow}> mreow </button>
<div class="mreows">
	{mreows.join('')}
</div>

<style>
	.mreows {
		font-size: var(--icon_size_xl);
		word-break: break-all;
	}
</style>
