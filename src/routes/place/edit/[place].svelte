<script context="module">

	export async function preload({ params }) {

        let placeid  = params.place;
        
        const res = await this.fetch('/place/rest/id/' + placeid);
        
        const place = await res.json();
        //console.log(place);
		return { place };
	}
</script>




<script>
    import { stores } from "@sapper/app";
    import { goto } from '@sapper/app';
    import { onMount } from 'svelte';
  
    const { preloading, page, session } = stores();

    export let place;

    const groundValues = [
        'sand',
        'gravel',
        'mud',
        'clay',
        'rocks',
        'plants'
    ];

    let ground = 'sand';

    const protectionValues = [
        'N',
        'NE',
        'E',
        'SE',
        'S',
        'SW',
        'W',
        'NW'
    ];

    let protection = {};

    const serviceValues = [
        'diesel',
        'gas',
        'water',
        'boat repair',
        'engine maint.',
        'sailmaker',
        'moorings',
        'shower',
        'cafes',
        'restaurants',
        'supermarket'
    ];

    let services = {};

    //console.log(place);

    onMount(() => {
		console.log(place);
		
 	 });
  
    //let latitude = 0;
    //let longitude = 0;
  
  
    function getLocation() {
  
      if (navigator.geolocation) {
  
        navigator.geolocation.getCurrentPosition(position => {
  
          place.location.coordinates[1] = position.coords.latitude;
          place.location.coordinates[0] = position.coords.longitude;
          
        });
  
      } //else {
      //    x.innerHTML = "Geolocation is not supported by this browser.";
      //}
    }
  
  
    function add() {

        //console.log(place.location.coordinates[0]);
        
  
    //   if(form.reportValidity()) {
    //     const formData = new FormData(form);
  
    //     const performGoto = async (form) => {
  
    //       await goto('/');
    //       fetch('place/0/', {method: 'POST', body: formData});
    //     }
  
    //     performGoto(form);
  
    //   }
    }
  
  </script>
  
  <style>


  .form-label > label {
      font-weight: 600;
      border-bottom: 3px solid #ff9100;
      text-transform: uppercase;
      margin-right: 1em;
      /* text-align: right; */
      /* width: 50% */
      /* grid-column: 1; */
  }

  input {
      /* grid-column: 2; */
      /* width: 50%; */
  }

  .form-item {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-items: center;

    /* display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto; */
    
    margin-bottom: 1em;
  }

  .form-label {
      flex-basis: 50%;
      text-align: right;
  }

  .form-input {
      flex-basis: 50%;
      text-align: left;
  }

  form {
      /* display: flex; */
      /* flex-wrap: wrap; */
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
    flex-basis: 49%;
    /* padding: 0 0.5em 0 0.5em; */
  }

  img {
    max-width: 100%;
  }

  </style>
  
  <form id="form">
    <div class="form-item">
      <div class="form-label"><label for="name">name</label></div>
      <div class="form-input"><input type="text" name="name" value={place.name} required /></div>
    </div>
  
    <!-- <div class="form-item"> -->
      <div class="form-item">
        <div class="form-label"><label for="latitude">latitude</label></div>
        <div class="form-input"><input name="latitude" value={place.location.coordinates[1]} required /></div>
      </div>
  
      <div class="form-item">
        <div class="form-label"><label for="longitude">longitude</label></div>
        <div class="form-input"><input type="text" name="longitude" value={place.location.coordinates[0]} required /></div>
      </div>
  
      <div class="form-item">
        <button type="button" on:click={getLocation}>get location</button>
      </div>
    <!-- </div> -->

      <div class="form-item">
        <div class="form-label"><label for="notes">notes</label></div>
        <div class="form-input"><textarea name="notes" placeholder="local names for anchorplace or shallows">{place.notes}</textarea></div>
      </div>
  
      <div class="form-item">
            <div class="form-label"><label for="pictures">pictures</label></div>
            <div class="pictures">
                {#each place.pictures as pic}
                    <div class="pic">
                        <img src={pic.path} alt={pic.name} />
                        <!-- <Vote object={object} key={pic.path}></Vote> -->
                    </div>
                {/each}
            </div>
            <div class="form-input"></div>
      </div>
  
      <div class="form-item">
            <div class="form-label"><label for="avgDepth">depth</label></div>
            <div class="form-input"><input type="number" name="depth" placeholder="2" min=0 max=100 value={place.depth} /></div>
      </div>
  
      <div class="form-item">
        <div class="form-label"><label for="ground">ground</label></div>
        <div class="form-input">
            <select multiple bind:value={ground} name="ground" size=6 >
                {#each groundValues as ground}
                    <option value={ground}>
                        {ground}
                    </option>
                {/each}
            </select>
        </div>
     </div>

     <div class="form-item">
        <div class="form-label"><label for="protection">protection</label></div>
        <div class="form-input">
            {#each protectionValues as direction}
                <div>
                    <input type="checkbox" id={direction} name={'protection_' + direction} value={direction} bind:checked={protection[direction]} >
                    <label for={direction}>{direction}</label>
                </div>
            {/each}
        </div>
    </div>

    <div class="form-item">
        <div class="form-label"><label for="service">services</label></div>
        <div class="form-input">
            {#each serviceValues as service}
                <div>
                    <input type="checkbox" id={service} name={'service_' + service} value={service} bind:checked={services[service]} >
                    <label for={service}>{service}</label>
                </div>
            {/each}
        </div>
    </div>
  
      <div class="form-item">
          <input on:click={add} type="button" value="Submit" />
      </div>
  </form>
  