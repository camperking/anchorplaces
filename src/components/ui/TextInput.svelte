<script>

    export {
        value,
        label,
        message,
        errorMsg,
        type,
        width
    }

    let value = '';
    let label = '';
    let message = '';
    let type = 'text';
    let width = 'medium';
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
    font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: var(--font-size, medium);
    border: none;
    border-bottom: 3px solid gray;
    transition: border-bottom-color 1s;
    min-width: 5em;
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

.width-small {
    width: 5em;
}

.width-medium {
    width: 15em;
}

.width-large {
    width: 20em;
}


</style>


<div 
    class="TextInput"
    on:click={() => elm.focus()}
    class:width-small={width == 'small'}
    class:width-medium={width == 'medium'}
    class:width-large={width == 'large'} >

    <input 
        bind:this={elm}
        {...attrs}
        bind:value
        placeholder={label}
        class:inputValue={value}
        on:change />
    <label for="input" class:labelValue={value} >{label}</label>
    <div class="message" class:errorMsg>
        {#if errorMsg}
            {errorMsg}
        {:else}
            {message}
        {/if}
    </div>
</div>
