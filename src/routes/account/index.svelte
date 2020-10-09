<script>
    import { stores } from '@sapper/app';
    import { goto } from '@sapper/app';
    import Error from '../../components/ui/Error.svelte';
    import Login from '../../components/Forms/Login.svelte';
    import Register from '../../components/Forms/Register.svelte';

	const { preloading, page, session } = stores();

    let error = false;

    function logout () {
        $session.id = false;
        fetch('/account/logout');
        goto('/account');
    }

</script>

<style>

</style>

{#if !$session.id}

<Login></Login>

<Register></Register>

{:else}
    <div class="form-item">
        <input on:click={logout} type="button" value="logout"/>
    </div>
{/if}

{#if error}
    <Error on:close={() => error = false}>{error}</Error>
{/if}