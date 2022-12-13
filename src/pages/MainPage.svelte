<script lang="ts">
    import { onMount } from "svelte";
    import { api } from "../api/api";

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

    const clickInterestingTitleCallback = (event) =>
        console.log("event:", event);
</script>

<Interesting
    code={interesting.code}
    content={interesting.content}
    on:clickBlock={clickInterestingTitleCallback}
/>

<Container>
    <Row>
        <Col class="col-xxl-4 col-xl-4 col-lg-4 col-sm-6 col-6">
            <Button class="mt-3" block outline color="dark">Популярное</Button>
        </Col>
        <Col class="col-xxl-4 col-xl-4 col-lg-4 col-sm-6 col-6">
            <Button class="mt-3" block outline color="dark">Коллекции</Button>
        </Col>
        <Col class="col-xxl-4 col-xl-4 col-lg-4 col-sm-6 col-6">
            <Button class="mt-3" block outline color="dark">Расписание</Button>
        </Col>
        <Col class="col-xxl-4 col-xl-4 col-lg-4 col-sm-6 col-6">
            <Button class="mt-3" block outline color="dark">Онгоинги</Button>
        </Col>
        <Col class="col-xxl-4 col-xl-4 col-lg-4 col-sm-6 col-6">
            <Button class="mt-3" block outline color="dark">Фильтр</Button>
        </Col>
        <Col class="col-xxl-4 col-xl-4 col-lg-4 col-sm-6 col-6">
            <Button class="mt-3" block outline color="dark">Рандом</Button>
        </Col>
    </Row>

    <h1>Смотрят сейчас</h1>
    <WatchNow code={watchingNow.code} content={watchingNow.content} />

    <h1>Коллекции недели</h1>
    <Collection code={weekCollections.code} content={weekCollections.content} />
</Container>

<style>
    h1 {
        margin-top: 1em;
    }
</style>
