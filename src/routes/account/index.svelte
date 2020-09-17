<script>
    import { stores } from '@sapper/app';
    import { goto } from '@sapper/app';
    import Error from '../../components/Error.svelte';

	const { preloading, page, session } = stores();

    let username = '';
    let password = '';
    let error = false;

function login() {

    const headers = {'Content-Type': 'application/json'};
    
    const body = {username, password};

    fetch('/account/login', {
        headers,
        method: 'POST',
        body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {
            if (data.sessionid) {
                $session.id = data.sessionid;
                goto('/account/');
            } else {
                error = data.error;
            }
        })
        .catch(err => console.log(err));
  }

    function logout () {
        $session.id = false;
        fetch('/account/logout');
        goto('/account');
    }


</script>

<style>

.form-item {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-items: center;   
    margin-bottom: 1em;
  }

  .form-label {
      flex-basis: 50%;
      text-align: right;
  }

  .form-input {
      flex-basis: 50%;
      text-align: left;
  }

  .form-label > label {
      font-weight: 600;
      border-bottom: 3px solid #ff9100;
      text-transform: uppercase;
      margin-right: 1em;
  }

</style>

{#if !$session.id}
<form id="form">
    <div class="form-item">
        <div class="form-label"><label for="username">Username:</label></div>
        <div class="form-input"><input type="text" bind:value={username}  required /></div>
    </div>

    <div class="form-item">
        <div class="form-label"><label for="password">Password:</label></div>
        <div class="form-input"><input type="password" bind:value={password} required /></div>
    </div>

    <div class="form-item">
        <input on:click={login} type="button" value="Log In"/>
    </div>
</form>

<div class="form-item">
    <a href="/account/register">register</a>
</div>

{:else}
    <div class="form-item">
        <input on:click={logout} type="button" value="logout"/>
    </div>
{/if}

{#if error}
    <Error on:close={() => error = false}>{error}</Error>
{/if}