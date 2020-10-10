<script>

    import { createEventDispatcher, onDestroy } from 'svelte';
    
    const dispatch = createEventDispatcher();
    const close = () => dispatch('close');
    
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
        /* text-align: center; */
        background-color: white;
        /* margin-left: auto;
        margin-right: auto; */
        margin-top: 4em;
        padding: 2em;
        
    }
    
    </style>
    
    <div class="modal-background" on:click={close} >
        <div class="modal" on:click|stopPropagation>
            <slot></slot>
            <!-- <div><input type="button" on:click={close} value="ok" /></div> -->
        </div>
    </div>