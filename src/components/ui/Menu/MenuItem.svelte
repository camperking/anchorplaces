<script>

    export let onClick = () => {};

</script>

<style>

    .menu-item {
        padding: 1em;
        cursor: pointer;
        display: flex;
        align-items: center;
        white-space: nowrap;
    }

    .menu-item:hover {
        background-color: lightgray;
    }
</style>

<div class="menu-item" on:click={onClick}>
    <slot />
</div>