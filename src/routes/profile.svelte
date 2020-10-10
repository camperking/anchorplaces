<script>
    import { stores } from '@sapper/app';

    import Logout from '../components/Forms/Logout.svelte'

    const { session } = stores();
</script>

<style>

</style>

<h2>Your Profile {$session.id}</h2>
{#if $session.id}
<Logout></Logout>
{/if}