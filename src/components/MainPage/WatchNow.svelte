<script>
    import { RCODE } from "../../config";
    import { Swiper, SwiperSlide } from "swiper/svelte";
    import Title from "../Title.svelte";

    export let code = RCODE.LOADING;
    export let content = null;
</script>

{#if code === RCODE.LOADING}
    <Swiper
        slidesPerView={"auto"}
        spaceBetween={5}
        freeMode={true}
        class="mySwiper"
        grabCursor={true}
    >
        {#each new Array(10) as _}
            <SwiperSlide style="max-width:300px;">
                <Title type="normal" />
            </SwiperSlide>
        {/each}
    </Swiper>
{:else if code === RCODE.OK}
    <Swiper
        slidesPerView={"auto"}
        spaceBetween={5}
        freeMode={true}
        class="mySwiper"
        grabCursor={true}
    >
        {#each content as title (title["@id"])}
            <SwiperSlide style="max-width:300px;">
                <Title
                    on:clickBlock
                    on:clickDescription
                    on:clickName
                    type="normal"
                    image={title.image}
                    name={title.title_ru}
                    id={title.id}
                />
            </SwiperSlide>
        {/each}
    </Swiper>
{/if}
