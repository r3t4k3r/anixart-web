<script lang="ts">
    import { CORS_BYPASS_SERVER, USER_AGENT } from "../config";
    import { onMount } from "svelte";
    import { Swiper, SwiperSlide } from "swiper/svelte";
    import { Autoplay } from "swiper";

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

<Swiper
    slidesPerView={"auto"}
    centeredSlides={true}
    spaceBetween={5}
    rewind={true}
    autoplay={true}
    modules={[Autoplay]}
    class="mySwiper"
>
    {#each recomendations as title (title["@id"])}
        <SwiperSlide>
            <div class="image-div">
                <img src={title.image} alt="123" class="image" />
                <div>
                    <h1>{title.title}</h1>
                    <p>{title.description}</p>
                </div>
            </div>
            <!-- {title.title} -->
        </SwiperSlide>
    {/each}
</Swiper>
<style>
    .image-div {
        width: 100%;
        position: relative;
        background-color:#000;
        border-radius: 10px;
    }
    .image {
        width: 100%;
        height: 400px;
        border-radius: 10px;
        opacity: 0.6;
        background-color:#000;
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
