<script>

    export let label = '';
    export let toggled = false;

</script>

<style>

    .toggle {
        /* border-rad; */
        display: flex;
        align-items: center;
        /* flex-direction: row; */
    }

    .checkbox {
        position: relative;
        appearance: none;
        width: 2.5em;
        height: 1.5em;
        border-radius: 1em;
        border: 2px solid gray;
        background: white;
        transition: all 0.4s;
        font-size: medium;
    }

    .checkbox::before {
        width: 1em;
        height: 1em;
        border-radius: 50%;
        background-color: gray;
        content: '';
        position: absolute;
        top: 0.125em;
        left: 10%;
        transition: all 0.4s;
    }

    .checkbox:checked {
        /* background-color: #ff9100; */
        border-color: #ff9100;
        transition: all 0.4s;
    }

    .checkbox:checked::before {
        background-color: black;
        left: 49%;
        transition: all 0.4s;
    }

    .label {
        margin-left: 0.2em;
    }

</style>

<!-- <div class="toggle-component"> -->
    <div class="toggle">
        <input type="checkbox" class="checkbox" bind:checked={toggled} />
        <div class="label">{label}</div>
    </div>
    
<!-- </div> -->