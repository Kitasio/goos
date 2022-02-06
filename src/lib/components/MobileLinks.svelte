<script>
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	export let toggled = false;
</script>

{#if toggled}
		<div
			in:fly={{ x: -20, duration: 200 }}
			class="lg:hidden pt-10 flex flex-col divide-y divide-black border-b border-black mb-[0.2px] overflow-scroll"
		>
			<a href="/projects" class="flex justify-between items-center px-5 text-lg h-36">
				<h1>Проекты</h1>
				<p class="mt-1"><img src="/images/arrow.svg" alt="" /></p>
			</a>
			<a
				target="_self"
				href="/team"
				class="flex justify-between items-center px-5 text-lg h-36"
			>
				<h1>Команда</h1>
				<p class="mt-1"><img src="/images/arrow.svg" alt="" /></p>
			</a>
			<a href="/services" class="flex justify-between items-center px-5 text-lg h-36">
				<h1>Услуги</h1>
				<p class="mt-1"><img src="/images/arrow.svg" alt="" /></p>
			</a>
			<a href="/clients" class="flex justify-between items-center px-5 text-lg h-36">
				<h1>Клиенты</h1>
				<p class="mt-1"><img src="/images/arrow.svg" alt="" /></p>
			</a>
			<a href="/rewards" class="flex justify-between items-center px-5 text-lg h-36">
				<h1>Награды</h1>
				<p class="mt-1"><img src="/images/arrow.svg" alt="" /></p>
			</a>
			<a href="/about" class="flex justify-between items-center px-5 text-lg h-36">
				<h1>О нас</h1>
				<p class="mt-1"><img src="/images/arrow.svg" alt="" /></p>
			</a>
			<a href="/contacts" class="flex justify-between items-center px-5 text-lg h-36">
				<h1>Контакты</h1>
				<p class="mt-1"><img src="/images/arrow.svg" alt="" /></p>
			</a>
		</div>
{/if}
