<script>
	import { stores } from '@sapper/app';
	import Menu from './Menu.svelte';

	const { preloading, page, session } = stores();

	export let segment;

	let showMenu = false;

</script>

<style>

	.navbar {
		position: sticky;
		top: 0;
		background-color: white;
		z-index: 1;
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em 0 1em;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	/* .nav-group {
		
	} */

	a {
		text-decoration: none;
	}

	.nav-item {
		cursor: pointer;
		padding: 0.5em 0 0.5em 0;
	}

	.nav-item:hover {
		color: #ff9100;
		box-shadow: inset 0px -3px 0px 0px #ff9100;
	}

	.current {
		color: #ff9100;
		box-shadow: inset 0px -3px 0px 0px #ff9100;
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
		<a href="place/edit/" class="nav-item material-icons" class:current="{segment === 'add'}">
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
