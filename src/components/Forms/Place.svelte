<script>
    import Button from '../ui/Button.svelte';
    import Form from '../ui/Form.svelte';
    import TextInput from '../ui/TextInput.svelte';
    import GeoInput from '../ui/GeoInput.svelte';

    let errorMsg = {};

    let name = '';

</script>

<style>

</style>

<Form>
    <TextInput label="Name" bind:value={name} message={'the name of the anchorplace'} errorMsg={errorMsg.name} />
    <GeoInput></GeoInput>

    <Button>Submit</Button>
</Form>