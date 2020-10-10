<script>
    import { onMount } from 'svelte';
    
    let menuList;

</script>

<style>

.menu-list {
        position: absolute;
        right: 0;
        top: 0;
        background-color: white;
        box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12);
    }

</style>

<div class="menu-list" bind:this={menuList}>
    <slot />
</div>