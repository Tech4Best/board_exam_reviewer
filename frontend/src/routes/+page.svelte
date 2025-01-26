<script>
	import { goto } from "$app/navigation";
	import { Button } from "$lib/components/ui/button";

	const redirect = () => {
		const course = localStorage.getItem("course");

		if(course !== null && course !== ""){
			goto("/quiz");
		}
		goto("/configure");
	}

</script>
<div class="mx-auto w-80 px-4 border-red-700 ">
	<h1> Online Reviewer </h1>
	<Button onclick={redirect}>
		<p>Start Quiz</p>
	</Button>
</div>