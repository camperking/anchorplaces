<script>
import ShelterIcon from "./ShelterIcon.svelte";

    export let direction;
    export let shelter = false;

    let directionIcon = direction;

    function block() {
        if (directionIcon === 'block') {
            directionIcon = direction;
            shelter = false;
        } else {
            directionIcon = 'block';
            shelter = true;
        }
    }

</script>

<style>

    .shelter-button {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .shelter-button:hover, .active {
        color: #ff9100;
    }


</style>

<div class="shelter-button" on:click={block} class:active={shelter}>
    <ShelterIcon icon={directionIcon}></ShelterIcon>
</div>