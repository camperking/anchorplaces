<script>

    export let value = '';
    export let label = '';
    export let message = '';

</script>

<style>

    .select-input {
        display: flex;
        align-items: center;
    }

    .wrapper {
        display: flex;
        border-bottom: 3px solid gray;
        transition: border-bottom-color 0.5s;
    }

    .wrapper:focus-within {
        border-bottom-color: #ff9100;
    }

    .wrapper::after {
        content: "▼";
        color: gray;
        margin-top: 0.25em;
        margin-left: -1em;
        font-size: smaller;
    }

    select {
        font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        appearance: none;
        min-width: 5rem;
        font-size: 1em;
        border: none;
        text-align: center;
    }

    .label {
        font-size: 1em;
        color: gray;
    }

    .message {
        opacity: 0;
    }

</style>

<div class="select-input">
    <div class="wrapper">
        <div class="label">{label}</div>
        <select bind:value ><slot /></select>
    </div>
    <div class="message">{message}</div>
</div>