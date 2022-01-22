<script lang="ts">
	import '@feltcoop/felt/ui/style.css';
	import 'prismjs/themes/prism.min.css';
	import {base} from '$app/paths';

	import '$lib/style.css';
</script>

<svelte:head>
	<title>@feltcoop/svelte-mutable-store</title>
	<link rel="icon" href="{base}/favicon.png" />
</svelte:head>

<slot />
