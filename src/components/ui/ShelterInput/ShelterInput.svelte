<script>
    import ShelterButton from "./ShelterButton.svelte";

    export let shelter = {};

</script>

<style>

    .shelter-input {
        width: 6em;
    }

    .shelter-input:hover .title {
        border-bottom-color: #ff9100;
    }

    .title {
        border-bottom: 3px solid gray;
        text-align: center;
        margin-bottom: 0.5em;
    }

    .shelter-controls {
        display: grid;
        grid-template-columns: 2em 2em 2em;
        grid-template-rows: 2em 2em 2em;
    }
</style>

<div class="shelter-input">
    <div class="title">Shelter</div>
    <div class="shelter-controls">

        <ShelterButton bind:shelter={shelter.north_west} direction="north_west"></ShelterButton>
        <ShelterButton bind:shelter={shelter.north} direction="north"></ShelterButton>
        <ShelterButton bind:shelter={shelter.north_east} direction="north_east"></ShelterButton>
        <ShelterButton bind:shelter={shelter.west} direction="west"></ShelterButton>
        <div class="material-icons">anchor</div>
        <ShelterButton bind:shelter={shelter.east} direction="east"></ShelterButton>
        <ShelterButton bind:shelter={shelter.south_west} direction="south_west"></ShelterButton>
        <ShelterButton bind:shelter={shelter.south} direction="south"></ShelterButton>
        <ShelterButton bind:shelter={shelter.south_east} direction="south_east"></ShelterButton>

    </div>
</div>