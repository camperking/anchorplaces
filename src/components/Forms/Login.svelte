<script>
    import { stores } from '@sapper/app';
    import { goto } from '@sapper/app';
    import { createEventDispatcher } from 'svelte';

    import { loginScheme } from '../../validationSchemes.js';

    import Error from '../ui/Error.svelte';
    import Form from '../ui/Form.svelte';
    import TextInput from '../ui/TextInput.svelte';
    import Button from '../ui/Button.svelte';

    const { session } = stores();

    const dispatch = createEventDispatcher();
    
    
    export let redirect = '/';

    let username = '';
    let password = '';
    let error = false;

    const errorMsg = {};

async function login() {

    dispatch('submit');

    const headers = {'Content-Type': 'application/json'};
    
    const body = {username, password};

    errorMsg.username = '';
    errorMsg.password = '';
 
    try {
        const userLogin = await loginScheme.validate(body, { abortEarly: false });
        // todo hash password
        try {
                const response = await fetch('/api/user/login', {
                    headers,
                    method: 'POST',
                    body: JSON.stringify(userLogin)
                });

                const data = await response.json();

                if (data.sessionid) {
                    $session.id = data.sessionid;
                    goto(redirect);
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

</style>


<Form>
    <TextInput label="Username" bind:value={username} message="your username here" errorMsg={errorMsg.username} />
    <TextInput label="Password" bind:value={password} message="your password here" errorMsg={errorMsg.password} type="password" />

    <Button on:click={login}>Login</Button>
</Form>



{#if error}
    <Error on:close={() => error = false}>{error}</Error>
{/if}