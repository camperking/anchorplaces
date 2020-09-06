<script context="module">

export async function preload() {
	const res = await this.fetch('/place/rest/rnd/0/14');
	const places = await res.json();
	return { places };
}
</script>

<script>
	import { stores } from '@sapper/app';
	import { onMount } from 'svelte';
	import Place from '../components/Place.svelte';

	const { preloading, page, session } = stores();

	export let places;

	onMount(() => {
		//console.log($session.id);
		
 	 });
</script>

<style>
	/* h1, figure, p {
		text-align: center;
		margin: 0 auto;
	} */

	/* h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	} */

	/* figure {
		margin: 0 0 1em 0;
	} */

	/* img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	} */

	p {
		margin: 1em auto;
	}

	/* @media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	} */
</style>

<svelte:head>
	<title>Anchorplace Map</title>
</svelte:head>

<!-- <h1>Great success!</h1>

<figure>
	<img alt='Success Kid' src='successkid.jpg'>
	<figcaption>Have fun with Sapper!</figcaption>
</figure> -->

{#each places as place}
<Place place={place} />
{/each}

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>
