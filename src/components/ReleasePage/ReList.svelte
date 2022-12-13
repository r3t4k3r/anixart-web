<script>
    import TitleInline from '../TitleInline.svelte'
    export let relatedList
</script>

{#each relatedList.slice(0, 3) as title (title['id']) }
    <TitleInline
        name={title.title_ru}
        id={title.id}
        image={title.image}
        year={title.year}
        categoryName={title.category.name}
        grade={title.grade}
        on:clickBlock
        on:clickName
    />
{/each}