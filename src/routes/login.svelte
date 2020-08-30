<script context="module">
  export async function preload(page, session) {
      if (session.id) {
          return this.redirect(302, '/');
      }
      return 'could not login';
  }


</script>