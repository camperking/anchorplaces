<script>
    import Button from '../ui/Button.svelte';
    import Form from '../ui/Form.svelte';
    import TextInput from '../ui/TextInput.svelte';
    import GeoInput from '../ui/GeoInput.svelte';
    import TextField from '../ui/TextField.svelte';

    let errorMsg = {};

    let name = '';
    let description;
    let latitude;
    let longitude;
    let depth;




</script>

<style>

</style>

<Form>
    <TextInput label="Name" bind:value={name} message={'the name of the anchorplace'} errorMsg={errorMsg.name} />

    <TextField bind:value={description} placeholder="please give a short description of the anchorplace"></TextField>

    <GeoInput bind:latitude bind:longitude></GeoInput>

    <TextInput label="Depth" bind:value={depth} message={'the depth of the anchorplace in m'} errorMsg={errorMsg.depth} type="number" />

    <Button>Submit</Button>
</Form>