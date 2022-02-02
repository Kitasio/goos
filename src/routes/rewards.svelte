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
	let rewards = [
		'/images/rewards/1.png',
		'/images/rewards/2.png',
		'/images/rewards/3.jpg',
		'/images/rewards/4.png',
		'/images/rewards/5.png',
		'/images/rewards/6.png',
		'/images/rewards/7.png',
		'/images/rewards/8.png',
		'/images/rewards/9.png',
		'/images/rewards/10.png',
		'/images/rewards/11.png',
		'/images/rewards/12.png',
		'/images/rewards/13.png',
		'/images/rewards/14.png',
		'/images/rewards/15.png',
		'/images/rewards/16.png',
		'/images/rewards/17.png',
		'/images/rewards/18.png',
		'/images/rewards/19.png',
		'/images/rewards/20.png',
		'/images/rewards/21.png',
		'/images/rewards/22.jpg',
		'/images/rewards/23.png',
		'/images/rewards/24.png',
		'/images/rewards/25.png',
		'/images/rewards/26.png',
		'/images/rewards/27.png',
		'/images/rewards/28.png',
		'/images/rewards/29.png',
		'/images/rewards/30.png',
		'/images/rewards/31.png',
	];
</script>

<svelte:window bind:innerWidth={w} />

<Nav />
<div class="mt-10 pt-10 mx-5 text-xs">
	<p class="font-bold">Награды</p>
	<div class="mt-5 grid grid-cols-3 gap-5">
		{#each rewards as img, index (index)}
			<img class="w-full object-cover self-center" src={img} alt="" />
		{/each}
	</div>
</div>
