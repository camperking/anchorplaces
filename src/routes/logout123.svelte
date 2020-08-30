<script context="module">
	export async function preload(page, session) {
		const { auth } = session.auth;

        console.log('logout');

		if (!auth) {
			return this.redirect(302, '/');
		}

		return { auth };
	}
</script>