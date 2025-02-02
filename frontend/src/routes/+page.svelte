<script lang="ts">
	import { goto } from "$app/navigation";
	import { Button } from "$lib/components/ui/button";
    import * as Select  from "$lib/components/ui/select";
	//import type { PageProps } from './$types';

	let { data } = $props();
	const exams = data.exams
    let value= $state('')
    const triggerContent = $derived(
        exams.find((f: any) => f.id === value)?.title ?? "Select Exams"
    );

    const saveItem = () => {
        if(value !== "") {
            localStorage.setItem("exam",value)
            goto("/home")
        } else {
            window.alert("Please select a valid exam")
        }
    }
</script>
<div class="mx-auto w-80 px-4 py-5 border-red-700 flex justify-center flex-col">
	<h1 class="text-center font-semibold text-4xl mb-20" > Online Reviewer </h1>
        <Select.Root  type="single" name="favoriteFruit" bind:value >
            <Select.Trigger >
                {triggerContent}
            </Select.Trigger>
            <Select.Content>
                <Select.Group> 
                    <Select.GroupHeading>Courses</Select.GroupHeading>
            {#each exams as exam} 
                <Select.Item value={exam.id} label={exam.title}>
                    {exam.title}
                </Select.Item>
            {/each}
                </Select.Group>
            </Select.Content>
        </Select.Root>
        <Button onclick={saveItem}>
            Save Item
        </Button>
</div>