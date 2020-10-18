
<script>
    import { onMount } from 'svelte';
    import { stores } from '@sapper/app';

    const { preloading, page, session } = stores();

    export let object;
    export let key;

    if (typeof key === 'string') key = key.replace(/\.*\/*/g, '');

    const url = object + '/' + key;

    let sum = 0;
    let hasVoted = false;

    onMount(() => {
		fetch('/api/vote/' + url )
            .then(response => response.json())
            .then(data => {
                sum = data.sum;
                hasVoted = data.hasVoted;
            })
            .catch(err => console.log(err));
     });


function voteUp () {

    if ($session.id) {
        
        if (!hasVoted || (hasVoted < 1)) {

            if (hasVoted === -1) sum = sum + 1;

            hasVoted = 1;
            sum = sum + 1;

            fetch('/api/vote/up/' + url);

        } else {

            hasVoted = false;
            sum = sum - 1;
            
            fetch('/api/vote/del/' + url);

        }

    }

}

function voteDown () {

    if ($session.id) {

        if (!hasVoted || hasVoted > -1) {

            if (hasVoted === 1) sum = sum - 1;

            hasVoted = -1;
            sum = sum - 1;

            fetch('/api/vote/down/' + url);

        } else {

            hasVoted = false;
            sum = sum + 1;
            
            fetch('/api/vote/del/' + url);

        }

    }

}
    
</script>

<style>
    .material-icons {
        font-size: 18px;
    }

    vote {
        display: flex;
        align-items: center;
        color: rgba(0, 0, 0, 0.7);
    }

    .voted {
        color: #ff9100;
    }

    .vote {
        cursor: pointer;
    }

    .vote:hover {
        color: #ff9100;
    }

    .sum {
        font-weight: 600;
        margin: 0 0.5em 0 0.5em;
    }

    /* .material-icons {
        color: rgba(0, 0, 0, 0.7);
    } */
</style>


<vote>

    <div on:click={voteUp} class="vote material-icons" class:voted="{hasVoted === 1}">
        thumb_up
    </div>

    <div class="sum">{sum}</div>

    <div on:click={voteDown} class="vote material-icons" class:voted="{hasVoted === -1}">
        thumb_down
    </div>

</vote>