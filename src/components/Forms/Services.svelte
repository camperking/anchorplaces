<script>
    import Toggle from "../ui/Toggle.svelte";

    export let services = [];

</script>

<style>

    .services {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        width: 100%;
    }

    .service {
        min-width: 30%;
    }

    @media screen and (max-width: 600px) {
        .service {
            min-width: 50%;
        }
    }



</style>

<div class="services">
    {#each services as service, i}
        <div class="service">
            <Toggle bind:toggled={services[i].available} label={service.name}></Toggle>
        </div>
    {/each}

     
</div>