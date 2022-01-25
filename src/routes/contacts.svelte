<script lang="ts">
	import { goto } from '$app/navigation';
	import Nav from '$lib/components/nav/Nav.svelte';
	import { white } from '$lib/functions/utils';
	import { onMount } from 'svelte';
	onMount(() => {
		$white = false;
	});
	let w;
	$: if (w > 1024) goto('/');
</script>

<svelte:window bind:innerWidth={w} />

<Nav />
<div class="my-10 pt-10 mx-5 text-sm">
	<p class="font-bold">Анна Гусева</p>
	<p>+79099505999</p>
	<p>gooseva.style@gmail.com</p>

	<p class="mt-3">Instagram</p>
	<div>
			<a href="https://www.instagram.com/guseva_director" target="_blank" class="font-bold"
				>@guseva_director</a
			>
	</div>
	<div>
		<a href="https://www.instagram.com/gooseva_komanda" target="_blank" class="font-bold">@gooseva_komanda</a>
	</div>
</div>
