<script>
import ShelterIcon from "./ShelterIcon.svelte";

    export let direction;
    export let shelter = false;
    export let disabled = false;

    let directionIcon = direction;
    let elm;

    $: if (shelter) directionIcon = 'block';

    function block() {
        if (!disabled) {
            if (directionIcon === 'block') {
                directionIcon = direction;
                shelter = false;
            } else {
                directionIcon = 'block';
                shelter = true;
            }
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

    .shelter-button:hover:not(.disabled) {
        color: #ff9100;
    }

    .disabled, .disabled:hover {
        cursor: default;
    }

    .active {
        color: #ff9100;
    }


</style>

<div bind:this={elm} class="shelter-button" on:click={block} class:active={shelter} class:disabled={disabled}>
    <ShelterIcon icon={directionIcon}></ShelterIcon>
</div>