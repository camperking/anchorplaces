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
	import Menu from '../components/ui/Menu/Menu.svelte';
	import MenuItem from '../components/ui/Menu/MenuItem.svelte';
	import Button from '../components/ui/Button.svelte';

	const { preloading, page, session } = stores();

	export let places;

	onMount(() => {
		//console.log($session.id);
		
 	 });
</script>

<style>

	p {
		margin: 1em auto;
	}

</style>

<svelte:head>
	<title>Anchorplace Map</title>
</svelte:head>


<Menu>
	<div slot="menu-activator">
		<Button weight="secondary" border={false} >
        	<span class="material-icons">account_box</span>
    	</Button>
	</div>
	<div slot="menu-list">
		<MenuItem onClick={() => alert('asd')}>asdasd</MenuItem>
		<MenuItem>hjlkgjljkl</MenuItem>
		<MenuItem>assd</MenuItem>
		<MenuItem>1234sdf</MenuItem>
		<MenuItem>asdasdsdffs</MenuItem>
	</div>
</Menu>

{#each places as place}
<Place place={place} />
{/each}

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>
