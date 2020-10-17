<script context="module">

// export async function preload() {
// 	const res = await this.fetch('/api/place/rnd/0/14');
// 	const places = await res.json();
// 	return { places };
// }
</script>

<script>
	import { stores } from '@sapper/app';
	import { onMount } from 'svelte';
	import Place from '../components/Place.svelte';
	import Button from '../components/ui/Button.svelte';
	import NewButton from "../components/ui/NewButton.svelte";

	const { preloading, page, session } = stores();

	// export let places;

	onMount(() => {
		//console.log($session.id);
		
 	 });
</script>

<style>

	p {
		margin: 1em auto;
	}

	.fab {
		position: fixed;
		bottom: 10%;
		right: 10%;
	}

	.fab .material-icons {
		font-size: 64px;
	}

</style>

<svelte:head>
	<title>Anchorplace Map</title>
</svelte:head>

<div class="fab">
	<a href="place/add">
		<Button fab={true}><span class="material-icons">add</span></Button>
	</a>
</div>

<Place />

<!-- {#each places as place}
<Place place={place} />
{/each} -->

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>
