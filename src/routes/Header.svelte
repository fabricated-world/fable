<script>
    import Nav from "./NavigationButton.svelte";
</script>

<div class="w-screen h-28 grid grid-cols-3 black px-12 justify-between items-center border-gray-700 border-b">
    <div class="flex flex-row justify-start"><h2>fabricated.world</h2></div> 
    <div id="navbar-links" class="grid grid-flow-col gap-10 black justify-center items-center">
        <Nav name="Home" path="/"/>
        <Nav name="Blog" path="/blog"/>
        <Nav name="About" path="/about"/>
    </div>
    <div class="flex flex-row justify-end">
        [Theme toggle]
    </div>
</div>

