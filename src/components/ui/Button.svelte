<script>

export {
    onClick,
    weight,
    size,
    border,
    fab
};

let onClick = () => {};
let weight = 'primary';
let size = 'medium';
let border = true;
let fab = false;

</script>

<style>
button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 5px;
    font-size: medium;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
}

.border {
    border: 1px solid #ff9100;
}

.fab {
    border-radius: 50%;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.3), 0 6px 10px 0 rgba(0, 0, 0, 0.2), 0 1px 18px 0 rgba(0, 0, 0, 0.2);
}

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
    class:fab={fab}
    class:weight-primary={weight === 'primary'}
    class:weight-secondary={weight === 'secondary'}
    class:size-small={size === 'small'}
    class:size-medium={size === 'medium'}
    class:size-large={size === 'large'} >
    <slot />
</button>