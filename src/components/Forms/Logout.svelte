<script>
    import { stores } from '@sapper/app';
    import { goto } from '@sapper/app';

    import Button from '../ui/Button.svelte';

    export let redirect = '/';

    const { session } = stores();

    function logout() {
            $session.id = false;
            fetch('/api/user/logout');
            goto(redirect);
    }
</script>

<Button on:click={logout} weight="secondary" >Logout</Button>