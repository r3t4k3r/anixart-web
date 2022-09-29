<script>

	import "swiper/css";
	import "swiper/css/pagination";

	import Navbar from "./components/Navbar.svelte";
	import { Router } from "svelte-router-spa";
	import { routes } from "./routes";
</script>

<Navbar />

<Router {routes} />
