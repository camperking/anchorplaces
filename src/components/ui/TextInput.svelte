<script>

    export {
        value,
        label,
        message,
        errorMsg,
        type,
    }

    let value = '';
    let label = '';
    let message = '';
    let type = 'text';
    let errorMsg = false;

    const attrs = { type };

    let elm;

</script>

<style>

.TextInput {
    position: relative;
    margin-bottom: 0.5em;
    display: flex;
    flex-direction: column;
    justify-content: left;
}

input {
    font-size: var(--font-size, medium);
    border: none;
    border-bottom: 3px solid gray;
    transition: border-bottom-color 1s;
}

input:focus, .inputValue {
    border-bottom-color: var(--primary-color, #ff9100);

}

label {
    position: absolute;
    left: 0;
	top: 0;
    cursor: text;
    opacity: 0;
    transition: opacity 0.5s, top 0.5s, font-size 0.5s;
}

input:focus ~ label {
    opacity: 1;
    top: -1.2em;
    font-size: smaller;
    cursor: default;
}

.labelValue {
    opacity: 1;
    top: -1.2em;
    font-size: smaller;
    cursor: default;
}

.message {
    font-size: smaller;
    opacity: 0;
    transition: opacity 0.5s;
}

.errorMsg {
    opacity: 1;
}

input:focus ~ .message {
    opacity: 1;
}

</style>


<div class="TextInput" on:click={() => elm.focus()}>
    <input bind:this={elm} {...attrs} bind:value placeholder={label} class:inputValue={value} />
    <label for="input" class:labelValue={value} >{label}</label>
    <div class="message" class:errorMsg>
        {#if errorMsg}
            {errorMsg}
        {:else}
            {message}
        {/if}
    </div>
</div>
