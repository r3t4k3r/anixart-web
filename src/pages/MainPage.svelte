<script lang="ts">
    import { onMount } from "svelte";
    import { api } from "../api/api";
    import { navigateTo } from 'svelte-router-spa'
    import { RCODE } from "../config";
    import { Container, Button, Col, Row } from "sveltestrap";
    import Interesting from "../components/MainPage/Interesting.svelte";
    import WatchNow from "../components/MainPage/WatchNow.svelte";
    import Collection from "../components/MainPage/Collection.svelte";

    let interesting = { code: RCODE.LOADING, content: null };
    let watchingNow = { code: RCODE.LOADING, content: null };
    let weekCollections = { code: RCODE.LOADING, content: null };

    onMount(() => {
        api.discover.interesting().then((r) => (interesting = r));
        api.discover.watching().then((r) => (watchingNow = r));
        api.collection.all().then((r) => (weekCollections = r));
    });

    const clickTitleCallback = (dpEvent) => {
        const releaseId = dpEvent.detail.id
        console.log(`/release/${releaseId}/`)
        navigateTo(`/release/${releaseId}/`)
    }
    const clickCollectionCallback = (dpEvent) => {
        const collectionId = dpEvent.detail.id
        navigateTo(`/collection/${collectionId}/`)
    }

</script>

<Interesting
    code={interesting.code}
    content={interesting.content}
    on:clickBlock={clickTitleCallback}
/>

<Container>
    <Row>
        <Col class="col-xxl-4 col-xl-4 col-lg-4 col-sm-6 col-6">
            <Button class="mt-3" block outline color="secondary">Популярное</Button>
        </Col>
        <Col class="col-xxl-4 col-xl-4 col-lg-4 col-sm-6 col-6">
            <Button class="mt-3" block outline color="secondary">Коллекции</Button>
        </Col>
        <Col class="col-xxl-4 col-xl-4 col-lg-4 col-sm-6 col-6">
            <Button class="mt-3" block outline color="secondary">Расписание</Button>
        </Col>
        <Col class="col-xxl-4 col-xl-4 col-lg-4 col-sm-6 col-6">
            <Button class="mt-3" block outline color="secondary">Онгоинги</Button>
        </Col>
        <Col class="col-xxl-4 col-xl-4 col-lg-4 col-sm-6 col-6">
            <Button class="mt-3" block outline color="secondary">Фильтр</Button>
        </Col>
        <Col class="col-xxl-4 col-xl-4 col-lg-4 col-sm-6 col-6">
            <Button class="mt-3" block outline color="secondary">Рандом</Button>
        </Col>
    </Row>

    <h1>Смотрят сейчас</h1>
    <WatchNow
        code={watchingNow.code}
        content={watchingNow.content}
        on:clickBlock={clickTitleCallback}
    />

    <h1>Коллекции недели</h1>
    <Collection
        code={weekCollections.code}
        content={weekCollections.content}
        on:clickBlock={clickCollectionCallback}
    />
</Container>

<style>
    h1 {
        margin-top: 1em;
    }
</style>
