<script>

    export let url = '';
    export let icon = '';

</script>

<style>

    .link {
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }

    a {
        border-bottom: 2px solid gray;
    }

    a:hover {
        border-bottom-color: #ff9100;
    }

</style>

<div class="link">
    <a href={url}><slot /></a>
    <span class="material-icons">{icon}</span>
</div>