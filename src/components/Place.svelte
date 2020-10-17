<script>
    import { onMount } from "svelte";
import Services from "./Forms/Services.svelte";
    import Gallery from "./ui/Gallery.svelte";
import ShelterInput from "./ui/ShelterInput/ShelterInput.svelte";

    export let place_id;
    let place = {};
    place.pictures = [];
    place.services = [];


    onMount(async () => {
        const response = await fetch('api/place/' + place_id);
        const data = await response.json();

        if (!data.error) {
            place = data;
        }
    });

</script>


<style>


    .place {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }

    h1, h3 {
        border-bottom: 3px solid #ff9100;
    }

    p {
        margin: 0 0 1em 0;
    }

    .gallery, .desc, .protection, .services {
        margin: 0 1em;
    }

    .service {
        display: flex;
    }

    .available {
        border-bottom: 2px solid #ff9100;
    }

</style>

<div class="place">
    <h1>{place.name}</h1>
    
    <div class="gallery">
        <Gallery pictures={place.pictures} />
    </div>

    <h3>Description</h3>
    <div class="desc">

        <p>{place.description}</p>

    </div>

    <h3>Protection</h3>
    <div class="protection">

        <p>Depth: {place.depth}</p>
        <p><ShelterInput bind:shelter={place.shelter} disabled={true} /></p>
        <p>Ground: {place.ground}</p>

    </div>

    <h3>Services</h3>
    <div class="services">

            {#each place.services as service }
                <div class="service">
                    <div class="service-name" class:available={service.available}>{service.name}</div>

                    {#if service.available}
                        <span class="material-icons">check</span>
                    {:else}
                        <span class="material-icons">clear</span>
                    {/if}

                </div>
            {/each}

    </div>
</div>