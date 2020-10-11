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

    let errorMsg = {};

    let name = '';
    let description;
    let latitude;
    let longitude;
    let depth;
    let ground;
    let shelter;

    let toggled;

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

</style>

<Form>
    <TextInput label="Name" bind:value={name} message={'the name of the anchorplace'} errorMsg={errorMsg.name} />

    <TextField bind:value={description} placeholder="please give a short description of the anchorplace"></TextField>

    <TextInput label="Depth" bind:value={depth} message={'the depth of the anchorplace in m'} errorMsg={errorMsg.depth} type="number" />

    <GeoInput bind:latitude bind:longitude></GeoInput>

    <SelectInput label="Ground" bind:value={ground}>
        <option>sand</option>
        <option>gravel</option>
        <option>mud</option>
        <option>clay</option>
        <option>rocks</option>
        <option>plants</option>
    </SelectInput>

    <ShelterInput bind:shelter ></ShelterInput>

    <Services bind:services ></Services>

    {JSON.stringify(services)}

    <Button>Submit</Button>
</Form>