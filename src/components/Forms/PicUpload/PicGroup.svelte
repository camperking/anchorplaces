<script>
    import Pic from './Pic.svelte';

    export let pictures = [];

    // let showPic = pictures.map(() => true);

</script>

<style>
    
</style>

<div class="pic-group">
    {#each pictures as pic}
        <Pic {pic}></Pic>
    {/each}
</div>