<script>
	import "swiper/css";
	import "swiper/css/pagination";

	import Navbar from "./components/Navbar.svelte";
	import { Router } from "svelte-router-spa";
	import { routes } from "./routes";
	import { Container } from "sveltestrap";
</script>

<Navbar />
<Container>
	<Router {routes} />
</Container>
