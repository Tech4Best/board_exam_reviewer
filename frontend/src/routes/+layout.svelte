<script lang="ts">
	import '../app.css';
	import { localDatabase, initDB} from '$lib/localstorage/index.svelte';
	let { children } = $props();
	$effect(()=>{
		initDB(localDatabase)
	})
</script>

{@render children()}