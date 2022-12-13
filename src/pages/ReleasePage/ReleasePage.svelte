<script>
    import { api } from "../../api/api";
    import { navigateTo } from "svelte-router-spa";
    import {
        RCODE,
        SKELETON_BIG,
        SKELETON_SMALL,
        SKELETON_MEDIUM,
    } from "../../config";
    import KeyValue from "../../components/ReleasePage/KeyValue.svelte";
    import ReList from "../../components/ReleasePage/ReList.svelte";
    import { SkeletonBlock, SkeletonText } from "@skeleton-elements/svelte";
    import { getDayTextById, getSeasonTextById } from "../../utils";
    import { Container, Button, Col, Row, Collapse, Badge } from "sveltestrap";
    import FreeSpace from "../../components/ReleasePage/FreeSpace.svelte";

    export let currentRoute;
    let releaseId = currentRoute.namedParams.releaseId;
    let isDescriptionOpen = false;
    let releaseInfo = { code: RCODE.LOADING, release: null };

    $: {
        releaseId = currentRoute.namedParams.releaseId;
        api.release.release(releaseId).then((r) => {
            releaseInfo = r;
            scroll(0, 0);
        });
        console.log("updated");
    }

    const clickTitleCallback = (dpEvent) => {
        const releaseId = dpEvent.detail.id;
        navigateTo(`/release/${releaseId}`);
    };
    const clickRelated = (_) => {
        console.log("related click");
        navigateTo(`/release_related/${releaseId}`);
    };
    const clickRecomends = (_) => {
        console.log("recomends click");
        navigateTo(`/release_recomends/${releaseId}`);
    };
</script>

