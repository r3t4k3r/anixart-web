<script lang="ts">
    import { CORS_BYPASS_SERVER, USER_AGENT } from "../config";
    import { onMount } from "svelte";
    import { Swiper, SwiperSlide } from "swiper/svelte";
    import { Autoplay } from "swiper";
    import { SkeletonBlock } from "@skeleton-elements/svelte";
    import { Col, Row } from "sveltestrap";
    import { Container } from "sveltestrap";

    let recomendations = [];
    let watchingNow = [];
    let weekCollections = [];

    onMount(() => {
        getRecomendations();
        getWatchingNow();
        getWeekCollections();
    });

    async function getRecomendations() {
        const response = await fetch(
            `${CORS_BYPASS_SERVER}/https://api.anixart.tv/discover/interesting`,
            {
                method: "GET",
                headers: {
                    ua: USER_AGENT,
                },
            }
        );
        const json = await response.json();
        recomendations = json.content;
    }

    async function getWatchingNow() {
        const response = await fetch(
            `${CORS_BYPASS_SERVER}/https://api.anixart.tv/discover/watching/0`,
            {
                method: "GET",
                headers: {
                    ua: USER_AGENT,
                },
            }
        );
        const json = await response.json();
        watchingNow = json.content;
    }

    async function getWeekCollections() {
        const response = await fetch(
            `${CORS_BYPASS_SERVER}/https://api.anixart.tv/collection/all/-1?previous_page=0&where=2&sort=4`,
            {
                method: "GET",
                headers: {
                    ua: USER_AGENT,
                },
            }
        );
        const json = await response.json();
        weekCollections = json.content;
    }
</script>

<!-- Swiper -->
{#if recomendations.length === 0}
    <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={5}
        loop={true}
        class="mySwiper"
    >
        {#each new Array(3) as _}
            <SwiperSlide style="max-width: 700px;">
                <SkeletonBlock height="400px" style="border-radius: 10px;" />
            </SwiperSlide>
        {/each}
    </Swiper>
{:else}
    <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={5}
        loop={true}
        autoplay={{
            delay: 5000,
            disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        class="mySwiper"
    >
        {#each recomendations as title (title["@id"])}
            <SwiperSlide style="max-width: 700px;">
                <div class="image-div">
                    <img
                        src={title.image}
                        alt="Постер {title.title}"
                        class="image"
                    />
                    <div>
                        <h1>{title.title}</h1>
                        <p>{title.description}</p>
                    </div>
                </div>
            </SwiperSlide>
        {/each}
    </Swiper>
{/if}

<Container>
    <div style="font-size: 25px;">
        <Row>
            <Col>Популярное</Col>
            <Col>Расписание</Col>
        </Row>
        <Row>
            <Col>Коллекции</Col>
            <Col>Фильтр</Col>
        </Row>
        <Row>
            <Col>Онгоинги</Col>
            <Col>Рандом</Col>
        </Row>
    </div>

    <h1>Смотрят сейчас:</h1>
    {#if watchingNow.length === 0}
        <Swiper
            slidesPerView={"auto"}
            spaceBetween={5}
            freeMode={true}
            class="mySwiper"
        >
            {#each new Array(10) as _}
                <SwiperSlide style="max-width: 200px;">
                    <SkeletonBlock
                        height="260px"
                        style="border-radius: 10px;"
                    />
                </SwiperSlide>
            {/each}
        </Swiper>
    {:else}
        <Swiper
            slidesPerView={"auto"}
            spaceBetween={5}
            freeMode={true}
            class="mySwiper"
        >
            {#each watchingNow as title (title["@id"])}
                <SwiperSlide style="max-width: 200px;">
                    <div class="image-div">
                        <img
                            src={title.image}
                            alt="Постер {title.title_ru}"
                            class="image"
                            style="height: 260px;"
                        />
                        <div style="max-width: 160px">
                            <h1 style="font-size: 18px; word-break: break-word;bottom: 10px">{title.title_ru}</h1>
                        </div>
                    </div>
                </SwiperSlide>
            {/each}
        </Swiper>
    {/if}

    <h1>Коллекции недели:</h1>
    {#if weekCollections.length === 0}
        <Swiper
            slidesPerView={"auto"}
            spaceBetween={5}
            freeMode={true}
            class="mySwiper"
        >
            {#each new Array(3) as _}
                <SwiperSlide style="max-width: 600px;">
                    <SkeletonBlock style="border-radius: 10px;height: 200px" />
                </SwiperSlide>
            {/each}
        </Swiper>
    {:else}
        <Swiper
            slidesPerView={"auto"}
            spaceBetween={5}
            freeMode={true}
            class="mySwiper"
        >
            {#each weekCollections as title (title["@id"])}
                <SwiperSlide style="max-width: 600px;">
                    <div class="image-div">
                        <img
                            src={title.image}
                            alt="Постер {title.title}"
                            class="image"
                            style="height: 300px;"
                        />
                        <div style="max-width: 560px">
                            <h1 style="font-size: 24px;">{title.title}</h1>
                            {#if title.description.length !== 0}
                                <p style="word-break: break-word;">
                                    {title.description.substring(0, 64)}
                                    {#if title.description.length > 64}...{/if}
                                </p>
                            {/if}
                        </div>
                    </div>
                </SwiperSlide>
            {/each}
        </Swiper>
    {/if}
</Container>

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
</style>
