<script>
    import { fly, fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

    export let segment;

</script>
    
<style>
    .menu-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        z-index: 1;
        overflow: auto;
    }

    menu {
        position: absolute;
        background-color: white;
        margin: 0;
        padding: 0;
        padding-top: 2em;
    }

    a {
        padding: 2em 2em 2em 2em;
        display: flex;
        flex-direction: row;
        align-items: center;
        text-decoration: none;
        font-size: 18px;
    }
    
    a:hover {
        background-color: #8c9eff;
        color: black;
    }

    .current {
        color: #ff9100;
        border-right: 3px solid #ff9100;
    }

    span {
        margin-right: 1em;
    }

    .material-icons {
        font-size: 36px;
    }
</style>

<div class="menu-background" on:click={close} transition:fade >
<menu transition:fly="{{ x: -200, duration: 500 }}" >

    
        <a on:click={close} href="." class:current="{segment === undefined}">
            <span class="material-icons">anchor</span>Home
        </a>
    

    
        <a on:click={close} href="map" class:current="{segment === 'map'}">
            <span class="material-icons">map</span>Map
        </a>
    

    
        <a on:click={close} href="account" class:current="{segment === 'account'}">
            <span class="material-icons">account_box</span>Account
        </a>
    

</menu>
</div>