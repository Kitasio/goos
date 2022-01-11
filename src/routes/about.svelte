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
</script>

<svelte:window bind:innerWidth={w} />

<Nav />
<div class="my-10 pt-10 mx-5 text-sm">
	<p class="font-bold">GOOSEVA KOMANDA &mdash;</p>
	<p class="font-normal 2xl:whitespace-pre-line">
		профессиональная команда стилистов, художников по&nbsp;костюму и&nbsp;ассистентов под
		руководством Анны Гусевой.
	</p>
	<p class="mt-5 font-normal 2xl:whitespace-pre-line">
		Мы&nbsp;разрабатываем концепции съемок, собираем нужный коллектив под проект или сотрудничаем
		с&nbsp;вашей командой. Продумываем стиль и&nbsp;образы, создаем костюмы для героев
		в&nbsp;рекламе, видео роликах, музыкальных клипах и&nbsp;модных журналах. А&nbsp;также оказываем
		услуги персонального стайлинга. Специалисты нашей команды&nbsp;&mdash; это сильный творческий
		коллектив, где каждый обладает художественным вкусом, большой экспертизой в&nbsp;области моды
		и&nbsp;психологии, способностью быстро реагировать и&nbsp;находить альтернативные решения.
	</p>
</div>
