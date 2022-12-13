<script>
    import { GIFS_COUNT } from "../../config";
    let imgUrl = `/static/gifs/${Math.ceil(Math.random() * GIFS_COUNT)}.gif`;
</script>

<div class="block unselectable">
    <div>
        <img src={imgUrl} alt="заполнитель" />
        <div class="text">
            А может хватит аниме на сегодня?
        </div>
    </div>
</div>

<style>
    .text {
        font-weight: bold;
        font-size: 22px;
        color: rgb(161, 161, 161);
    }
    img {
        max-width: 100%;
        border-radius: 10px;
        opacity: 0.7;
    }
    .block {
        margin-top: 2em;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
    }
</style>
