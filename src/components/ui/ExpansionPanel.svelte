<script>
    import { slide } from 'svelte/transition';

    export let panels = [];

    export let showPanel = panels.map(() => false);
    // showPanel[0] = true;

    function changePanel(i) {
        if (!showPanel[i]) {
            showPanel = showPanel.map(() => false);
            showPanel[i] = true;
        } else {
            showPanel = showPanel.map(() => false);
        }
    }

</script>

<style>

    .expansion-panel {
        margin-bottom: 1em;
    }

    .panel-bar {        
        display: block;
        text-align: center;
    }

    .panel-title {
        border-bottom: 3px solid gray;
        cursor: pointer;
        display: inline-flex;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.7);
        
    }

    .panel {
        padding: 1em 1em 1em 1em;
    }

    .active, .panel-title:hover {
        border-bottom-color: #ff9100;
    }

</style>


{#each panels as panel, i}
<div class="expansion-panel">
    <div 
        class="panel-bar"
        on:click={() => changePanel(i)} >
        <div class="panel-title" class:active={showPanel[i]} >
            {panel}
            {#if showPanel[i]}
                <span class="material-icons">keyboard_arrow_up</span>
            {:else}
                <span class="material-icons">keyboard_arrow_down</span>
            {/if}
        </div>
    </div>

    {#if showPanel[i]}
        <div class="panel" transition:slide>
            <slot {panel} />
        </div>
    {/if}
</div>
{/each}