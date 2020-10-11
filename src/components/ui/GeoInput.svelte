<script>

    import Button from './Button.svelte';
    import TabBar from './Tabs.svelte';
    import TextInput from './TextInput.svelte';

    export let latitude = '';
    export let longitude = '';

    let errorMsg = {};

    let openTab  = 'Raw';

    let GPSMessage = '';

    function getLocation() {
        GPSMessage = 'Waiting for permission...';
        if (navigator.geolocation) {
            GPSMessage = 'Waiting for position...';
            navigator.geolocation.getCurrentPosition(position => {
                GPSMessage = 'Position found';
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                // openTab = 'Map';
            });
        } else {
            GPSMessage = 'Position not available';
        }
    }

</script>

<style>
    /* .geo-input {
        
    } */
</style>

<div class="geo-input">
    <TabBar tabs={['Raw', 'GPS', 'Map']} let:tab bind:openTab>
        {#if tab === 'Raw'}
            
                <TextInput label="Latitude" bind:value={latitude} message={'the latitude of the anchorplace'} errorMsg={errorMsg.latitude} />
                <TextInput label="Longitude" bind:value={longitude} message={'the longitude of the anchorplace'} errorMsg={errorMsg.longitude} />

        {:else if tab === 'GPS'}

                {#if latitude && longitude}
                    <div>{GPSMessage}</div>
                    <div>{latitude}</div>
                    <div>{longitude}</div>
                {:else}
                    <Button onClick={getLocation}>get position</Button>
                    <div>{GPSMessage}</div>
                {/if}

        {:else if tab === 'Map'}

                <div>Map cooming soon...</div>

        {/if}
    </TabBar>
</div>