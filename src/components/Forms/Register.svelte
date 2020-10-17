<script>
    import { stores } from '@sapper/app';
    import { goto } from '@sapper/app';
    import { createEventDispatcher } from 'svelte';

    import { registerScheme } from '../../validationSchemes.js';

    import Error from '../ui/Error.svelte';
    import Form from '../ui/Form.svelte';
    import TextInput from '../ui/TextInput.svelte';
    import Button from '../ui/Button.svelte';

    const { session } = stores();

    const dispatch = createEventDispatcher();
    
    export let redirect = '/';

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
            const response = await fetch('api/user/register', {
                headers,
                method: 'POST',
                body: JSON.stringify(newUser)
            });

            const data = await response.json();

            if (data.sessionid) {
                $session.id = data.sessionid;
                dispatch('submit');
                goto(redirect);
            } else {
                errorMsg.username = data.error;
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
    <TextInput label="Username" bind:value={username} message="your username here" errorMsg={errorMsg.username} ></TextInput>
    <TextInput label="Password" bind:value={password} message="your password here" errorMsg={errorMsg.password} type="password" ></TextInput>
    <TextInput label="Email" bind:value={email} message="your email here" errorMsg={errorMsg.email} ></TextInput>

    <Button on:click={register}>Sign Up</Button>
</Form>

{#if error}
    <Error on:close={() => error = false}>{error}</Error>
{/if}