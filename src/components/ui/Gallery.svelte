<script>
    
	import { blur } from 'svelte/transition';

    export let pictures = [];

    let activePic = 0;
    
    function changePic(i) {
        
        activePic = -1;

        setTimeout(() => {activePic = i}, 400)
    }
</script>

<style>

    img {
        width: 100%;
    }

    .gallery {
        display: block;
        /* margin: 0 1em 0 1em; */
    }

    .gallery-rest {

        display: flex;
        
    }

    .gallery-rest-pic {
        position: relative;
        width: 20%;
        cursor: pointer;
    }

</style>

<div class="gallery">

        {#each pictures as pic, i}
            {#if i == activePic}
                <div class="gallery-main" transition:blur>
                    <img src={pic.url} alt="anchorplace" />
                </div>
            {/if}
        {/each}

    
    <div class="gallery-rest">
        {#each pictures as pic, i }
            {#if i < 5}
                <div class="gallery-rest-pic" on:click={() => changePic(i)}>
                    <img src={pic.url} alt={pic.title} />
                </div>
            {/if}
        {/each}
    </div>

</div>