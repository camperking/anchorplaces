<script>

export {
    label,
    onClick
};

let label = '';
let onClick = () => {};

</script>

<style>
input {
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

input:hover {
    background-color: #ff9100;
    color: white;
}
</style>

<input type="button" value={label} on:click={onClick}  />