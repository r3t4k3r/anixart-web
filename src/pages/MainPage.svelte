<script lang="ts">
    import { CORS_BYPASS_SERVER, USER_AGENT } from "../config";
    import { onMount } from "svelte";
    import { Swiper, SwiperSlide } from "swiper/svelte";
    import { Autoplay } from "swiper";
    import Title from "../components/Title.svelte";
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

    function on_click_intresting(event) {
        console.log(event)
    }
</script>

<!-- Swiper -->
{#if recomendations.length === 0}
    <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={5}
        class="mySwiper"
    >
        {#each new Array(3) as _}
            <SwiperSlide style="max-width: 700px;">
                <Title height="400px" />
            </SwiperSlide>
        {/each}
    </Swiper>
{:else}
    <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={5}
        autoplay={{
            delay: 3000,
            disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        class="mySwiper"
    >
        {#each recomendations as title (title["@id"])}
            <SwiperSlide style="max-width: 700px;">
                <Title
                    on:clickName={on_click_intresting}
                    name={title.title == "" ? "Перейти к просмотру" : title.title}
                    description={title.description}
                    image={title.image}
                    id={title.action}
                />
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
                    <Title height="260px" />
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
                    <Title
                        height="260px"
                        width="200px"
                        image={title.image}
                        name={title.title_ru}
                        id={title.id}
                    />
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
                    <Title height="300px" />
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
                    <Title
                        height="300px"
                        image={title.image}
                        name={title.title}
                        description={title.description}
                        id={title.id}
                    />
                </SwiperSlide>
            {/each}
        </Swiper>
    {/if}
</Container>

<style>
    h1 {
        margin-top: 1em;
    }
</style>