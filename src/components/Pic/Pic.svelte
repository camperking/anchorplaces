<script>

    import Vote from './Vote.svelte';

    export let pic;
    const { _id, path, name } = pic;

    

</script>


<style>

    img{
        max-width: 100%;
    }

</style>



    <img src={path} alt={name} />
    <!-- <Vote object={_id} key={'picture'}></Vote> -->
