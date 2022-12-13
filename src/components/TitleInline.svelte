<script>
    import { SkeletonBlock } from "@skeleton-elements/svelte";
    import { createEventDispatcher } from "svelte";
    import { Badge } from "sveltestrap";

    export let name = null;
    export let image = null;
    export let id = null;
    export let year = null;
    export let categoryName = null;
    export let grade = 0

    const dp = createEventDispatcher();

    const sizes = {
        width: "100px",
        height: "150px",
    };

    const animeObj = {
        id: id,
    };

    const clickBlock = (_) => dp("clickBlock", animeObj);
    const clickName = (_) => dp("clickName", animeObj);
</script>

<div class="title">
    <div
        class="image_block unselectable"
        style="cursor:pointer;max-width:{sizes.width}"
        on:click={clickBlock}
    >
        {#if image == null}
            <SkeletonBlock
                style="border-radius:10px;height:{sizes.height};max-width:{sizes.width}"
            />
        {:else}
            <img
                src={image}
                alt="Постер {name}"
                class="image unselectable"
                style="height:{sizes.height}"
            />
        {/if}
    </div>
    <div class="info_block">
        <div class="name" on:click={clickName}>{name}</div>
        <div><Badge>{categoryName}</Badge> {year} г.</div>
    </div>
</div>

<style>
    .name {
        font-size: 22px;
        cursor: pointer;
    }
    .title {
        display: flex;
        margin-top: 10px;
    }
    .image_block {
        width: 100%;
        position: relative;
        border-radius: 10px;
    }
    .image {
        width: 100%;
        height: 400px;
        border-radius: 10px;
        opacity: 0.9;
    }
    .info_block {
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
    .unselectable {
        user-select: none;
    }
</style>
