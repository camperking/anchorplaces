<script>
    import { stores } from '@sapper/app';
    import { goto } from '@sapper/app';
    import Login from '../../components/Forms/Login.svelte';
    import Register from '../../components/Forms/Register.svelte';
    import Button from '../../components/ui/Button.svelte';
    import Modal from '../../components/ui/Modal.svelte';

    const { preloading, page, session } = stores();
    
    let showLogin = false;


    function logout () {
        $session.id = false;
        fetch('/account/logout');
        goto('/account');
    }

</script>

<style>

</style>

{#if !$session.id}

    <Button onClick={() => showLogin = true}>Login</Button>
    {#if showLogin}
        <Modal on:close={() => showLogin = false}><Login></Login></Modal>
    {/if}

    <Login></Login>

    <Register></Register>

{:else} 
    <input on:click={logout} type="button" value="logout"/> 
{/if}

