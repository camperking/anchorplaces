<script>
	import { stores } from '@sapper/app';

	import Menu from './Menu.svelte';

	export let segment;

	let showMenu = false;

	//console.log(segment);

	const { preloading, page, session } = stores();

</script>

<style>

	.navbar {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 1em 1em;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	/* .nav-group {
		
	} */

	a {
		text-decoration: none;
	}

	.nav-item {
		cursor: pointer;
	}

	.nav-item:hover {
		color: #ff9100;
	}

	.current {
        color: #ff9100;
    }
</style>

<div class="navbar">
	<div class="nav-group">
		<div class="nav-item material-icons" on:click={() => showMenu = true} >menu</div>

	</div>

	<div class="nav-group">Anchorplace</div>

	<div class="nav-group">
		<div class="nav-item material-icons">gps_not_fixed</div>

		{#if $session.id}
		<a href="add" class="nav-item material-icons" class:current="{segment === 'add'}">
            add_location
        </a>
		{/if}

		<a href="account" class="nav-item material-icons" class:current="{segment === 'account'}">
            account_box
        </a>
	</div>
</div>


{#if showMenu}
	<Menu on:close="{() => showMenu = false }" {segment}></Menu>
{/if}
