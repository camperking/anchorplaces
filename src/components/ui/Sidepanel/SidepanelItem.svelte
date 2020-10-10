<script>

    export let href = '.';
    export let icon = '';
    export let segment;

</script>

<style>

    a {
        padding: 2em 2em 2em 2em;
        display: flex;
        flex-direction: row;
        align-items: center;
        text-decoration: none;
        font-size: 18px;
    }

    a:hover {
        background-color: #8c9eff;
        color: black;
    }

    .current {
        color: #ff9100;
        border-right: 3px solid #ff9100;
    }

    span {
        margin-right: 1em;
    }

    .material-icons {
        font-size: 36px;
    }

</style>

<a href={href} class:current="{segment === (href || undefined)}">
    <span class="material-icons">{icon}</span><slot />
</a>