<script>
    import { goto } from '@sapper/app';
    import Button from '../ui/Button.svelte';
    import TextInput from '../ui/TextInput.svelte';
    import GeoInput from '../ui/GeoInput.svelte';
    import TextField from '../ui/TextField.svelte';
    import SelectInput from '../ui/SelectInput.svelte';
    import ShelterInput from '../ui/ShelterInput/ShelterInput.svelte';
    import Services from './Services.svelte';
    import ExpansionPanel from '../ui/ExpansionPanel.svelte';
    import PicUpload from './PicUpload/PicUpload.svelte';
    import { placeScheme } from '../../validationSchemes';

    const headers = {'Content-Type': 'application/json'};

    let errorMsg = {};

    let showPanel;

    let name = '';
    let description = '';
    let latitude;
    let longitude;
    let depth = 2;
    let ground = 'sand';
    let shelter = {
        east: false,
        north: false,
        north_east: false,
        north_west: false,
        south: false,
        south_east: false,
        south_west: false,
        west: false
    };
    let services = [
        { name: 'Diesel', available: false },
        { name: 'Gas', available: false },
        { name: 'Water', available: false },
        { name: 'Boat repair', available: false },
        { name: 'Engine repair', available: false },
        { name: 'Sailmaker', available: false },
        { name: 'Moorings', available: false },
        { name: 'Shower', available: false },
        { name: 'Cafes', available: false },
        { name: 'Restaurants', available: false },
        { name: 'Supermarket', available: false }
    ];
    
    let pictures = [];
    let pictureData = [];

    async function submit() {

        errorMsg = {};

        const body = { name, description, latitude, longitude, depth, ground, shelter, services, pictures };

        try {

            const newPlace = await placeScheme.validate(body, { abortEarly: false });

            try {
                const respone = await fetch('api/place/new', {
                    headers,
                    method: 'POST',
                    body: JSON.stringify(newPlace)
                });

                const data = await respone.json();
                if (data.error) errorMsg.server = data.error;
                goto('place/' + data);
                console.log(data);

            } catch (err) {
                console.log(err);
            }

        } catch (err) {
            // console.log(err);
            err.inner.forEach(error => {
                errorMsg[error.path] = error.message;
            });
            if (errorMsg.latitude || errorMsg.longitude) showPanel[0] = true;

        }

        
    }


</script>

<style>

    .place-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }

    .general-panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1em;
    }

    .shelter-panel {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

</style>

<div class="place-form">
    <h2>Add New Place</h2>
    <div class="general-panel">
        <TextInput
            label="Name"
            bind:value={name}
            message="the name of the anchorplace"
            errorMsg={errorMsg.name} />

        <TextField
            bind:value={description}
            placeholder="please give a short description of the anchorplace" />

        
    </div>


    <ExpansionPanel panels={['Position', 'Pictures', 'Shelter', 'More']} let:panel bind:showPanel >

        {#if panel === 'Position'}

            <GeoInput 
                bind:latitude
                bind:longitude
                {errorMsg} />

        {:else if panel === 'Pictures'}

            <PicUpload bind:pictures bind:pictureData ></PicUpload>

        {:else if panel === 'Shelter'}

            <div class="shelter-panel">
                <ShelterInput bind:shelter />

                <TextInput 
                    label="Depth"
                    bind:value={depth}
                    message="depth in m"
                    errorMsg={errorMsg.depth}
                    type="number"
                    width="small" />

                <SelectInput 
                    label="Ground"
                    bind:value={ground} >
                    <option>sand</option>
                    <option>gravel</option>
                    <option>mud</option>
                    <option>clay</option>
                    <option>rocks</option>
                    <option>plants</option>
                </SelectInput>
            </div>

        {:else if panel === 'More'}
                
                <Services bind:services />

        {/if}
    </ExpansionPanel>

    {#if errorMsg.server}
        {errorMsg.server}
    {/if}

    <Button on:click={submit} size={'large'}>Submit</Button>
</div>
