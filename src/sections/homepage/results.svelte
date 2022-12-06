<script lang="ts">
    import * as day1 from '../../day1';
    import * as day2 from '../../day2';
    import * as day3 from '../../day3';
    import * as day4 from '../../day4';
    import * as day5 from '../../day5';
    import * as day6 from '../../day6';

    let results: any[][] = [
        [day1.result1, day1.result2],
        [day2.result1, day2.result2],
        [day3.result1, day3.result2],
        [day4.result1, day4.result2],
        [day5.result1, day5.result2],
        [day6.result1, day6.result2]
    ]
</script>

<section class="bg-green-200 w-full h-full relative pt-28 pb-14 lg:pt-40 lg:pb-28 z-20 overflow-hidden">
    <div class="container flex flex-col lg:flex-row items-center justify-center w-full h-full z-10">
        <div class="w-full text-center lg:text-left lg:w-1/2  lg:mr-8">
            {#each results as result, i}
                    <h2>DAY {i + 1}</h2>
                    {#each result as res, i}
                        <span>Result {i + 1}</span>
                        <li>{res}</li>
                    {/each}
            {/each}
        </div>
    </div>
</section>

<style>
    section {
        min-height: 680px;
    }
</style>