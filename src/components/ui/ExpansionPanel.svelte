<script>
    import { slide } from 'svelte/transition';

    export let panels = [];

    let showPanel = panels.map(() => false);
    showPanel[0] = true;

    function changePanel(i) {
        if (!showPanel[i]) {
            showPanel = showPanel.map(() => false)
            showPanel[i] = true;
        }
    }

</script>

<style>

    .panel-bar {
        border-bottom: 3px solid gray;
        cursor: pointer;
        padding-left: 1em;
    }

    .panel {
        padding: 1em 1em 1em 1em;
    }

    .active, .panel-bar:hover {
        border-bottom-color: #ff9100;
    }

</style>


{#each panels as panel, i}

    <div 
        class="panel-bar"
        class:active={showPanel[i]}
        on:click={() => changePanel(i)} >
        {panel}
    </div>

    {#if showPanel[i]}
        <div class="panel" transition:slide>
            <slot {panel} />
        </div>
    {/if}

{/each}