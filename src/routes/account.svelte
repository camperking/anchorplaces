<script>
	import { stores } from '@sapper/app';
	import { onMount } from "svelte";

	const { preloading, page, session } = stores();


	onMount(() => {
    	console.log($session.auth);
 	 });
</script>

{#if !$session.auth}
<form action="/login" method="post">
    <div>
        <label for="username">Username:</label>
        <input type="text" name="username"/>
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="password" name="password"/>
    </div>
    <div>
        <input type="submit" value="Log In"/>
    </div>
</form>
<a href="register">register</a>
{:else}
    <a href="logout">logout</a>
{/if}