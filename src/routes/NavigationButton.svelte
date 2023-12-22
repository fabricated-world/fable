<script>
    export let name = "Home"
    export let path = "/"
</script>

<style>
    a {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>

<a href={path}>{name}</a>
