<script lang="ts">
    export let sections: any[] = [];
    let container: HTMLElement;

</script>

<div bind:this={container}>
    {#each sections as { component, id }}
        <svelte:component this={component} {id} />
    {/each}
</div>