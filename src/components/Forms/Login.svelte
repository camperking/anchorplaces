<script>
    import { stores } from '@sapper/app';
    import { goto } from '@sapper/app';
    import { loginScheme } from '../../validationSchemes.js';

    import Error from '../ui/Error.svelte';
    import TextInput from '../ui/TextInput.svelte';
    import Button from '../ui/Button.svelte';

    const { session } = stores();
    
    export let destination = '/';

    let username = '';
    let password = '';
    let error = false;

    const errorMsg = {};

async function login() {

    const headers = {'Content-Type': 'application/json'};
    
    const body = {username, password};

    errorMsg.username = '';
    errorMsg.password = '';
 
    try {
        const userLogin = await loginScheme.validate(body, { abortEarly: false });

        try {
                const response = await fetch('/account/login', {
                    headers,
                    method: 'POST',
                    body: JSON.stringify(userLogin)
                });

                const data = await response.json();

                if (data.sessionid) {
                    $session.id = data.sessionid;
                    goto(destination);
                } else {
                    error = data.error;
                }
            } catch (err) {
                console.log('network');
                console.log(err);
            }

    } catch (err) {
        err.inner.forEach(error => {
            errorMsg[error.path] = error.message;
        })
    }

  }




</script>

<style>

form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>





<form id="form">

    <TextInput label="Username" bind:value={username} message={'your username here'} errorMsg={errorMsg.username}  autofocus=true ></TextInput>
    <TextInput label="Password" bind:value={password} message={'your password here'} errorMsg={errorMsg.password} type="password" ></TextInput>

    <Button label="Login" onClick={login} />

</form>



{#if error}
    <Error on:close={() => error = false}>{error}</Error>
{/if}