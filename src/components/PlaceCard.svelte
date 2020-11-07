<script>
    import Gallery from "./ui/Gallery.svelte";
    import Link from "./ui/Link.svelte";
    import MapLink from "./ui/MapLink.svelte";
    import Vote from "./Vote.svelte";

    export let place;

</script>

<style>

    .place-card {
        display: flex;
        border: 1px solid black;
        border-radius: 5px;
        margin-bottom: 1em;
    }

    .gallery {
        width: 35%;
    }

    .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 65%;
        margin: 1em;
    }

    .head {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    h3 {
        border-bottom: 3px solid #ff9100;
    }

    .title {
        display: flex;
    }

    .more {
        display: flex;
        justify-content: end;
    }

</style>

<div class="place-card">
    <div class="gallery">
        <Gallery pictures={place.pictures} />
    </div>
    <div class="info">
        <div>
            <div class="head">
                <div class="title">
                    <h3>{place.name}</h3>
                    <MapLink position={place.position.coordinates} />
                </div>
                <div class="vote">
                    <Vote object={place._id} key="place" />
                </div>
            </div>
            <div class="desc">{place.description}</div>
        </div>
        <div class="more">
            <Link url={'place/' + place._id} icon={'keyboard_arrow_right'}>more</Link>
            <!-- <a href={'place/' + place._id}>more</a> -->
        </div>
    </div>
</div>