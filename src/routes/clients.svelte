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
	let images = [
		'/images/companies/cian.png',
		'/images/companies/lg.png',
		'/images/companies/mega.png',
		'/images/companies/samsung.png',
		'/images/companies/cian.png',
		'/images/companies/lg.png',
		'/images/companies/mega.png',
		'/images/companies/samsung.png',
		'/images/companies/cian.png',
		'/images/companies/lg.png',
		'/images/companies/mega.png',
		'/images/companies/samsung.png',
		'/images/companies/cian.png',
		'/images/companies/lg.png',
		'/images/companies/mega.png',
		'/images/companies/samsung.png'
	];
</script>

<svelte:window bind:innerWidth={w} />

<Nav />
<div class="my-10 pt-10 mx-5 text-sm">
	<p class="font-bold">Артисты и селебрити</p>
	<p class="font-normal mt-5 2xl:whitespace-pre-line">
		Sati Kazanova, ZVENTA SVENTANA, VOLEN SENTIR, Директор Всего, группа Fruktы, Krassna, Dr.
		Krivorotov, Анна Хилькевич, Sunsay, Елка, Burito, Velvet Music, ALAMPA, Ляйсан Утяшева, Полина
		Максимова, Егор Корешков, Женя Борзых, CБПЧ, TINAVIE, Тимур Соловьев, Нюша, Nonative, Rayda,
		Indablack, Варнава, Manizha
	</p>
	<p class="font-bold mt-5">Медиа и журналы</p>
	<p class="mt-5 font-normal 2xl:whitespace-pre-line">
		РБК, GLAMOUR, Wonderzine, HIPO , SNC, MarieСlaire
	</p>
	<p class="font-bold mt-5">Бренды и компании</p>
	<div class="mt-5 grid grid-cols-6">
		{#each images as img, index (index)}
			<img class="w-16 object-cover" src={img} alt="" />
		{/each}
	</div>
</div>
