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
            <SwiperSlide style="max-width:600px;">
                <Title type="collection" />
            </SwiperSlide>
        {/each}
    </Swiper>
{:else if code === RCODE.OK}
    <Swiper
        slidesPerView={"auto"}
        spaceBetween={5}
        freeMode={false}
        class="mySwiper"
        grabCursor={true}
    >
        {#each content as title (title["@id"])}
            <SwiperSlide style="max-width:600px;">
                <Title
                    on:clickBlock
                    on:clickDescription
                    on:clickName
                    type="collection"
                    image={title.image}
                    name={title.title}
                    description={title.description}
                    id={title.id}
                />
            </SwiperSlide>
        {/each}
    </Swiper>
{/if}
