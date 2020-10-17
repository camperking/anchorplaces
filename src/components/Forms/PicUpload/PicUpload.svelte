<script>

    import { tick } from 'svelte';
    
    import FileInput from '../../ui/FileInput.svelte';
    import PicGroup from './picGroup.svelte';

    let files = [];
    let loading = '';
    
    export let pictures = [];
    export let pictureData = [];

    function picUpload() {

        if (files.length > 0) {
        loading = 'loading ' + files[0].name;
        
        const body = new FormData();
        body.append('picture', files[0], files[0].name);
        
        fetch('api/picUpload/new/?category=place', {
            method: 'POST',
            body
        })
            .then(res => res.json())
            .then(data => {
                pictures.push(data._id);
                pictureData.push(data);
                files = [];
                pictureData = pictureData;
                loading = '';
        });

    }
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

    <PicGroup pictures={pictureData} />
    
    <FileInput bind:files on:change={picUpload} >Add Picture</FileInput>

    {loading}

</div>