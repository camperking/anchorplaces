<script context="module">
	export async function preload({ params}) {
		return { place_id: params.place };
	}
</script>


<script>
    import Place from "../../components/Place.svelte";

    export let place_id;



</script>

<style>

</style>


<Place {place_id} />