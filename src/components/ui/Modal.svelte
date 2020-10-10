<script>

    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
    const close = () => {
        visible = false;
        dispatch('close');
    }

    export let visible = false;
    
    </script>
    <style>
    
    .modal-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        z-index: 1;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .modal {
        background-color: white;
        padding: 2em;
        
    }
    
    </style>
    
    {#if visible}
    <div class="modal-background" on:click={close} >
        <div class="modal" on:click|stopPropagation>
            <slot></slot>
        </div>
    </div>
    {/if}