<script>

import { createEventDispatcher, onDestroy } from 'svelte';

const dispatch = createEventDispatcher();
const close = () => dispatch('close');

</script>
<style>

.error-background {
    position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        z-index: 1;
        overflow: auto;
}

.error {
    text-align: center;
    background-color: white;
    width: 30%;
    height: 30%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 4em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    
}

</style>

<div class="error-background">
    <div class="error">
        <div><slot></slot></div>
        <div><input type="button" on:click={close} value="ok" /></div>
    </div>
</div>