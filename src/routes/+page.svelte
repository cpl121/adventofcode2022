
<script lang="ts">
    import { ObservedRoute } from "$components";
    import {
        Hero,
        Results
    } from "../sections/homepage";

    const sections: any[] = [
        {
            component: Hero,
            id: "hero"
        },
        {
            component: Results,
            id: "results"
        },
    ];
</script>

<ObservedRoute {sections} />