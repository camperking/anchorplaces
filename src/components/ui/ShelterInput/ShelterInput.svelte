<script>
    import ShelterButton from "./ShelterButton.svelte";

    export let shelter = {};
    export let disabled = false;

</script>

<style>

    .shelter-input {
        margin-bottom: 1em;
    }

    /* .shelter-input:hover .title {
        border-bottom-color: #ff9100;
    }

    .title {
        border-bottom: 2px solid gray;
        text-align: center;
        margin-bottom: 0.5em;
    } */

    .shelter-controls {
        display: grid;
        grid-template-columns: 2em 2em 2em;
        grid-template-rows: 2em 2em 2em;
    }

    .shelter-center {
        cursor: default;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<div class="shelter-input">
    <!-- <div class="title">Shelter</div> -->
    <div class="shelter-controls">

        <ShelterButton bind:shelter={shelter.north_west} direction="north_west" {disabled}></ShelterButton>
        <ShelterButton bind:shelter={shelter.north} direction="north" {disabled}></ShelterButton>
        <ShelterButton bind:shelter={shelter.north_east} direction="north_east" {disabled}></ShelterButton>
        <ShelterButton bind:shelter={shelter.west} direction="west" {disabled}></ShelterButton>
        <div class="material-icons shelter-center">anchor</div>
        <ShelterButton bind:shelter={shelter.east} direction="east" {disabled}></ShelterButton>
        <ShelterButton bind:shelter={shelter.south_west} direction="south_west" {disabled}></ShelterButton>
        <ShelterButton bind:shelter={shelter.south} direction="south" {disabled}></ShelterButton>
        <ShelterButton bind:shelter={shelter.south_east} direction="south_east" {disabled}></ShelterButton>

    </div>
</div>
