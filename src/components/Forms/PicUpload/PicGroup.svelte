<script>
    import Pic from './Pic.svelte';

    export let pictures = [];

    async function remove(i) {
        const _id = pictures[i]._id;
        await fetch('api/picUpload/' + _id, { method: 'DELETE' });
        pictures = pictures.filter(pic => pic._id != _id);
    }

</script>

<style>
    
</style>

<div class="pic-group">
    {#each pictures as pic, i}
        <Pic {pic} on:remove={() => remove(i)}></Pic>
    {/each}
</div>