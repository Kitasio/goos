<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const closeBot = () => {
		dispatch('closeBot');
	};
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

<div class="hidden lg:inline">
	<div class="w-full lg:flex justify-between">
		<a href="/team" class="hidden xl:flex flex-none font-medium w-4/12 xl:w-3/12 items-end">
			<h1 class="pl-5 w-full border-black border-t py-2 bg-white">Команда</h1>
		</a>
		<main class="grid grid-cols-2 w-full font-medium divide-x divide-black bg-white -ml-[1px]">
			<div class="px-5 2xl:px-7 pt-10 pb-20 text-sm border-black border-t border-l overflow-y-scroll max-h-[60vh]">
				<p class="font-bold">Артисты и селебрити</p>
				<p class="font-normal mt-5 2xl:whitespace-pre-line">
					Sati Kazanova, ZVENTA SVENTANA, Volen Sentir, Директор Всего, группа Fruktы, Krassna, Dr. Krivorotov, Анна Хилькевич, Sunsay, Елка, Burito, Velvet Music, Alampa, Ляйсан Утяшева, Полина Максимова, Егор Корешков, Женя Борзых, CБПЧ, Tinavie, Тимур Соловьев, Нюша, Nonative, Rayda, Indablack, Владимир Варнава, Manizha, Mujuice, L’one, Philipp Plein, Сюзанна, Екатерина Варнава
				</p>
				<p class="font-bold mt-5">Медиа и журналы</p>
				<div class="mt-5 grid grid-cols-6 gap-5">
					{#each media as img, index (index)}
						<img class="w-16 object-cover self-center" src={img} alt="" />
					{/each}
				</div>
				<p class="font-bold mt-5">Бренды и компании</p>
				<div class="mt-5 grid grid-cols-6 gap-5">
					{#each images as img, index (index)}
						<img class="w-16 object-cover self-center" src={img} alt="" />
					{/each}
				</div>
			</div>
			<div class="px-5 2xl:px-7 pt-10 pb-20 text-sm border-black border-t border-l overflow-y-scroll max-h-[60vh]">
				<p class="font-bold">Награды</p>
				<div class="mt-5 grid grid-cols-5 gap-5">
					{#each rewards as img, index (index)}
						<img class="w-full object-cover self-center" src={img} alt="" />
					{/each}
				</div>
			</div>
			<div
				on:click={closeBot}
				class="flex items-center pl-5 2xl:pl-7 py-2 transition duration-200 hover:shadow-border border-t border-l border-black cursor-pointer"
			>
				<span>Клиенты</span>
			</div>
			<div
				on:click={closeBot}
				class="flex items-center pl-5 2xl:pl-7 py-2 transition duration-200 hover:shadow-border border-t border-black cursor-pointer"
			>
				<span>Награды</span>
			</div>
		</main>
	</div>
</div>
