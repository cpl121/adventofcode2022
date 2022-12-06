<script lang="ts">
    export let id: string;
    const HEADING = {
        title: "RESULTS",
        description:
            "Results per day of the advent of code 2022"
    };
</script>

<section class="bg-green-200 w-full h-full relative pt-28 pb-14 lg:pt-40 lg:pb-28 z-20 overflow-hidden" {id}>
    <div class="container flex flex-col lg:flex-row items-center justify-center w-full h-full z-10">
        <div class="w-full text-center lg:text-left lg:w-1/2  lg:mr-8">
            <h1 class="mb-6">{HEADING.title}</h1>
            <h4 class="text-grey-500 lg:max-w-md metropolis-400">{HEADING.description}</h4>
        </div>
    </div>
</section>

<style>
    section {
        min-height: 100px;
    }
</style>