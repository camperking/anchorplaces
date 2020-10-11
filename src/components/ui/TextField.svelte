<script>
    export let placeholder = '';
    export let value = '';
</script>

<style>
    textarea {
        border: 1px solid gray;
        margin-bottom: 1em;
    }

    textarea:focus {
        border-color: #ff9100;
    }
</style>

<textarea bind:value {placeholder}></textarea>