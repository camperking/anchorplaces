<script>
    import { onMount } from 'svelte';
    //import * as L from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    let map;

    let L;

	onMount(async () => {
		const module = await import('leaflet');
        L = module.default;
        
        map = L.map('map');
        
        L.tileLayer('http://192.168.0.151/hot/{z}/{x}/{y}.png',
            {
                attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>`,
                subdomains: 'abcd',
                maxZoom: 18,
            }
        ).addTo(map);

        map.on('click', onMapClick);

        map.setView([51.505, -0.09], 13);

    });
    
    function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}

</script>

<style>
    
</style>

<div style="height:400px;width:100%" id="map" />