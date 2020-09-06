<script>
    import { stores } from '@sapper/app';
    import Vote from './Vote.svelte';

    const { preloading, page, session } = stores();

    export let place;

    let pictures = place.pictures;

    let object = place._id;

    //let votes = place.votes;  need to implement vote system
    let votes = { up: 10, down: 2 };

    //console.log($session.id);
    //console.log($session.userid);
    // console.log(place.author_id);

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

a {
	text-decoration: none;
}

.head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    
}

h2 {
    margin: 0 1em 0 0;
    
}

.pictures {
    display: flex;
    flex-wrap: wrap;    
}

.pic {
    /* width: 50%; */
    /* display: flex; */
    box-sizing: border-box;
    flex-basis: 50%;
    padding: 0 0.5em 0 0.5em;
}

img{
  max-width: 100%;
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
                    <a href={ 'map/' + place._id } class="material-icons">edit</a>
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

    <div>
        <div>avg depth: {place.avgDepth}</div>
        <div>notes: {place.notes}</div>
    </div>

</div>