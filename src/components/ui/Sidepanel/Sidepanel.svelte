<script>
    import { fly, fade } from 'svelte/transition';

    export let visible;

</script>
    
<style>
    .sidepanel-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        z-index: 1;
    }

    .sidepanel {
        position: absolute;
        background-color: white;
        margin: 0;
        padding: 0;
        padding-top: 2em;
    }


</style>

{#if visible}
    <div class="sidepanel-background" on:click={() => visible = false} transition:fade >
        <div class="sidepanel" transition:fly="{{ x: -200, duration: 500 }}" >

            <slot />
        
        </div>
    </div>
{/if}