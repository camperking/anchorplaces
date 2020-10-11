<script>
    import Toggle from "../ui/Toggle.svelte";

    export let services = [];

</script>

<style>

</style>

<div class="services">
    {#each services as service, i}
        <Toggle bind:toggled={services[i].available} label={service.name}></Toggle>
    {/each}

     
</div>