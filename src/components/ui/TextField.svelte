<script>
    export let placeholder = '';
    export let value = '';
</script>

<style>
    textarea {
        border: 1px solid gray;
        min-height: 4em;
    }

    textarea:focus {
        border-color: #ff9100;
    }
</style>

<textarea bind:value {placeholder} on:change ></textarea>