<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const closeBot = () => {
		dispatch('closeBot');
	};
	let images = [
		'/images/companies/cian.png',
		'/images/companies/lg.png',
		'/images/companies/mega.png',
		'/images/companies/samsung.png',
		'/images/companies/cian.png',
		'/images/companies/lg.png',
		'/images/companies/mega.png',
		'/images/companies/samsung.png',
		'/images/companies/samsung.png',
		'/images/companies/samsung.png',
		'/images/companies/samsung.png',
		'/images/companies/samsung.png',
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
		'/images/companies/samsung.png',
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
		<main class="grid grid-cols-2 w-full font-medium divide-x divide-black bg-white">
			<div class="px-5 2xl:px-7 pt-10 pb-20 text-sm border-black border-t border-l overflow-y-scroll max-h-[60vh]">
				<p class="font-bold">Артисты и селебрити</p>
				<p class="font-normal mt-5 2xl:whitespace-pre-line">
					Sati Kazanova, ZVENTA SVENTANA, VOLEN SENTIR, Директор Всего, группа Fruktы, Krassna, Dr.
					Krivorotov, Анна Хилькевич, Sunsay, Елка, Burito, Velvet Music, ALAMPA, Ляйсан Утяшева,
					Полина Максимова, Егор Корешков, Женя Борзых, CБПЧ, TINAVIE, Тимур Соловьев, Нюша,
					Nonative, Rayda, Indablack, Варнава, Manizha
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
			<div class="px-5 2xl:px-7 pt-10 pb-20 text-sm border-black border-t border-l overflow-y-scroll max-h-[60vh]">
				<p class="font-bold">Награды</p>
				<div class="mt-5 grid grid-cols-5 gap-5">
					{#each rewards as img, index (index)}
						<img class="w-full object-cover" src={img} alt="" />
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
