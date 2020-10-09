<script>
    import { stores } from '@sapper/app';
    import { goto } from '@sapper/app';
    import { registerScheme } from '../../validationSchemes.js';

    import Error from '../ui/Error.svelte';
    import TextInput from '../ui/TextInput.svelte';
    import Button from '../ui/Button.svelte';

    const { session } = stores();
    
    export let destination = '/';

    let username = '';
    let password = '';
    let email = '';
    let error = false;

    let errorMsg = {};

async function register() {

    const headers = {'Content-Type': 'application/json'};
    
    const body = {username, password, email};

    errorMsg.username = '';
    errorMsg.password = '';
    errorMsg.email = '';

    try {
        const newUser = await registerScheme.validate(body, { abortEarly: false });
        // todo hash password
        try {
                const response = await fetch('/account/register', {
                    headers,
                    method: 'POST',
                    body: JSON.stringify(newUser)
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
    <TextInput label="Email" bind:value={email} message={'your email here'} errorMsg={errorMsg.email} ></TextInput>

    <Button label="Sign Up" onClick={register} />

    <!-- <div class="form-item">
        <input on:click={register} type="button" value="Register"/>
    </div> -->
</form>

{#if error}
    <Error on:close={() => error = false}>{error}</Error>
{/if}