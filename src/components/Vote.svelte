
<script>
    import { onMount } from 'svelte';
    import { stores } from '@sapper/app';

    const { preloading, page, session } = stores();

    export let object;

    let sum = 0;
    let hasVoted = false;

    onMount(() => {
		fetch('/vote/' + object)
            .then(response => response.json())
            .then(data => {
                sum = data.sum;
                hasVoted = data.hasVoted;
            })
            .catch(err => console.log(err));
     });


function voteUp () {

    console.log('voteUp');

    if ($session.id) {
        
        if (!hasVoted || (hasVoted < 1)) {
            console.log(hasVoted);

            if (hasVoted === -1) sum = sum + 1;

            hasVoted = 1;
            sum = sum + 1;

            fetch('/vote/up/' + object);

        } else {

            console.log('delete upvote');
            // hasVoted = false;
            // sum = sum - 1;
            //
            // fetch('/vote/del/' + object);

        }

    }

}

function voteDown () {

    console.log('voteDown');

    if ($session.id) {

        if (!hasVoted || hasVoted > -1) {

            if (hasVoted === 1) sum = sum - 1;

            hasVoted = -1;
            sum = sum - 1;

            fetch('/vote/down/' + object);

        } else {

            console.log('delete downvote');
            // hasVoted = false;
            // sum = sum + 1;
            //
            // fetch('/vote/del/' + object);

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