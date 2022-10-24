<script>
    import { SkeletonBlock } from "@skeleton-elements/svelte";
    import { createEventDispatcher } from "svelte";

    export let height = "100%";
    export let width = "100%";
    export let name = undefined;
    export let description = "";
    export let image = undefined;
    export let id = undefined;

    const dispatch = createEventDispatcher();

    function click_block(event) {
        dispatch("clickBlock", {
            event: event,
            id: id,
        });
    }
    function click_name(event) {
        console.log("print name")
        dispatch("clickName", {
            event: event,
            id: id,
        });
    }
    function click_description(event) {
        dispatch("clickDescription", {
            event: event,
            id: id,
        });
    }
</script>

<div class="image-div unselectable" on:click={click_block}>
    {#if image == undefined}
        <SkeletonBlock style="border-radius: 10px;height: {height}" />
    {:else}
        <img
            src={image}
            alt="Постер {name}"
            class="image unselectable"
            style="height:{height}"
        />
        <div style="max-width:{width}" class="unselectable">
            <h1 on:click={click_name} class="unselectable" style="font-size: 24px;cursor: pointer;">{name}</h1>
            {#if description.length !== 0}
                <p on:click={click_description} style="word-break: break-word;" class="unselectable">
                    {description.substring(0, 64)}
                    {#if description.length > 64}...{/if}
                </p>
            {/if}
        </div>
    {/if}
</div>

<style>
    .image-div {
        width: 100%;
        position: relative;
        background-color: #000;
        border-radius: 10px;
    }
    .image {
        width: 100%;
        height: 400px;
        border-radius: 10px;
        opacity: 0.6;
        background-color: #000;
    }
    .image-div div {
        text-align: left;
        color: white;
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
    }
    .unselectable {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  not supported by any browser */
    }
</style>
