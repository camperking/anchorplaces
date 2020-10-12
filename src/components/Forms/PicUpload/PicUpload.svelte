<script>

    import { tick } from 'svelte';
    
    import FileInput from '../../ui/FileInput.svelte';
    import PicGroup from './picGroup.svelte';

    let files = [];
    let loading = '';
    let update = true;

    export let pictures = [];

    //$: console.log(files);

    $:  if (files.length > 0) {
        loading = 'loading ' + files[0].name;
        
        const body = new FormData();
        body.append('picture', files[0], files[0].name);
        
        fetch('api/picUpload/new/?category=place', {
            method: 'POST',
            body
        })
            .then(res => res.json())
            .then(data => {
                pictures.push(data);

                update = false;

                tick().then(() => {
                    loading = 'Pic uploaded';
                    update = true;
                });
        });

    }

</script>

<style>

    .pic-upload {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

</style>

<div class="pic-upload">
    {#if update}
        <PicGroup {pictures} />
    {/if}
    

    <FileInput bind:files >Add Picture</FileInput>

    {loading}
    {pictures}

</div>