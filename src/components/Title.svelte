<script>
    import { SkeletonBlock } from "@skeleton-elements/svelte";
    import { createEventDispatcher } from "svelte";

    export let type = "normal";
    export let name = null;
    export let description = '';
    export let image = null;
    export let id = null;
    export let show_description = true;

    const dp = createEventDispatcher();

    const wide = {
        width: "800px",
        height: "450px",
    };
    const normal = {
        width: "300px",
        height: "400px",
    };
    const collection = {
        width: "600px",
        height: "350px",
    };

    let sizes = normal;

    if (type === "wide") {
        sizes = wide;
    } else if (type == "collection") {
        sizes = collection;
    } else {
        sizes = normal;
    }

    const animeObj = {
        id: id,
        name: name,
        description: description,
        image: image,
    };

    const clickBlock = (_) => dp("clickBlock", animeObj);
    const clickName = (_) => dp("clickName", animeObj);
    const clickDescription = (_) => dp("clickDescription", animeObj);
</script>

<div
    class="image_block unselectable"
    style="cursor:pointer"
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
        <div style="max-width:{sizes.width};" class="unselectable block_down">
            <div class="anime_info">
                <span
                    on:click={clickName}
                    class="unselectable anime_name"
                >
                    {name}
                </span>
                {#if description.length > 0 && show_description === true}
                    <p on:click={clickDescription} class="unselectable anime_desctiption">
                        {description.substring(0, 90)}
                        {#if description.length > 90}...{/if}
                    </p>
                {/if}
            </div>
        </div>
    {/if}
</div>

<style>
    .image_block {
        width: 100%;
        position: relative;
        background-color: #000;
        border-radius: 10px;
    }
    .image {
        width: 100%;
        height: 400px;
        border-radius: 10px;
        opacity: 0.7;
        background-color: #000;
    }
    .block_down {
        display: flex;
        align-items: flex-end;
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 50%;
        max-height: 200px;
        background: linear-gradient(transparent 0.1em, black 80%, black 100%);
        border-radius: 10px;
    }
    .anime_info {
        padding: 12px;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        flex-wrap: wrap;
    }
    .anime_name {
        text-align: left;
        font-size: 23px;
        color: rgb(230, 230, 230);
    }
    .anime_desctiption {
        text-align: left;
        font-size: 18px;
        color: rgb(185, 185, 185);
        margin-bottom: 0.1em;
    }
    .unselectable {
        user-select: none;
    }
</style>
