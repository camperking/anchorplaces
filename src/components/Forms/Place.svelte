<script>
    import Button from '../ui/Button.svelte';
    import Form from '../ui/Form.svelte';
    import TextInput from '../ui/TextInput.svelte';
    import GeoInput from '../ui/GeoInput.svelte';
    import TextField from '../ui/TextField.svelte';
import SelectInput from '../ui/SelectInput.svelte';
import ShelterInput from '../ui/ShelterInput/ShelterInput.svelte';
import Toggle from '../ui/Toggle.svelte';
import Services from './Services.svelte';
import ExpansionPanel from '../ui/ExpansionPanel.svelte';

    let errorMsg = {};

    let name = '';
    let description;
    let latitude;
    let longitude;
    let depth;
    let ground;
    let shelter;
    let services = [
        { name: 'Diesel' },
        { name: 'Gas' },
        { name: 'Water' },
        { name: 'Boat repair' },
        { name: 'Engine repair' },
        { name: 'Sailmaker' },
        { name: 'Moorings' },
        { name: 'Shower' },
        { name: 'Cafes' },
        { name: 'Restaurants' },
        { name: 'Supermarket' }
    ];


</script>

<style>

    .general-panel {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
    }

    .shelter-panel {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

</style>

<ExpansionPanel panels={['General', 'Position', 'Shelter', 'More']} let:panel>
    {#if panel === 'General'}

        <div class="general-panel">
            <TextInput label="Name" bind:value={name} message={'the name of the anchorplace'} errorMsg={errorMsg.name} />

            <TextField bind:value={description} placeholder="please give a short description of the anchorplace"></TextField>

            <TextInput label="Depth" bind:value={depth} message={'depth in m'} errorMsg={errorMsg.depth} type="number" width={'small'} />
        </div>

    {:else if panel === 'Position'}

        <GeoInput bind:latitude bind:longitude></GeoInput>

    {:else if panel === 'Shelter'}

        <div class="shelter-panel">
            <ShelterInput bind:shelter ></ShelterInput>

            <SelectInput label="Ground" bind:value={ground}>
                <option>sand</option>
                <option>gravel</option>
                <option>mud</option>
                <option>clay</option>
                <option>rocks</option>
                <option>plants</option>
            </SelectInput>
        </div>

    {:else if panel === 'More'}
            
            <Services bind:services ></Services>

    {/if}
</ExpansionPanel>

<Button>Submit</Button>
