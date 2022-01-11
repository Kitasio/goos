<script lang="ts">
	import Nav from '$lib/components/nav/Nav.svelte';
	import { white } from '$lib/functions/utils';
	import { people } from '$lib/people';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let w;
	$: if (w > 1024) goto('/team/gooseva');
	let loaded = false;
	let thisImage;

	export let parentClass = 'py-10';
	export let textClass = '';
	export let wrapperClass = 'lg:hidden';
	let items = people
	let triItems = [...items, ...items, ...items];
	onMount(() => {
		$white = false;
		items = [...items, ...items, ...items];
		for (let i = 0; i < triItems.length; i++) {
			triItems[i]['shown'] = false;
		}
		console.log(items);
		gsap.registerPlugin(ScrollTrigger);
		gsap.registerPlugin(ScrollToPlugin);
		gsap.to(window, {
			duration: 0,
			scrollTo: '#item' + Math.floor(items.length / 3).toString()
		});
		for (let i = 0; i < items.length; i++) {
			gsap.to(`#item${i}`, {
				duration: 0.5,
				color: 'white',
				scrollTrigger: {
					start: '-2px center',
					end: 'bottom center',
					trigger: `#item${i}`,
					toggleActions: 'restart reverse restart reverse',
					// snap: 0.5,
					onToggle: (self) => {
						triItems[i]['shown'] = self.isActive;
					}
				}
			});
		}
		thisImage.onload = () => {
			loaded = true;
		};
	});
</script>

<svelte:window bind:innerWidth={w} />
<!-- FOR JIT COMPILER -->
<div class="top-0 h-5 w-5 relative hidden h-full mx-5 2xl:w-80 2xl:h-80" />

<div class="top-0 fixed w-full z-10">
	<Nav />
</div>
<!-- <Scroller items={people} parentClass={'py-10'} wrapperClass={'lg:hidden'} /> -->

<div class="w-full border-t border-black {wrapperClass}">
	{#each triItems as i, index (index)}
		<div id="item{index}" class="relative border-b border-black {parentClass}">
			<a href={i.link}>
				{#key i['shown']}
					<img
						transition:fade={{ duration: 500 }}
						src={i.img}
						alt={i.text}
						class={i['shown']
							? 'absolute transition duration-500 opacity-100 w-full top-0 h-full object-cover'
							: 'absolute loaded transition duration-500 opacity-0 hidden w-full top-0 h-full object-cover'}
						class:loaded
						bind:this={thisImage}
						loading="lazy"
					/>
				{/key}
				<div class="flex justify-between mx-5">
					<div class="relative {textClass}">{i.text}</div>
					<svg
						class="fill-current text-white w-5 h-5 relative"
						xmlns="http://www.w3.org/2000/svg"
						fill="white"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</div>
			</a>
		</div>
	{/each}
</div>

<style>
	img {
		opacity: 0;
		transition: opacity 500ms ease-out;
	}
	img.loaded {
		opacity: 1;
	}
</style>
