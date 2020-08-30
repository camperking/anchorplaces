<script>
	import { stores } from '@sapper/app';
	import { onMount } from "svelte";

	const { preloading, page, session } = stores();


	onMount(() => {
    	console.log($session.auth);
 	 });
</script>

{#if !$session.auth}
<form action="/register" method="post">
    <div>
        <label for="newUsername">Username:</label>
        <input type="text" name="newUsername"/>
    </div>
    <div>
        <label for="newPassword">Password:</label>
        <input type="password" name="newPassword"/>
    </div>
    <div>
        <input type="submit" value="Register"/>
    </div>
</form>
<a href="register">register</a>
{/if}