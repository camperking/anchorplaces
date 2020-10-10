<script>

    import Button from './Button.svelte';
import Tab from './Tabs/Tab.svelte';
    import TabBar from './Tabs/TabBar.svelte';
    import TextInput from './TextInput.svelte';

    let latitude;
    let longitude;

    let errorMsg = {};

</script>

<style>
    /* .geo-input {
        
    } */
</style>

<div class="geo-input">
    <TabBar tabs={['Raw', 'GPS', 'Map']} let:tab openTab={'Raw'}>
        {#if tab === 'Raw'}
            <Tab>
                <TextInput label="Latitude" bind:value={latitude} message={'the latitude of the anchorplace'} errorMsg={errorMsg.name} />
                <TextInput label="Longitude" bind:value={longitude} message={'the longitude of the anchorplace'} errorMsg={errorMsg.name} />
            </Tab>
        {:else if tab === 'GPS'}
            <Tab>
                <Button>get position</Button>
            </Tab>
        {:else if tab === 'Map'}
            <Tab>
                <div>Map cooming soon...</div>
            </Tab>
            
        {/if}
    </TabBar>
</div>