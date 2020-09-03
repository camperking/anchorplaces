<script>
    import { stores } from '@sapper/app';
    import { goto } from '@sapper/app';

	const { preloading, page, session } = stores();

    const usernamePattern = '^([A-Za-z0-9€#\.+-]){4,20}$';

    let username = '';
    let password = '';

function login() {

    if(form.reportValidity()) {

        const headers = {'Content-Type': 'application/json'};
        
        const body = {username, password};

        fetch('/account/login', {
            headers,
            method: 'POST',
            body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(data => {
                $session.id = data.id;      // put sessioin id in sapper store
            })
            .then(goto('/account/'))
            .catch(err => console.log(err));

    }
  }

    function logout () {
        $session.id = false;
        fetch('/account/logout');
        goto('/account');
    }


</script>

<style>

</style>

{#if !$session.id}
<form id="form">
    <div>
        <label for="username">Username:</label>
        <input type="text" bind:value={username} pattern={usernamePattern} required />
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="password" bind:value={password} required />
    </div>
    <div>
        <input on:click={login} type="button" value="Log In"/>
    </div>
</form>
<a href="/account/register">register</a>
{:else}
    <input on:click={logout} type="button" value="logout"/>
{/if}