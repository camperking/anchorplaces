<script>
    import { createEventDispatcher } from 'svelte';

    import TextInput from '../../ui/TextInput.svelte';
    import TextField from '../../ui/TextField.svelte';
    import Button from '../../ui/Button.svelte';

    const dispatch = createEventDispatcher();

    const headers = {'Content-Type': 'application/json'};

    export let pic;

    let disableSave = true;

    async function save() {
        // console.log(pic._id);

        const body = {};
        body._id = pic._id;
        body.title = pic.title;
        body.desc = pic.desc;

        const response = await fetch('api/picUpload/any', {
            headers,
            method: 'PUT',
            body: JSON.stringify(body)
        }).then(res => res.json());
            
        // console.log(response);
        disableSave = true;

    }

</script>

<style>

    .pic-card {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border: 1px solid gray;
        margin-bottom: 1em;
        border-radius: 5px;
    }

    img {
        width: 50%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    .pic-controls {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        min-height: 15em;
        margin: 1em;
        width: 50%;
    }

    .delete {
        cursor: pointer;
        top: 0;
    }

    .delete:hover {
        color: #ff9100;
    }

    @media screen and (max-width: 600px) {
        .pic-card {
            flex-direction: column;
        }

}

</style>

<div class="pic-card">
    <img src={pic.url} alt={pic.title} >
    <div class="pic-controls">

        <TextInput
            bind:value={pic.title}
            label="Title"
            message="title of the picture"
            on:change={() => disableSave = false} />

        <TextField
            bind:value={pic.desc}
            placeholder="please give a short description what you can see here"
            on:change={() => disableSave = false} />

        <Button on:click={save} disable={disableSave} >Save</Button>

        <div 
            class="delete material-icons"
            on:click={() => dispatch('remove', pic._id)}>
            delete_outline
        </div>

    </div>
    
</div>