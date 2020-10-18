<script>

    export let position = [];

</script>

<style>

    .map-link {
        color: rgba(0, 0, 0, 0.7);
    }

    .map-link:hover {
        color: #ff9100;
    }

</style>

<div class="map-link">
    {#if position.length}
        <a href={'http://map.openseamap.org/?zoom=15&lat=' + position[1] + '&lon=' + position[0] + '&layers=BFTTFFFFFTF0FFFFFFFFFF'} target="_blank" >
            <span class="material-icons">place</span>
        </a>
    {/if}
</div>