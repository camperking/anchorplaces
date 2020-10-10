<script>

export {
    onClick,
    weight,
    size,
    border
};

let onClick = () => {};
let weight = 'primary';
let size = 'medium';
let border = true;

</script>

<style>
button {
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: white; */
    border: none;

    /* padding: 1em 2em; */
    font-size: medium;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
}

.border {
    border: 1px solid #ff9100;
    border-radius: 5px;
}

/* button:hover {
    background-color: #ff9100;
    color: white;
} */

.weight-primary {
    background-color: #ff9100;
    color: white;
}

.weight-primary:hover {
    background-color: white;
    color: black;
}

.weight-secondary {
    background-color: white;
}

.weight-secondary:hover {
    background-color: #ff9100;
    color: white;
}

.size-small {
    padding: 0;
}

.size-medium {
    padding: 0.5em;
}

.size-large {
    padding: 1em;
}

</style>

<button 
    type="button"
    on:click={onClick} 
    class:border={border}
    class:weight-primary={weight === 'primary'}
    class:weight-secondary={weight === 'secondary'}
    class:size-small={size === 'small'}
    class:size-medium={size === 'medium'}
    class:size-large={size === 'large'} >
    <slot />
</button>