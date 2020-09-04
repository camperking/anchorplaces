<script>
    //export let place;
    export let place;
</script>

<style>
img {
    width: 100%;
}
</style>

<div>
<h2>{place.name}</h2>
<img src={place.pictures[0].path} alt="anchorplace" />
<div>avg depth: {place.avgDepth}</div>
<div>notes: {place.notes}</div>
</div>