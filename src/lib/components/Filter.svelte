<script lang="ts">
	import { lvl1All, lvl2All, lvl3All, lvl1, lvl2, lvl3 } from '$lib/functions/utils';

	let lvl1Options = ['Фото', 'Видео'];
	let lvl2Options = ['Фешн', 'Реклама', 'Эдиториал'];
	let lvl3Options = ['Женский', 'Мужской', 'Детский', 'Бьюти', 'Продукт', 'Создание костюма'];

	$: {
		if ($lvl1All) $lvl1 = [];
		if ($lvl2All) $lvl2 = [];
		if ($lvl3All) $lvl3 = [];
	}
	
</script>

<!-- DESKTOP -->
<div class="hidden bg-white border-b border-black py-7 px-5 w-full lg:flex">
	<div class="flex space-x-20">
		<div class="flex">
			<h1 class="font-medium">Проект</h1>
			<div>
				<div class="space-y-3 justify-center">
					{#each lvl1Options as option}
						<label for={option} class="whitespace-nowrap space-x-5 cursor-pointer">
							<input
								id={option}
								class="text-black border-2 border-black w-5 h-5 focus:ring-0"
								type="checkbox"
								bind:group={$lvl1}
								value={option}
							/>
							<div class="flex items-center space-x-3 mt-0.5">
								<img
									class={$lvl1.includes(option) ? 'transition opacity-100' : 'transition opacity-0'}
									src="/images/arrow.svg"
									alt=""
								/>
								<span
									class={$lvl1.includes(option)
										? 'font-extralight -ml-2 underline transition'
										: 'font-extralight -ml-2 transition'}>{option}</span
								>
							</div>
						</label>
					{/each}
				</div>
			</div>
		</div>

		<div class="flex">
			<h1 class="font-medium">Направление</h1>
			<div>
				<div class="space-y-3 justify-center">
					{#each lvl2Options as option}
						<label for={option} class="whitespace-nowrap space-x-5 cursor-pointer">
							<input
								id={option}
								class="text-black border-2 border-black w-5 h-5 focus:ring-0"
								type="checkbox"
								bind:group={$lvl2}
								value={option}
							/>
							<div class="flex flex-wrap items-center space-x-3 mt-0.5">
								<img
									class={$lvl2.includes(option) ? 'transition opacity-100' : 'transition opacity-0'}
									src="/images/arrow.svg"
									alt=""
								/>
								<span
									class={$lvl2.includes(option)
										? 'font-extralight -ml-2 underline transition'
										: 'font-extralight -ml-2 transition'}>{option}</span
								>
							</div>
						</label>
					{/each}
				</div>
			</div>
		</div>

		<div class="flex">
			<h1 class="font-medium">Стайлинг</h1>
			<div>
				<div class="grid grid-cols-2 justify-center">
					{#each lvl3Options as option}
						<label for={option} class="whitespace-nowrap space-x-5 cursor-pointer">
							<input
								id={option}
								class="text-black border-2 border-black w-5 h-5 focus:ring-0"
								type="checkbox"
								bind:group={$lvl3}
								value={option}
							/>
							<div class="flex space-x-3 mt-0.5">
								<img
									class={$lvl3.includes(option) ? 'transition opacity-100' : 'transition opacity-0'}
									src="/images/arrow.svg"
									alt=""
								/>
								<span
									class={$lvl3.includes(option)
										? 'font-extralight -ml-2 underline transition'
										: 'font-extralight -ml-2 transition'}>{option}</span
								>
							</div>
						</label>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<!-- MOBILE -->
<div class="bg-white lg:hidden">
	<div class="px-5 py-5 grid grid-cols-4 border-b border-black">
		<h1 class="col-span-2">Проект</h1>
		<div class="col-span-1 flex flex-col space-y-2">
			{#each lvl1Options as option}
				<label class="whitespace-nowrap space-x-1">
					<input
						class="text-black border border-black w-4 h-4 focus:ring-0 mb-1"
						type="checkbox"
						bind:group={$lvl1}
						value={option}
					/>
					<span class=" -ml-2">{option}</span>
				</label>
			{/each}
		</div>
		<label class="col-span-1 justify-self-end space-x-1">
			<input
				class="text-black border border-black w-4 h-4 focus:ring-0 mb-1"
				type="checkbox"
				bind:checked={$lvl1All}
			/>
			<span class=" -ml-2">Все</span>
		</label>
	</div>

	<div class="p-5 grid grid-cols-4 border-b border-black">
		<h1 class="col-span-2">Направление</h1>
		<div class="col-span-1 flex flex-col space-y-2">
			{#each lvl2Options as option}
				<label class="whitespace-nowrap space-x-1">
					<input
						class="text-black border border-black w-4 h-4 focus:ring-0 mb-1"
						type="checkbox"
						bind:group={$lvl2}
						value={option}
					/>
					<span class=" -ml-2">{option}</span>
				</label>
			{/each}
		</div>
		<label class="col-span-1 justify-self-end space-x-1">
			<input
				class="text-black border border-black w-4 h-4 focus:ring-0 mb-1"
				type="checkbox"
				bind:checked={$lvl2All}
			/>
			<span class=" -ml-2">Все</span>
		</label>
	</div>

	<div class="p-5 grid grid-cols-4 border-b border-black">
		<h1 class="col-span-2">Стайлинг</h1>
		<div class="col-span-1 flex flex-col space-y-2">
			{#each lvl3Options as option}
				<label class="whitespace-nowrap space-x-1">
					<input
						class="text-black border border-black w-4 h-4 focus:ring-0 mb-1"
						type="checkbox"
						bind:group={$lvl3}
						value={option}
					/>
					<span class=" -ml-2">{option}</span>
				</label>
			{/each}
		</div>
		<label class="col-span-1 justify-self-end space-x-1">
			<input
				class="text-black border border-black w-4 h-4 focus:ring-0 mb-1"
				type="checkbox"
				bind:checked={$lvl3All}
			/>
			<span class=" -ml-2">Все</span>
		</label>
	</div>
</div>

<style>
	@media (min-width: 1024px) {
		input[type='checkbox'] {
			display: none;
		}

		input[type='checkbox'] + label {
			background: #999;
			height: 16px;
			width: 16px;
			display: inline-block;
			padding: 0 0 0 0px;
		}

		input[type='checkbox']:checked + label {
			background: #0080ff;
			height: 16px;
			width: 16px;
			display: inline-block;
			padding: 0 0 0 0px;
		}
	}
</style>
