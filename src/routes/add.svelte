<script>
  import { stores } from "@sapper/app";

  const { preloading, page, session } = stores();

  let latitude = 0;
  let longitude = 0;

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      });
    } //else {
    //    x.innerHTML = "Geolocation is not supported by this browser.";
    //}
  }
</script>

<style>

</style>

<form action="/add" enctype="multipart/form-data" method="post">
  <div>
    <label for="name">name</label>
    <input type="text" name="name" required />
  </div>

  <div>
    <div>
      <label for="latitude">latitude</label>
      <input type="text" name="latitude" value={latitude} required />
    </div>

    <div>
      <label for="longitude">longitude</label>
      <input type="text" name="longitude" value={longitude} required />
    </div>

    <div>
      <button type="button" on:click={getLocation}>get location</button>
    </div>
  </div>

    <div>
        <label for="pictures">pictures</label>
        <input type="file" name="pictures" multiple="multiple">
    </div>

    <div>
        <label for="avgDepth">avg depth</label>
        <input type="number" name="avgDepth" placeholder="2" />
    </div>

    <div>
        <label for="notes">notes</label>
        <textarea name="notes" placeholder="local names for anchorplace or shallows"></textarea>
    </div>

    <div>
        <input type="submit" value="Submit" />
    </div>
</form>
