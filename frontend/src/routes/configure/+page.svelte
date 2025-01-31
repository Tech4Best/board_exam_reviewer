<script lang="ts">
	import { goto } from "$app/navigation";
	import Button from "$lib/components/ui/button/button.svelte";
    import * as Select  from "$lib/components/ui/select";
    import { courseList} from "$lib/data/demoExams";

    let value= $state('')
    const triggerContent = $derived(
        courseList.find((f) => f.id === value)?.title ?? "Select a Course"
    );

    const saveItem = () => {
        if(value !== "") {
            localStorage.setItem("course",value)
            goto("/quiz")
        } else {
            window.alert("Please select a valid exam")
        }
    }
</script>
<div class="mx-auto w-80">
    <h1 class="text-2xl font-semibold" >Configure Quiz</h1>
    <div class="">
        <Select.Root  type="single" name="favoriteFruit" bind:value >
            <Select.Trigger >
                {triggerContent}
            </Select.Trigger>
            <Select.Content>
                <Select.Group> 
                    <Select.GroupHeading>Courses</Select.GroupHeading>
            {#each courseList as course} 
                <Select.Item value={course.id} label={course.title}>
                    {course.title}
                </Select.Item>
            {/each}
                </Select.Group>
            </Select.Content>
        </Select.Root>
        <Button onclick={saveItem}>
            Save Item
        </Button>
    </div>
</div>