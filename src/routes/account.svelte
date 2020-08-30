<script>
	import { stores } from '@sapper/app';
	import { onMount } from "svelte";

	const { preloading, page, session } = stores();

    const usernamePattern = '^([A-Za-z0-9€#\.+-]){4,20}$';

	onMount(() => {
    	console.log($session.auth);
 	 });
</script>

<style>

</style>

{#if !$session.auth}
<form action="/login" method="post">
    <div>
        <label for="username">Username:</label>
        <!-- <input type="text" name="username" pattern={usernamePattern} required /> -->
        <input type="text" name="username" required />
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="password" name="password" required />
    </div>
    <div>
        <input type="submit" value="Log In"/>
    </div>
</form>
<a href="register">register</a>
{:else}
    <a href="logout">logout</a>
{/if}