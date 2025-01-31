<script>
	import { goto } from "$app/navigation";
	import { Button } from "$lib/components/ui/button";
	//import type { PageProps } from './$types';

	let { data } = $props();
	console.log(data.exams)
	const redirect = () => {
		const course = localStorage.getItem("course");

		if(course !== null && course !== ""){
			goto("/quiz");
		}
		goto("/configure");
	}

</script>
<div class="mx-auto w-80 px-4 py-5 border-red-700 flex justify-center flex-col">
	<h1 class="text-center font-semibold text-4xl mb-20" > Online Reviewer </h1>
	<Button onclick={redirect}>
		<p>Start Quiz</p>
	</Button>
</div>