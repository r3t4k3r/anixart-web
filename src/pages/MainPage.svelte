<script lang="ts">
    import { CORS_BYPASS_SERVER, USER_AGENT } from "../config";
    import { onMount } from "svelte";
    import { Swiper, SwiperSlide } from "swiper/svelte";
    import { Autoplay } from "swiper";
    import { SkeletonBlock } from '@skeleton-elements/svelte';

    let recomendations = [];

    onMount(async () => {
        recomendations = await getRecomendations();
    });

    async function getRecomendations() {
        const response = await fetch(
            `${CORS_BYPASS_SERVER}/https://api.anixart.tv/discover/interesting`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    ua: USER_AGENT,
                },
            }
        );
        const json = await response.json();
        return json.content;
    }
</script>

{#if recomendations.length === 0}
    <SkeletonBlock effect="blink" height="400px" style="border-radius: 10px;"/>
{:else}
    <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={5}
        loop={true}
        autoplay={{
            delay: 3000,
            disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        class="mySwiper"
    >
        {#each recomendations as title (title["@id"])}
            <SwiperSlide>
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
                <!-- {title.title} -->
            </SwiperSlide>
        {/each}
    </Swiper>
{/if}

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
        bottom: 20px;
        left: 20px;
        width: 100%;
    }
</style>
