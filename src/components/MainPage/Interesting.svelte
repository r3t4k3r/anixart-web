<script>
    import { Swiper, SwiperSlide } from "swiper/svelte";
    import { RCODE } from "../../config";
    import Title from "../Title.svelte";
    import { Autoplay } from "swiper";

    export let code = RCODE.LOADING;
    export let content = null;
</script>

{#if code === RCODE.LOADING}
    <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={5}
        class="mySwiper"
    >
        {#each new Array(3) as _}
            <SwiperSlide style="max-width:800px;">
                <Title type="wide" />
            </SwiperSlide>
        {/each}
    </Swiper>
{:else if code === RCODE.OK}
    <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={5}
        autoplay={{
            delay: 3000,
            disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        pagination={true} 
        class="mySwiper"
    >
        {#each content as title (title["@id"])}
            {#if title.is_hidden === false}
                <SwiperSlide style="max-width:800px;">
                    <Title
                        on:clickBlock
                        on:clickDescription
                        on:clickName
                        name={title.title}
                        description={title.description}
                        image={title.image}
                        id={title.action}
                        type={"wide"}
                    />
                </SwiperSlide>
            {/if}
        {/each}
    </Swiper>
{/if}
