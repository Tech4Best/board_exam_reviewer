<script lang="ts">
    import type { Snippet } from 'svelte';
    const {title, backURL, children,}:{ 
        title: string,
        backURL: string | null,
        children: Snippet,
    }
    = $props()
</script>
<div class="flex flex-row">
    <!--
        Insert BAck URL HERE {backURL} 
    -->
    <p class="text-2xl font-bold">
        {title}
    </p>
    <div class="grow">
    </div>
    {#if children}
        {@render children()}
    {:else}
        <p>fallback content</p>
    {/if}
</div>
