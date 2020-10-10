<script>
	import { stores } from '@sapper/app';
	import Sidepanel from './ui/Sidepanel/Sidepanel.svelte';
	import SidepanelItem from './ui/Sidepanel/SidepanelItem.svelte';
	import Button from './ui/Button.svelte';
	import Menu from './ui/Menu/Menu.svelte';
	import MenuItem from './ui/Menu/MenuItem.svelte';
	import Modal from './ui/Modal.svelte';
	import Login from './Forms/Login.svelte';
	import Register from './Forms/Register.svelte';
	
	const { session } = stores();

	export let segment;

	let showSidepanel = false;

	let showLogin = false;
	let showRegister = false;
	

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

</style>

<div class="navbar">
	<div class="nav-group">
		
		<div class="nav-item material-icons" on:click={() => showSidepanel = true}>menu</div>

		<Sidepanel bind:visible={showSidepanel} >
			<SidepanelItem href="" icon="anchor" {segment}>Explore</SidepanelItem>

			<SidepanelItem href="profile" icon="account_box" {segment}>Profile</SidepanelItem>

			<SidepanelItem href="map" icon="map" {segment}>Map</SidepanelItem>

		</Sidepanel>

	</div>

	<div class="nav-group">Anchorplaces</div>

	<div class="nav-group">
		
		{#if $session.id}
			<Menu>
				<div slot="menu-activator">
					<span class="nav-item material-icons">account_box</span>
				</div>
				<div slot="menu-list">
					<MenuItem>
						<a href="profile">
							<b>Your Profile</b>
						</a>
					</MenuItem>
					<MenuItem>Likes</MenuItem>
					<MenuItem>Follower</MenuItem>
					<MenuItem>Votes</MenuItem>
					<MenuItem>Comments</MenuItem>
				</div>
			</Menu>
		{:else}
		<Menu>
			<div slot="menu-activator">
				<span class="nav-item material-icons">account_box</span>
			</div>
			<div slot="menu-list">
				<MenuItem>
					<Button onClick={() => showLogin = true}>Login</Button>
					
					<Button weight="secondary" onClick={() => showRegister = true}>Sign Up</Button>
				</MenuItem>
			</div>
		</Menu>
		{/if}

		<Modal bind:visible={showLogin}>
			<Login on:submit={() => showLogin = false} redirect="profile"></Login>
		</Modal>

		<Modal bind:visible={showRegister}>
			<Register on:submit={() => showRegister = false} redirect="profile"></Register>
		</Modal>
	</div>
</div>