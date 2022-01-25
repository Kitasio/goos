<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	export let white
</script> 

{#if $page.url.pathname != '/'}
	<span
		on:click|stopPropagation={() => goto('/team')}
		class="flex transition duration-200 hover:shadow-border pl-5 cursor-pointer w-1/2 font-medium py-2 items-center pr-10 bg-white"
	>
		Команда
	</span>
<span
	class=
		'flex transition border-l border-black duration-200 hover:shadow-border pl-5 cursor-pointer w-1/2 font-medium py-2 items-center pr-10 bg-white'
	>Клиенты</span
>
<span
	class=
		'flex transition border-l border-black duration-200 hover:shadow-border pl-5 cursor-pointer w-1/2 font-medium py-2 items-center pr-10 bg-white'
>
	Награды
</span>
{:else}
<span
	class={white
		? 'flex transition border-l border-white duration-200 hover:shadow-white pl-5 cursor-pointer w-1/2 font-medium py-2 items-center pr-10'
		: 'flex transition border-l border-black duration-200 hover:shadow-border pl-5 cursor-pointer w-1/2 font-medium py-2 items-center pr-10'}
	>Клиенты</span
>
<span
	class={white
		? 'flex transition border-l border-white duration-200 hover:shadow-white pl-5 cursor-pointer w-1/2 font-medium py-2 items-center pr-10'
		: 'flex transition border-l border-black duration-200 hover:shadow-border pl-5 cursor-pointer w-1/2 font-medium py-2 items-center pr-10'}
>
	Награды
</span>
{/if}
