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
	let rewards = [
		'/images/rewards/reward1.png',
		'/images/rewards/reward1.png',
		'/images/rewards/reward1.png',
		'/images/rewards/reward1.png',
		'/images/rewards/reward1.png',
		'/images/rewards/reward1.png',
		'/images/rewards/reward1.png',
		'/images/rewards/reward1.png',
		'/images/rewards/reward1.png',
		'/images/rewards/reward1.png',
		'/images/rewards/reward1.png',
		'/images/rewards/reward1.png',
		'/images/rewards/reward1.png'
	];
</script>

<svelte:window bind:innerWidth={w} />

<Nav />
<div class="mt-10 pt-10 mx-5 text-xs">
	<p class="font-bold">Награды</p>
	<div class="mt-5 grid grid-cols-3 gap-3">
		{#each rewards as img, index (index)}
			<img class="w-full object-cover" src={img} alt="" />
		{/each}
	</div>
</div>
