<script>
    import { fade } from 'svelte/transition';
</script>

<style>
    .tab {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>

<div class="tab" transition:fade={{duration: 200}} >
    <slot />
</div>