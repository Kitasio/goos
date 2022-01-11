<script>
	import Nav from '$lib/components/nav/Nav.svelte';
	import { fade } from 'svelte/transition';
	import { Image } from 'svelte-aid';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import Ticker from '$lib/components/Ticker.svelte';
	import { listForTicker, topActive, botActive } from '$lib/functions/utils';
	import { browser } from '$app/env';

	let white = true;
	let item = 1;
	let time;
	let hover = (isWhite, num) => {
		clearTimeout(time);
		time = setTimeout(() => {
			white = isWhite;
			item = num;
		}, 400);
	};

	onMount(() => {
		if (browser && window.innerWidth < 1024) {
			const tl = gsap.timeline({ repeat: 5 });
			tl.to('.img2', { duration: 1, opacity: 1, delay: 3, onStart: () => (white = false) });
			tl.to('.img1', { duration: 1, opacity: 0 }, '-=1');
			tl.to('.img3', { duration: 1, opacity: 1, delay: 3, onStart: () => (white = true) });
			tl.to('.img2', { duration: 1, opacity: 0 }, '-=1');
			tl.to('.img4', { duration: 1, opacity: 1, delay: 3, onStart: () => (white = false) });
			tl.to('.img3', { duration: 1, opacity: 0 }, '-=1');
			tl.to('.img1', { duration: 1, opacity: 1, delay: 3, onStart: () => (white = true) });
			tl.to('.img4', { duration: 1, opacity: 0 }, '-=1');
		}
	});

	const toggleOff = () => {
		if ($topActive || $botActive) {
			$botActive = false;
			$topActive = false;
		}
	};
</script>

<div class="h-screen flex flex-col justify-between">
	<Ticker
		items={listForTicker}
		classWrapper={'fixed flex h-screen items-center z-10 lg:bottom-12 lg:h-auto'}
		classParent={'space-x-1.5 font-bt'}
		classChild={white ? 'inline-block text-white' : 'inline-block'}
		durationMobile={'160s'}
		duration={'140s'}
	/>
	<div class="z-40">
		<Nav {white} />
		{#if white}
			<div in:fade class="pb-5 px-2 pt-20 lg:py-16 z-10">
				<img on:click={toggleOff} class="w-full" src="/images/logo/goos_white.svg" alt="" />
			</div>
		{:else}
			<div in:fade class="pb-5 px-2 pt-20 lg:py-16 z-10">
				<img on:click={toggleOff} class="w-full" src="/images/logo/goos.svg" alt="" />
			</div>
		{/if}
	</div>
	{#if white}
		<div in:fade class="pb-5 px-2 lg:py-16 mb-2 z-10">
			<img on:click={toggleOff} class="w-full" src="/images/logo/kom_white.svg" alt="" />
		</div>
	{:else}
		<div on:click={toggleOff} in:fade class="pb-5 px-2 lg:py-16 mb-2 z-10">
			<img class="w-full" src="/images/logo/kom.svg" alt="" />
		</div>
	{/if}

	<div class="lg:hidden absolute w-full h-full">
		<div class="img1 w-full object-cover h-screen absolute top-0 opacity-1">
			<Image
				srcMobile={'/images/index/1Mobile.jpg'}
				src={'/images/index/1.jpg'}
				alt={'main image'}
				classes={'w-full object-cover h-screen absolute top-0'}
			/>
		</div>
		<div
			class="img2 absolute w-full h-screen flex items-center justify-end overflow-hidden opacity-0"
		>
			<div class="flex flex-col md:flex-row overflow-hidden">
				<Image src={'/images/index/2.1.jpg'} classes={'ml-28 mt-20 md:m-0 object-cover'} />
				<Image classes="object-cover" src={'/images/index/2.2.jpg'} />
			</div>
		</div>
		<div class="img4 absolute w-full h-screen flex items-center justify-center opacity-0">
			<img src="/images/index/4.jpg" alt="" />
		</div>
		<img
			src="/images/index/3.jpg"
			alt=""
			class="img3 w-full object-cover h-screen absolute top-0 opacity-0"
		/>
	</div>
	<div on:click={toggleOff} class="hidden lg:grid grid-cols-3 absolute w-full h-full">
		{#if item == 1}
			<div
				transition:fade={{ duration: 100 }}
				class="img1 w-full object-cover h-screen absolute top-0 opacity-1"
			>
				<Image
					srcMobile={'/images/index/1Mobile.jpg'}
					src={'/images/index/1.jpg'}
					alt={'main image'}
					classes={'w-full object-cover h-screen absolute top-0'}
				/>
			</div>
		{:else if item == 2}
			<div
				transition:fade={{ duration: 100 }}
				class="img2 absolute w-full h-screen flex items-center justify-end overflow-hidden opacity-1"
			>
				<div class="flex flex-col md:flex-row overflow-hidden">
					<Image src={'/images/index/2.1.jpg'} classes={'ml-28 mt-20 md:m-0 object-cover'} />
					<Image classes="object-cover" src={'/images/index/2.2.jpg'} />
				</div>
			</div>
		{:else if item == 3}
			<div
				transition:fade={{ duration: 100 }}
				class="img4 absolute w-full h-screen flex items-center justify-center opacity-1"
			>
				<img src="/images/index/4.jpg" alt="" />
			</div>
		{:else if item == 4}
			<img
				transition:fade={{ duration: 100 }}
				src="/images/index/3.jpg"
				alt=""
				class="img3 w-full object-cover h-screen absolute top-0 opacity-1"
			/>
		{/if}
	</div>
</div>

<div
	on:click={toggleOff}
	class={$topActive || $botActive
		? 'hidden'
		: 'hidden lg:grid grid-cols-2 absolute w-full h-5/6 z-40 top-10'}
>
	<div on:mouseenter={() => hover(true, 1)} />
	<div on:mouseenter={() => hover(false, 2)} />
	<div on:mouseenter={() => hover(false, 3)} />
	<div on:mouseenter={() => hover(true, 4)} />
</div>
