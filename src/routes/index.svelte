<script context="module">

export async function preload() {
	const res = await this.fetch('/api/place/0');
	const places = await res.json();
	return { places };
}
</script>

<script>
	import { stores } from '@sapper/app';
	import { onMount } from 'svelte';
	import PlaceCard from '../components/PlaceCard.svelte';
	import Button from '../components/ui/Button.svelte';
	
	const { preloading, page, session } = stores();

	export let places;
	

	onMount(() => {
		//console.log($session.id);
		getLocation(position => {
			console.log(position);
		});
	});


	  
	function getLocation(cb) {
        // GPSMessage = 'Waiting for permission...';
        if (navigator.geolocation) {
            // GPSMessage = 'Waiting for position...';
            navigator.geolocation.getCurrentPosition(position => {
                // GPSMessage = 'Position found';
                let latitude = position.coords.latitude;
				let longitude = position.coords.longitude;
				console.log(latitude);
				console.log(longitude);
				cb({ latitude: position.coords.latitude, longitude: position.coords.longitude });
                // openTab = 'Map';
            });
        } else {
            // GPSMessage = 'Position not available';
        }
    }
</script>

<style>

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

<h1>Featured</h1>

{#each places as place}
	<PlaceCard {place} />
{/each}

