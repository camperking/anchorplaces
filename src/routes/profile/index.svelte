<!-- <script context="module">

    export async function preload() {
        // console.log($session.userid);
        const res = await this.fetch('/api/place/0');
        const places = await res.json();
        return { places };
    }
</script> -->


<script>
    import { stores } from '@sapper/app';
    import { onMount } from 'svelte';

    import Logout from '../../components/Forms/Logout.svelte'
    import PlaceCard from '../../components/PlaceCard.svelte';

    // export let yourPlaces = [];
    let places = []

    const { session } = stores();

    onMount(async () => {
        fetch('/api/place/0?user=' + $session.userid).then(res => res.json()).then(data => places = data);
    });

</script>

<style>

</style>

<h1>Welcome {$session.username}</h1>

<h2>Your Anchorplaces</h2>

{#each places as place}
	<PlaceCard {place} />
{/each}

{#if $session.id}
<Logout></Logout>
{/if}