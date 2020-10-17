<script>
    import { onMount } from "svelte";
    import Gallery from "./ui/Gallery.svelte";

    export let place_id;
    let place = {};
    place.pictures = [];


    onMount(async () => {
        const response = await fetch('api/place/' + place_id);
        const data = await response.json();

        if (!data.error) {
            place = data;
        }
    });

</script>


<style>


</style>

<div class="place">
    <h1>{place.name}</h1>
    
    <Gallery pictures={place.pictures} />

    {place.description}
    {place.depth}

</div>

{JSON.stringify(place)}