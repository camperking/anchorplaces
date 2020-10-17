<script>

    export let tabs = [];
    export let openTab = '';
    let show = {};

    $: showTab(openTab);

    async function showTab(tab) {
        if (!show[tab]) {
            Object.keys(show).forEach((key) => show[key] = false);
            openTab = tab;
            show[tab] = true;
        }
    }

</script>

<style>

    .tab-bar {
        display: flex;
        justify-content: center;
    }

    .tab-control {
        padding: 0 1em;
        border: none;
        border-bottom: 1px solid gray;
        cursor: pointer;
        transition: border-bottom-color 0.5s;
        width: 100%;
        text-align: center;
    }

    .tab-control:hover, .active {
        border-bottom: 3px solid #ff9100;
    }

    .tab {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1em;
        border-left: 1px solid gray;
        border-right: 1px solid gray;
        border-bottom: 1px solid gray;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }

</style>

<div class="tabs">
    <div class="tab-bar">
        {#each tabs as tab}
            <div class="tab-control" on:click={() => showTab(tab)} class:active={show[tab]}>
                {tab}
            </div>
        {/each}
    </div>

    {#each tabs as tab}
        {#if show[tab]}
            <div class="tab">
                <slot {tab} />
            </div>
        {/if}
    {/each}
    
</div>