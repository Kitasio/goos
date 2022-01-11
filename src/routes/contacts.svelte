<script lang="ts">
	import { goto } from '$app/navigation';
	import Nav from '$lib/components/nav/Nav.svelte';
	import { white } from '$lib/functions/utils';
	import { onMount } from 'svelte';
	onMount(() => {
		$white = false;
	});
	let w;
	$: if (w > 640) goto('/');
</script>

<svelte:window bind:innerWidth={w} />

<Nav />
<div class="my-10 pt-10 mx-5 text-sm">
	<p class="font-bold">Анна Гусева</p>
	<p>+79099505999</p>
	<p>gooseva.style@gmail.com</p>

	<p class="mt-3">Instagram</p>
	<p class="font-bold">@guseva_stylist</p>
	<p class="font-bold">@gooseva_komanda</p>
	<p class="mt-3">
		Если вы&nbsp;хотите присоединиться к&nbsp;нашей команде, поделиться новостями или просто
		познакомиться с&nbsp;нами, напишите на&nbsp;goosevastyle@gmail.com
	</p>
</div>
