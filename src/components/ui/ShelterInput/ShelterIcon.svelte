<script>

    export let icon;

    const invertedIcons = {
        'north_west': 'south_east',
        'north': 'south',
        'north_east': 'south_west',
        'east': 'west',
        'south_east': 'north_west',
        'south': 'north',
        'south_west': 'north_east',
        'west': 'east',
        'block': 'block'
    }

</script>

<style>

</style>

<span class="material-icons">{invertedIcons[icon]}</span>