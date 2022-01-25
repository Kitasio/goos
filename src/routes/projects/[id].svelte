<script lang="ts">
	import { items } from '$lib/data';
	import { page } from '$app/stores';
	import { Image } from 'svelte-aid';
	import Player from '$lib/components/Player.svelte';
	import Nav from '$lib/components/nav/Nav.svelte';
	import Youtube from '$lib/components/Youtube.svelte';
	import { onMount } from 'svelte';
	import { botActive, topActive } from '$lib/functions/utils';

	let id = $page.params.id;

	onMount(() => {
		$botActive = false;
		$topActive = false;
	});
	const toggleOff = () => {
		if ($topActive || $botActive) {
			$botActive = false;
			$topActive = false;
		}
	};
</script>

<Nav />
<div on:click={toggleOff} class="lg:grid grid-cols-4 w-full">
	<div
		class="mt-10 lg:my-10 p-5 lg:mx-0 col-span-1 lg:flex flex-col justify-between lg:border-r border-black"
	>
		<div class="fixed w-screen bottom-10 pr-10 lg:static lg:pr-0 lg:w-full">
			<div class="lg:mt-5 2xl:px-5 flex justify-between">
				<a
					href="/projects/{parseInt(id) == 0 ? items.projects.length - 1 : parseInt(id) - 1}"
					rel="external"
				>
					<div class="flex space-x-3 items-center cursor-pointer">
						<img class="w-5 h-5" src="/images/arrow-left.svg" alt="" />
					</div>
				</a>
				<a
					href="/projects/{parseInt(id) + 1 >= items.projects.length ? '0' : parseInt(id) + 1}"
					rel="external"
				>
					<img class="w-5 h-5 cursor-pointer" src="/images/arrow.svg" alt="" />
				</a>
			</div>
		</div>
		<div class=" 2xl:px-5">
			<h1 class="font-bt font-thin text-2xl leading-5">{items.projects[id].title}</h1>
			<div class="flex font-light flex-wrap leading-5 text-sm">
				{#each items.projects[id].tagNames as tag, index (index)}
					<span class="mr-1">{tag}</span>
				{/each}
			</div>
		</div>
	</div>

	{#if items.projects[id].video}
		<div class="px-5 pb-16 xl:px-20 2xl:px-32 col-span-3 lg:h-screen flex">
			<div class="w-full self-end aspect-video">
				<Youtube id={items.projects[id].video} />
			</div>
		</div>
	{:else if items.projects[id].localVideo}
		<div class="px-5 pb-16 xl:px-20 2xl:px-32 col-span-3 lg:h-screen flex">
			<div class="w-full self-end">
				<Player src={items.projects[id].localVideo} />
			</div>
		</div>
	{:else if items.projects[id].images.length == 1}
		<div class="px-5 pb-16 xl:px-20 2xl:px-32 col-span-3 lg:h-screen flex">
			<div class="w-full self-end">
				<Image src={items.projects[id].images[0]} classes={'w-full'} />
			</div>
		</div>
	{:else}
		<div
			class="px-5 pb-5 lg:py-10 space-y-5 col-span-3 lg:overflow-scroll lg:h-screen lg:max-w-screen-lg lg:mx-auto w-full"
		>
			{#each items.projects[id].images as i, index (index)}
				<div class="">
					<Image src={i} classes={'w-full'} />
				</div>
			{/each}
		</div>
	{/if}
</div>
