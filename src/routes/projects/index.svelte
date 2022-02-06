<script lang="ts">
	import Filter from '$lib/components/Filter.svelte';
	import { fade, fly } from 'svelte/transition';
	import Nav from '$lib/components/nav/Nav.svelte';
	import { showFilter } from '$lib/functions/utils';
	import { items } from '$lib/data'
	import { lvl1, lvl2, lvl3 } from '$lib/functions/utils';
	import { Image } from 'svelte-aid';
	import { onMount } from 'svelte';

	const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

	onMount(() => {
		$showFilter = true;
		items.projects = items.projects.sort((a, b) => a.order - b.order)

		// gsap.registerPlugin(ScrollTrigger);
		// for (let i = 0; i < items.projects.length; i++) {
		// 	const pt = Math.floor(Math.random() * 100);
		// 	const pr = Math.floor(Math.random() * 100);
		// 	const pb = Math.floor(Math.random() * 100);
		// 	const pl = Math.floor(Math.random() * 100);
		// 	gsap.to(`#img${i}`, {
		// 		duration: 1,
		// 		ease: "power1.inOut",
		// 		paddingTop: pt,
		// 		paddingRight: pr,
		// 		paddingBottom: pb,
		// 		paddingLeft: pl,
		// 		delay: 0.2,
		// 		scrollTrigger: {
		// 			trigger: `#img${i}`,
		// 		}
		// 	})
		// }
	})
</script>

<Nav />
<div>
	<div
		on:click={() => ($showFilter = !$showFilter)}
		class="flex mt-10 fixed w-full bg-white z-40 lg:hidden justify-between items-center px-5 py-5 border-b border-t border-black flex-auto"
	>
		<h1>Навигация по проектам</h1>
		<p class="mt-1">
			<img
				class={$showFilter ? 'rotate-90 transition' : '-rotate-90 transition'}
				src="/images/arrow.svg"
				alt="arrow"
			/>
		</p>
	</div>
	{#if $showFilter}
		<div transition:fly={{ x: -20, duration: 200 }} class="fixed w-full mt-[102px] lg:mt-0 border-black lg:border-t z-10">
			<Filter
				on:$lvl1Change={(e) => ($lvl1 = e.detail)}
				on:$lvl2Change={(e) => ($lvl2 = e.detail)}
				on:$lvl3Change={(e) => ($lvl3 = e.detail)}
			/>
		</div>
	{/if}
	{#key $lvl1 || $lvl2 || $lvl3}
		<div
			in:fade
			class={$showFilter ? "pt-[102px] lg:pt-[136px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:my-10": "pt-[102px] lg:pt-0 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:my-10"}
		>
			{#each items.projects as i, index (index)}
				{#if (i.tags.some( (e) => $lvl1.includes(capitalize(e)) ) || !$lvl1.length) && (i.tags.some( (e) => $lvl2.includes(capitalize(e)) ) || !$lvl2.length) && (i.tags.some( (e) => $lvl3.includes(capitalize(e)) ) || !$lvl3.length)}
					<div class="border-b border-r border-black sm:aspect-square group">
						<div class="w-full h-96 sm:h-full relative">
							<a class="transition duration-200 w-full h-96 sm:h-full" href={`projects/${index}`}>
								<div id="img{index}" class="img-anim w-full h-96 sm:h-full {i.classes}" style="padding: {i.style}">
									<Image src={i.mainImg} classes={`w-full h-full object-cover ${i.classes}`} />
									<div class="absolute top-0 left-0 w-full h-full group-hover:shadow-border transition duration-200"></div>
									<div class="absolute text-center font-bt p-3 text-sm bottom-0 left-0 w-full bg-white border-t-[3px] border-l-2 border-b-2 border-r-2 border-black opacity-0 group-hover:opacity-100 transition duration-200">
										{i.title}
									</div>
								</div>
							</a>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	{/key}
</div>
