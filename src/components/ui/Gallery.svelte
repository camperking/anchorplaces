<script>
    
	import { blur } from 'svelte/transition';

    export let pictures = [];

    let activePic = 0;
    
    function changePic(i) {
        
        activePic = -1;

        setTimeout(() => {activePic = i}, 400);
    }
</script>

<style>

    img {
        max-width: 100%;
        max-height: 100%;
        display: block;
    }

    .gallery {
        display: flex;
        flex-direction: column;
    }

    .gallery-rest {

        display: flex;
        
        
    }

    .gallery-rest-pic {
        width: 20%;
        cursor: pointer;
        opacity: 1;
        transition: opacity .15s ease-in;
    }

    .gallery-rest-pic:hover {
        opacity: .7;
        transition: opacity .15s ease-in;
    }



</style>

<div class="gallery">

        {#each pictures as pic, i}
            {#if i == activePic}
                <div class="gallery-main" in:blur>
                    <img src={pic.url} alt="anchorplace" />
                </div>
            {/if}
        {/each}

    
    <div class="gallery-rest">
        {#each pictures as pic, i }
            {#if i < 5}
                <div class="gallery-rest-pic" on:click={() => changePic(i)} in:blur>
                    <img src={pic.url} alt={pic.title} />
                </div>
            {/if}
        {/each}
    </div>

</div>