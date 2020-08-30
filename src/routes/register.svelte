<script>
	import { stores } from '@sapper/app';
	import { onMount } from "svelte";

    const { preloading, page, session } = stores();
    
    const usernamePattern = '^([A-Za-z0-9€#\.+-]){4,20}$';

	onMount(() => {
    	console.log($session.auth);
 	 });
</script>

{#if !$session.auth}
<form action="/register" method="post">
    <div>
        <label for="newUsername">Username:</label>
        <input type="text" name="newUsername" pattern={usernamePattern} required />
    </div>
    <div>
        <label for="newPassword">Password:</label>
        <input type="password" name="newPassword" required />
    </div>
    <div>
        <input type="submit" value="Register"/>
    </div>
</form>
<a href="register">register</a>
{/if}