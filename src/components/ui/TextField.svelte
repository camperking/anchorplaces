<script>
    export let placeholder = '';
    export let value;
</script>

<style>
    textarea {
        border: 1px solid gray;
    }

    textarea:focus {
        border-color: #ff9100;
    }
</style>

<textarea bind:value {placeholder}></textarea>