<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/gsap.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/ScrollTrigger.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/ScrollToPlugin.min.js"></script>
</svelte:head>

<div class="overflow-x-hidden">
	<slot />
</div>
