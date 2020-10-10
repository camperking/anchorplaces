<script>
import Button from "../Button.svelte";



    export let tabs = [];
    export let openTab = '';
    let show = {};

    $: showTab(openTab);

    async function showTab(tab) {
        if (!show[tab]) {
            Object.keys(show).forEach((key) => show[key] = false);
            await delay(200);
            openTab = tab;
            show[tab] = true;
        }

    }

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

</script>

<style>

    .tab-bar {
        display: flex;
        justify-content: center;
    }

</style>

<div>
    <div class="tab-bar">
        {#each tabs as tab}
            <Button weight="secondary" onClick={() => showTab(tab)} >{tab}</Button>
        {/each}
    </div>

    {#each tabs as tab}
        {#if show[tab]}
            <slot {tab} />
        {/if}
    {/each}
</div>