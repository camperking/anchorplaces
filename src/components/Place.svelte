<script>
    import { stores } from '@sapper/app';
    import { slide } from 'svelte/transition';
    import Vote from './Vote.svelte';

    const { preloading, page, session } = stores();

    export let place;

    const pictures = place.pictures;

    const object = place._id;

    let moreInfo = false;

    function isAuthor () {
        if ($session.userid) {
            if ($session.userid == place.author_id) {
                return true;
            }
        } else {
            return false;
        }
    }


</script>

<style>

.place {
    margin-bottom: 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid grey;
}

a {
	text-decoration: none;
}

.head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    /* max-width: 100%; */
}

h2 {
    margin: 0 1em 0 0;
    
}

.title {
    /* flex-basis: 80%; */
    max-width: 80%;
}

.pictures {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.pic {
    /* width: 50%; */
    /* display: flex; */
    box-sizing: border-box;
    flex-basis: 48%;
    /* padding: 0 0.5em 0 0.5em; */
}

img{
  max-width: 100%;
}

.info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-bottom: 1em;
}

.info-notes {
    flex-basis: 100%;
    
}

.info-item {
    /* border: 1px solid black; */
    cursor: pointer;
    margin: 0.5em;
}

.info-item:hover {
    background-color: #c0cfff
}

.info-key {
    text-align: center;
    font-weight: 600;
    text-transform: uppercase;
    border-bottom: 3px solid #ff9100;
    margin-bottom: 0.2em;
}

.info-value {
    text-align: center;
}

.more-info {
    cursor: pointer;
    text-align: center;
    border: 1px solid black;
    width: 20%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1em;
    padding: 0 0.5em 0 0.5em;
}

.more-info:hover {
    background-color: #c0cfff
}

.more-info-active {
    background-color: #c0cfff;
}

</style>

<div class="place">
    <div class="head">
        <div class="title">
            <h2>{place.name}</h2>
            <div class="author">by {place.author}</div>
            <div class="links">
                <a href={ 'map/' + place._id } class="material-icons">place</a>

                {#if isAuthor() }
                    <a href={ 'place/edit/' + place._id } class="material-icons">edit</a>
                {/if}

            </div>
        </div>
        <Vote object={object} key={null}></Vote>
    </div>

    <div class="pictures">
        {#each pictures as pic}
            <div class="pic">
                <img src={pic.path} alt={pic.name} />
                <Vote object={object} key={pic.path}></Vote>
            </div>
        {/each}
    </div>

    <div class="info">

        <div class="info-item">
            <div class="info-key">depth</div>
            <div class="info-value">{place.avgDepth} m</div>
        </div>

        <div class="info-item">
            <div class="info-key">ground</div>
            <div class="info-value">{place.ground}</div>
        </div>

        <div class="info-item">
            <div class="info-key">protection</div>
            <div class="info-value">{place.protection}</div>
        </div>

        <div class="info-notes">
            {place.notes}
        </div>
    </div>

    <div class="more-info" on:click={() => moreInfo = !moreInfo} class:more-info-active="{moreInfo === true}">more info</div>
    {#if moreInfo}
    <div class="info" transition:slide={{}} >

        <div class="info-item">
            <div class="info-key">services</div>
            <div class="info-value">{place.services}</div>
        </div>

        <div class="info-item">
            <div class="info-key">boat repair</div>
            <div class="info-value">{place.boatRepair}</div>
        </div>

        <div class="info-item">
            <div class="info-key">diesel</div>
            <div class="info-value">{place.diesel}</div>
        </div>

        <div class="info-item">
            <div class="info-key">gas</div>
            <div class="info-value">{place.gas}</div>
        </div>

        <div class="info-item">
            <div class="info-key">engine maint.</div>
            <div class="info-value">{place.engineMaint}</div>
        </div>

        <div class="info-item">
            <div class="info-key">sailmaker</div>
            <div class="info-value">{place.sailmaker}</div>
        </div>

        <div class="info-item">
            <div class="info-key">restaurants</div>
            <div class="info-value">{place.restaurants}</div>
        </div>

        <div class="info-item">
            <div class="info-key">supermarket</div>
            <div class="info-value">{place.supermarket}</div>
        </div>

    </div>
    {/if}

</div>