<script>
    import { onMount } from "svelte";
    import { api } from "../api/api";
    import { RCODE } from "../config";

    export let currentRoute;
    let collectionId = currentRoute.namedParams.collectionId;

    let collectionInfo = { code: RCODE.LOADING, content: null };

    $: console.log(collectionInfo);

    onMount(() => {
        // api.collection.collection(releaseId).then((r) => (collectionInfo = r));
    });
</script>

CollectionPage {collectionId}
