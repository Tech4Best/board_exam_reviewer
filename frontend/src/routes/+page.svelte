<script>
	import { goto } from "$app/navigation";
	import { Button } from "$lib/components/ui/button";

</script>

<Button onclick={()=>{goto('/quiz')}}>
    <p>Start Quiz</p>
</Button>