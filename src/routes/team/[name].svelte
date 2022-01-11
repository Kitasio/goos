<script lang="ts">
	import { page } from '$app/stores';
	import Nav from '$lib/components/nav/Nav.svelte';
	import { Image } from 'svelte-aid';
	import { people } from '$lib/people';
	import { projects } from '$lib/teamProjects';
	import { onMount } from 'svelte';
	import Player from '$lib/components/Player.svelte';

	let projectOpen = false;
	let selectedProject = {};

	const openProj = (proj) => {
		projectOpen = true;
		selectedProject = proj;
	};

	const prevImg = () => {
		let items = selectedProject['images'];
		items = [items[items.length - 1], ...items.slice(0, items.length - 1)];
		selectedProject['images'] = items;
	};
	const nextImg = () => {
		let items = selectedProject['images'];
		items = [...items.slice(1, items.length), items[0]];
		selectedProject['images'] = items;
	};

	let person = {};
	let personProjects = [];
	onMount(() => {
		person = people.find((x) => x.link === '/team/' + $page.params.name);
		for (let i = 0; i < person['projects'].length; i++) {
			const proj = person['projects'][i];
			personProjects.push(projects.find((x) => x.link === '/team/projects/' + proj));
			personProjects = personProjects;
		}
	});
</script>


<div class="lg:hidden">
	<header
		class="h-[70vh] bg-cover bg-center"
		style="background-image: url({person['img']})"
	>
		<Nav />
	</header>
	<h1 class="text-center py-5 text-3xl tracking-wide font-medium border-t border-b border-black">
		{person['text'] || ''}
	</h1>
	<div class="flex flex-col space-y-5 p-5 border-b border-black">
		<h1 class="font-semibold text-sm leading-5 whitespace-pre-line">
			{person['profession'] || ''}
		</h1>
		<p class="text-sm whitespace-pre-line font-light">{@html person['about'] || ''}</p>
	</div>
	{#if personProjects}
		{#each personProjects as proj, index (index)}
			<a href={proj.link}>
				<div class="h-36 flex border-b border-black">
					<div class="w-5/12 font-bt text-sm self-center px-5">{proj.name}</div>
					<div class="w-7/12">
						<div class="w-full h-full overflow-hidden">
							<img
								class="object-cover w-full h-full"
								style="padding: {proj.style};"
								src={proj.mainImg}
								alt=""
							/>
						</div>
					</div>
				</div>
			</a>
		{/each}
	{/if}
</div>

<div class="hidden lg:block">
	<Nav />
</div>
<div class="hidden lg:grid grid-cols-4 h-screen py-10">
	<div class="border-r border-black col-span-1 p-5 2xl:p-10 flex space-x-8 xl:space-x-14">
		<h1 class="text-md font-medium">Стилисты</h1>
		<div>
			{#each people as i, index (index)}
				<a href={i.link} class="relative">
					<img
						class={'/team/' + $page.params.name === i.link ? 'absolute top-2 -left-7' : 'hidden'}
						src="/images/arrow.svg"
						alt=""
					/>
					<p
						class={'/team/' + $page.params.name == i.link
							? 'leading-7 underline font-light whitespace-nowrap'
							: 'leading-7 hover:underline font-light whitespace-nowrap'}
					>
						{i.text}
					</p>
				</a>
			{/each}
		</div>
	</div>
	<div class="relative col-span-3 p-5 2xl:p-10 flex flex-col justify-between space-y-5">
		{#if projectOpen}
			<div class="grid grid-cols-12 h-full">
				<div class="col-span-5 flex flex-col justify-between h-full">
					<div class="cursor-pointer" on:click={() => (projectOpen = false)}>Х Закрыть</div>
					<div class="font-bt text-4xl max-w-md whitespace-pre-line">{selectedProject['name']}</div>
				</div>
				{#if selectedProject['video']}
					<div class="col-span-7">
						<Player src={selectedProject['video']} />
					</div>
				{:else if selectedProject['ytid']}
					<div class="col-span-7">
						<iframe
							class="aspect-video w-full"
							src="https://www.youtube.com/embed/{selectedProject['ytid']}"
							title={selectedProject['name']}
						/>
					</div>
				{:else}
					<div class="col-span-7 space-y-5">
						<div class="flex justify-between">
							<div class="cursor-pointer" on:click={prevImg}>
								<img class="w-5 h-5" src="/images/arrow-left.svg" alt="" />
							</div>
							<div class="cursor-pointer" on:click={nextImg}>
								<img class="w-5 h-5" src="/images/arrow.svg" alt="" />
							</div>
						</div>
						{#if selectedProject['images']}
							<Image src={selectedProject['images'][0]} alt="" classes={'mx-auto max-h-[70vh]'} />
						{/if}
					</div>
				{/if}
			</div>
		{:else}
			<div>
				<h1 class="text-4xl tracking-wide">{person['text']}</h1>
				<div class="mt-10 flex justify-between">
					<p class="font-light whitespace-pre-line max-w-lg 2xl:max-w-2xl leading-5">
						{@html person['about']}
					</p>
					<Image src={person['img']} classes="object-cover w-64 h-64"/>
				</div>
			</div>
			<div class="flex flex-wrap gap-3">
				{#each personProjects as i, index (index)}
					<div class="cursor-pointer flex max-w-xs" on:click={() => openProj(i)}>
						<Image src={i['mainImg']} classes={'grow object-cover h-32 w-full max-w-sm'} />
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
