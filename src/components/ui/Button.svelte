<script>

export {
    onClick
};

let label = '';
let onClick = () => {};

</script>

<style>
button {
    background-color: white;
    border: none;
    border: 1px solid #ff9100;
    border-radius: 5px;
    padding: 1em 2em;
    font-size: medium;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;

}

button:hover {
    background-color: #ff9100;
    color: white;
}
</style>

<button type="button" on:click={onClick}>
    <slot />
</button>