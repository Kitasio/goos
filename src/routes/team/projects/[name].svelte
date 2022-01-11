<script lang="ts">
	import { page } from '$app/stores';
	import { Image } from 'svelte-aid';
	import Nav from '$lib/components/nav/Nav.svelte';
	import { goto } from '$app/navigation';
	import { projects } from '$lib/teamProjects';
	import { onMount } from 'svelte';
	import Player from '$lib/components/Player.svelte';

	let w;
	$: if (w > 1024) goto('/team/gooseva');

	let project = {};
	onMount(() => {
		project = projects.find((x) => x.link === '/team/projects/' + $page.params.name);
	});
</script>

<svelte:window bind:innerWidth={w} />

<Nav />
<div class="px-5 my-10">
	{#if project['images']}
		<h1 class="py-10 font-bt font-thin whitespace-pre-line text-xl">{project['name'] || ''}</h1>
		<div class="space-y-5">
			{#each project['images'] as img, index (index)}
				<Image src={img} />
			{/each}
		</div>
	{:else if project['video']}
		<h1 class="py-10 font-bt font-thin whitespace-pre-line text-xl">{project['name'] || ''}</h1>
		<div>
			<Player src={project['video']} />
		</div>
	{:else if project['ytid']}
		<h1 class="py-10 font-bt font-thin whitespace-pre-line text-xl">{project['name'] || ''}</h1>
		<iframe
			class="aspect-video"
			src="https://www.youtube.com/embed/{project['ytid']}"
			title={project['name']}
		/>
	{/if}
</div>
