<script>

    export let icon = 'add_circle_outline';
    export let files = [];

</script>

<style>

    input {
        height: 0;
        width: 0;
        opacity: 0;
    }

    .file-input {
        border: none;
        border-radius: 5px;
        /* font-size: medium; */
        /* font-weight: bold; */
        cursor: pointer;
        transition: background-color 0.2s, color 0.2s;
        border: 1px solid #ff9100;
        background-color: white;
    }

    .file-input:hover {
        background-color: #ff9100;
        color: white;
    }

    label {
        cursor: pointer;
        padding: 0.5em;
        display: flex;
        justify-content: center;
        align-items: center;
        /* font-size: large; */
        font-weight: 600;
    }

    .material-icons {
        margin-right: 0.5em;
        font-size: 24px;
    }

</style>

<div class="file-input">
    
    <label>
        <input 
            type="file"
            bind:files
            on:change >
        <span class="material-icons">{icon}</span>
        <slot />
    </label>
</div>