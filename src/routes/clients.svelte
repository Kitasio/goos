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

	let media = [
		'/images/media/1.png',
		'/images/media/2.png',
		'/images/media/3.png',
		'/images/media/4.png',
		'/images/media/5.png',
		'/images/media/6.png',
		'/images/media/7.png',
		'/images/media/8.png',
		'/images/media/9.png',
		'/images/media/10.png',
		'/images/media/11.png',
		'/images/media/12.png',
		'/images/media/13.png',
		'/images/media/14.png',
		'/images/media/15.png',
		'/images/media/16.jpeg',
		'/images/media/17.png',
		'/images/media/18.png',
		'/images/media/19.png',
		'/images/media/20.png',
		'/images/media/21.png',
	]
	let images = [
		'/images/companies/1.png',
		'/images/companies/2.png',
		'/images/companies/3.png',
		'/images/companies/4.png',
		'/images/companies/5.webp',
		'/images/companies/6.png',
		'/images/companies/7.jpeg',
		'/images/companies/8.png',
		'/images/companies/9.png',
		'/images/companies/10.png',
		'/images/companies/11.png',
		'/images/companies/12.png',
		'/images/companies/13.png',
		'/images/companies/14.png',
		'/images/companies/15.png',
		'/images/companies/16.png',
		'/images/companies/17.png',
		'/images/companies/18.png',
		'/images/companies/19.png',
		'/images/companies/20.png',
		'/images/companies/21.png',
		'/images/companies/22.png',
		'/images/companies/23.svg',
		'/images/companies/24.png',
		'/images/companies/25.png',
		'/images/companies/26.png',
		'/images/companies/27.png',
		'/images/companies/28.png',
		'/images/companies/29.png',
		'/images/companies/30.png',
		'/images/companies/31.png',
		'/images/companies/32.png',
		'/images/companies/33.png',
		'/images/companies/34.png',
		'/images/companies/35.png',
		'/images/companies/36.png',
		'/images/companies/37.png',
		'/images/companies/38.png',
		'/images/companies/39.png',
		'/images/companies/40.png',
		'/images/companies/41.png',
		'/images/companies/42.png',
		'/images/companies/43.png',
		'/images/companies/44.png',
		'/images/companies/45.png',
		'/images/companies/46.svg',
		'/images/companies/47.png',
		'/images/companies/48.png',
		'/images/companies/49.png',
		'/images/companies/50.png',
		'/images/companies/51.png',
		'/images/companies/52.png',
		'/images/companies/53.png',
		'/images/companies/54.jpg',
		'/images/companies/55.png',
		'/images/companies/56.png',
		'/images/companies/57.png',
		'/images/companies/58.png',
		'/images/companies/59.png',
		'/images/companies/60.png',
		'/images/companies/61.png',
		'/images/companies/62.png',
		'/images/companies/63.png',
		'/images/companies/64.png',
	];
</script>

<svelte:window bind:innerWidth={w} />

<Nav />
<div class="my-10 pt-10 mx-5 text-sm">
	<p class="font-bold">Артисты и селебрити</p>
	<p class="font-normal mt-5 2xl:whitespace-pre-line">
		Sati Kazanova, ZVENTA SVENTANA, Volen Sentir, Директор Всего, группа Fruktы, Krassna, Dr. Krivorotov, Анна Хилькевич, Sunsay, Елка, Burito, Velvet Music, Alampa, Ляйсан Утяшева, Полина Максимова, Егор Корешков, Женя Борзых, CБПЧ, Tinavie, Тимур Соловьев, Нюша, Nonative, Rayda, Indablack, Владимир Варнава, Manizha, Mujuice, L’one, Philipp Plein, Сюзанна, Екатерина Варнава
	</p>
	<p class="font-bold mt-5">Медиа и журналы</p>
	<p class="mt-5 grid grid-cols-4 gap-3">
		{#each media as img, index (index)}
			<img class="w-16 object-cover self-center" src={img} alt="" />
		{/each}
	</p>
	<p class="font-bold mt-5">Бренды и компании</p>
	<div class="mt-5 grid grid-cols-4 gap-3">
		{#each images as img, index (index)}
			<img class="w-16 object-cover self-center" src={img} alt="" />
		{/each}
	</div>
</div>
