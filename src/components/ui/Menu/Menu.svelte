<script>

    import Button from '../Button.svelte';
    import MenuList from './MenuList.svelte';

    let elm;

    let showMenu = false;    

</script>

<style>

    .menu {
        position: relative;
        display: inline-block;
        cursor: pointer;
    }



</style>

<svelte:window
	on:click={(event) => {
        let target = event.target;
        
        do {
            if (target === elm) {
                showMenu = !showMenu;
                // if (menuList) {console.log('asd'); menuList.style.transformOrigin = origin;}
                return;
            }
            target = target.parentNode;
        } while (target);

        showMenu = false;
    }}
/>

<div class="menu" bind:this={elm} >
    
    <slot name="menu-activator" />

    {#if showMenu}
        <MenuList>
            <slot />
            <slot name="menu-list" />
        </MenuList>
    {/if}
    
</div>