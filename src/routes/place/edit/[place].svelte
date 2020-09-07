<script context="module">

	export async function preload({ params }) {

        let placeid  = params.place;

        const template =    {
            _id: 0,
            name: '',
            notes: '',
            depth: '',
            ground: 'sand',
            location: {
                type: 'Point',
                coordinates: [ '0', '0' ]
            },
            pictures: [],
            protection: {
                'N': false,
                'NE': false,
                'E': false,
                'SE': false,
                'S': false,
                'SW': false,
                'W': false,
                'NW': false
            },
            services: {
                'diesel': false,
                'gas': false,
                'water': false,
                'boat repair': false,
                'engine repair': false,
                'sailmaker': false,
                'moorings': false,
                'shower': false,
                'cafes': false,
                'restaurants': false,
                'supermarket': false
            }
        };

        if (placeid == 'new') {
                
             const place = template;
             return { place };

         } else {
        
            const res = await this.fetch('/place/rest/id/' + placeid);
           
            const place = await res.json();

            return { place };
         }
	}
</script>




<script>
    import { stores } from "@sapper/app";
    import { goto } from '@sapper/app';
    import { onMount } from 'svelte';
  
    const { preloading, page, session } = stores();

    export let place;

    let edit = true;
    let add = false;
    if (place.name === '') {
        edit = false;
        add = true;
    }

    const groundValues = [
        'sand',
        'gravel',
        'mud',
        'clay',
        'rocks',
        'plants'
    ];

    let ground = 'mud';

    // const protectionValues = [
    //     'N',
    //     'NE',
    //     'E',
    //     'SE',
    //     'S',
    //     'SW',
    //     'W',
    //     'NW'
    // ];

    // let protection = {};

    // protectionValues.forEach(direction => {
    //     protection[direction] = false;
    // })

    // const serviceValues = [
    //     'diesel',
    //     'gas',
    //     'water',
    //     'boat repair',
    //     'engine repair',
    //     'sailmaker',
    //     'moorings',
    //     'shower',
    //     'cafes',
    //     'restaurants',
    //     'supermarket'
    // ];

    // let services = {};

    // serviceValues.forEach(service => {
    //     services[service] = false;
    // })

    onMount(() => {

		// console.log(place);
		
 	 });
  
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
  
  
function addPlace() {
    

    if(form.reportValidity()) {
        console.log('valid');
        const formData = new FormData(form);

        const performGoto = async (form) => {

            await goto('/');
            fetch('place/rest/' + place._id, {method: 'post', body: formData});

        }

        performGoto(form);

    }

}
  
  </script>
  
  <style>


  .form-label > label {
      font-weight: 600;
      border-bottom: 3px solid #ff9100;
      text-transform: uppercase;
      margin-right: 1em;
  }

  input {
      
  }

  .form-item {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-items: center;   
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


            {#if edit}
            <div class="pictures">
                {#each place.pictures as pic}
                    <div class="pic">
                        <img src={pic.path} alt={pic.name} />
                    </div>
                {/each}
            </div>
            {/if}

            {#if add}
            <input type="file" name="pictures" multiple="multiple" accept=".jpg, .png, .jpeg">
            {/if}
            



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
            {#each Object.entries(place.protection) as direction}
                <div>
                    <input type="checkbox" id={direction[0]} value={direction[1]} bind:checked={place.protection[direction[0]]} />
                    <label for={direction[0]}>{direction[0]}</label>
                </div>
            {/each}
        </div>
        <input type="hidden" name="protection" value={JSON.stringify(place.protection)} />
    </div>

    <div class="form-item">
        <div class="form-label"><label for="service">services</label></div>
        <div class="form-input">
            {#each Object.entries(place.services) as service}
                <div>
                    <input type="checkbox" id={service[0]} value={service[1]} bind:checked={place.services[service[0]]} />
                    <label for={service[0]}>{service[0]}</label>
                </div>
            {/each}
        </div>
        <input type="hidden" name="services" value={JSON.stringify(place.services)} />
    </div>
  
      <div class="form-item">
          <input on:click={addPlace} type="button" value="Submit" />
      </div>
  </form>
  