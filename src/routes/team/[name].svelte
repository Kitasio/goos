<script lang="ts">
	import { page } from '$app/stores';
	import Nav from '$lib/components/nav/Nav.svelte';
	import { Image } from 'svelte-aid';
	import { people } from '$lib/people';
	import { projects } from '$lib/teamProjects';
	import { onMount } from 'svelte';
	import Player from '$lib/components/Player.svelte';

	let projectOpen = false;
	let selectedProject = 0;

	const openProj = (index) => {
		projectOpen = true;
		selectedProject = index;
	};

	const prevProj = () => {
		if (selectedProject == 0) {
			selectedProject = personProjects.length - 1;
		} else {
			selectedProject -= 1;
		}
	};
	const nextProj = () => {
		if (selectedProject + 1 === personProjects.length) {
			selectedProject = 0;
		} else {
			selectedProject += 1;
		}
	};

	let person = {};
	let personProjects = [];
	onMount(() => {
		person = people.find((x) => x.link === '/team/' + $page.params.name);
		if (person['projects']) {
			for (let i = 0; i < person['projects'].length; i++) {
				const proj = person['projects'][i];
				personProjects.push(projects.find((x) => x.link === '/team/projects/' + proj));
				personProjects = personProjects;
			}
		}
	});
</script>

<div class="lg:hidden">
	<header class="h-[70vh] bg-cover bg-center" style="background-image: url({person['img']})">
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
	<div class="border-r border-black col-span-1 p-5 2xl:p-10">
		<!-- <div> -->
			<h1 class="text-md font-medium fixed">Стилисты</h1>
			<div class="fixed ml-28 xl:ml-32">
				{#each people as i, index (index)}
					<a href={i.link} target="_self" class="relative flex">
						<img
							class={'/team/' + $page.params.name === i.link
								? 'w-4 absolute top-2 -left-7'
								: 'hidden w-4'}
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
		<!-- </div> -->
	</div>
	<div class="relative col-span-3 p-5 2xl:p-10 flex flex-col justify-between space-y-5">
		{#if projectOpen}
			<div class="grid grid-cols-12 h-full">
				<div class="col-span-5 flex flex-col  h-full">
					<div class="cursor-pointer font-light fixed" on:click={() => (projectOpen = false)}>
						Закрыть
					</div>
					<div class="font-bt text-3xl max-w-md whitespace-pre-line fixed bottom-16">
						{personProjects[selectedProject]['name']}
					</div>
				</div>
				<div class="col-span-7 space-y-5">
					<div class="flex justify-between">
						<div class="cursor-pointer" on:click={prevProj}>
							<img class="w-5 h-5" src="/images/arrow-left.svg" alt="" />
						</div>
						<div class="cursor-pointer" on:click={nextProj}>
							<img class="w-5 h-5" src="/images/arrow.svg" alt="" />
						</div>
					</div>
					{#if personProjects[selectedProject]['video']}
						<Player src={personProjects[selectedProject]['video']} />
					{:else if personProjects[selectedProject]['ytid']}
						<iframe
							class="aspect-video w-full"
							src="https://www.youtube.com/embed/{personProjects[selectedProject]['ytid']}"
							title={personProjects[selectedProject]['name']}
						/>
					{:else if personProjects[selectedProject]['images']}
						{#each personProjects[selectedProject]['images'] as img}
							<Image src={img} alt="" classes={'mx-auto w-full object-cover max-h-[70vh]'} />
						{/each}
					{/if}
				</div>
			</div>
		{:else}
			<div>
				<h1 class="text-4xl tracking-wide">{person['text'] || ''}</h1>
				<div class="mt-10 flex justify-between">
					<p class="font-light whitespace-pre-line max-w-lg 2xl:max-w-2xl leading-5">
						{@html person['about'] || ''}
					</p>
					<Image src={person['img']} classes="object-cover w-64 h-64" />
				</div>
			</div>
			<div class="flex flex-wrap items-start gap-3">
				{#if personProjects}
					{#each personProjects as i, index (index)}
						<div class="cursor-pointer" on:click={() => openProj(index)}>
							<Image src={i['mainImg']} classes={'object-cover h-24'} />
						</div>
					{/each}
				{/if}
			</div>
		{/if}
	</div>
</div>