<Container class="pt-3 pb-3">
    <span class="title">
        {#if releaseInfo.code !== RCODE.OK}
            <SkeletonText>
                {SKELETON_SMALL}
            </SkeletonText>
        {:else}
            {releaseInfo.release.title_ru}
            <Badge>{releaseInfo.release.category.name}</Badge>
        {/if}
    </span>
    <Row>
        <Col class="col-xxl-3 col-xl-4 col-lg-4 col-sm-12 col-12">
            <div class="poster_block">
                {#if releaseInfo.code !== RCODE.OK}
                    <SkeletonBlock style="height:400px;width:300px" />
                {:else}
                    <img
                        class="poster unselectable"
                        src={releaseInfo.release.image}
                        alt="постер"
                    />
                {/if}
            </div>
        </Col>
        <Col class="col-xxl-9 col-xl-8 col-lg-8 col-sm-12 col-12">
            <KeyValue key="Год выпуска:">
                {#if releaseInfo.code !== RCODE.OK}
                    <SkeletonText>{SKELETON_SMALL}</SkeletonText>
                {:else}
                    {getSeasonTextById(releaseInfo.release.season)},
                    {releaseInfo.release.year} г.
                {/if}
            </KeyValue>

            <KeyValue key="Жанр:">
                {#if releaseInfo.code !== RCODE.OK}
                    <SkeletonText>{SKELETON_BIG}</SkeletonText>
                {:else}
                    {#each releaseInfo.release.genres.split(",") as genre}
                        <div class="clickable" style="text-decoration:none;">
                            <Badge class="me-2 mb-1 mt-1" dark outline>
                                {genre.trim()}
                            </Badge>
                        </div>
                    {/each}
                {/if}
            </KeyValue>

            <KeyValue key="Об аниме:">
                {#if releaseInfo.code !== RCODE.OK}
                    <SkeletonText>{SKELETON_BIG}</SkeletonText>
                {:else}
                    {releaseInfo.release.country}, студия
                    <span class="clickable">{releaseInfo.release.studio}</span>,
                    автор
                    <span class="clickable">{releaseInfo.release.author}</span>,
                    режисер
                    <span class="clickable">{releaseInfo.release.director}</span
                    >
                {/if}
            </KeyValue>

            <KeyValue key="Категория:">
                {#if releaseInfo.code !== RCODE.OK}
                    <SkeletonText>{SKELETON_MEDIUM}</SkeletonText>
                {:else}
                    {releaseInfo.release.category.name}, выходит каждый
                    {getDayTextById(releaseInfo.release.broadcast)}
                {/if}
            </KeyValue>

            <KeyValue key="Серии:">
                {#if releaseInfo.code !== RCODE.OK}
                    <SkeletonText>{SKELETON_MEDIUM}</SkeletonText>
                {:else}
                    {releaseInfo.release.episodes_released} из
                    {releaseInfo.release.episodes_total} эп. по ~
                    {releaseInfo.release.duration} мин.
                {/if}
            </KeyValue>

            <Row class="mt-1">
                <Col class="col-md-6 col-12 mt-2">
                    <Button
                        block
                        outline
                        color="secondary"
                        on:click={() =>
                            (isDescriptionOpen = !isDescriptionOpen)}
                    >
                        Раскрыть описание
                    </Button>
                </Col>
                <Col class="col-md-6 col-12 mt-2">
                    <Button block color="primary">Смотреть</Button>
                </Col>
            </Row>
            <Collapse isOpen={isDescriptionOpen}>
                <span class="description mt-3">
                    {#if releaseInfo.code !== RCODE.OK}
                        <SkeletonText>{SKELETON_BIG}</SkeletonText>
                    {:else}
                        {releaseInfo.release.description}
                    {/if}
                </span>
            </Collapse>

            <Row>
                <Col class="col-md-6 col-12">
                    {#if releaseInfo.code === RCODE.OK && releaseInfo?.release?.related_releases.length != 0}
                        <div class="related_title_block">
                            <span class="related_title unselectable">
                                Связанные
                            </span>
                            <span
                                class="clickable unselectable"
                                style="white-space:nowrap;"
                                on:click={clickRelated}
                            >
                                показать все
                            </span>
                        </div>
                        <ReList
                            relatedList={releaseInfo.release.related_releases}
                            on:clickBlock={clickTitleCallback}
                            on:clickName={clickTitleCallback}
                        />
                    {:else if releaseInfo.code === RCODE.OK && releaseInfo?.release?.recommended_releases.length != 0}
                        <FreeSpace />
                    {/if}
                </Col>
                <Col class="col-md-6 col-12">
                    {#if releaseInfo.code === RCODE.OK && releaseInfo?.release?.recommended_releases.length != 0}
                        <div class="related_title_block">
                            <span class="related_title unselectable">
                                Рекомендуемые
                            </span>
                            <span
                                class="clickable unselectable"
                                style="white-space:nowrap;"
                                on:click={clickRecomends}
                            >
                                показать все
                            </span>
                        </div>
                        <ReList
                            relatedList={releaseInfo.release
                                .recommended_releases}
                            on:clickBlock={clickTitleCallback}
                            on:clickName={clickTitleCallback}
                        />
                    {:else if releaseInfo.code === RCODE.OK && releaseInfo?.release?.related_releases.length != 0}
                        <FreeSpace />
                    {/if}
                </Col>
            </Row>
            <!-- {releaseInfo.release.category.id}

                    {releaseInfo.release.grade}

                    {releaseInfo.release.status.id}

                    {releaseInfo.release.recommended_releases} -->
        </Col>
    </Row>
</Container>

<style>
    .related_title_block {
        margin-top: 2em;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .description {
        margin-top: 1em;
        font-size: 20px;
        color: rgb(161, 161, 161);
        display: block;
    }

    .title {
        display: block;
        font-size: 28px;
        margin-bottom: 1em;
    }
    .poster_block {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .poster {
        border-radius: 10px;
        max-height: 400px;
        max-width: 300px;
    }
    .related_title {
        font-weight: bold;
        font-size: 22px;
        color: rgb(161, 161, 161);
    }
</style>
