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
	<p class="font-bold">Коммерческие услуги</p>
	<p class="mt-3">Креатив:</p>
	<p class="font-normal whitespace-pre-line">
		полная разработка концепции съемки (от&nbsp;50&nbsp;000) 
		разработка стиля и&nbsp;образов (от&nbsp;30&nbsp;000)
	</p>
	<p class="mt-3">Стиль:</p>
	<p class="font-normal whitespace-pre-line">
		стилизация луков для фото и&nbsp;видео&nbsp;&mdash; съемки (от&nbsp;30&nbsp;000) мероприятия или
		другого случая (от&nbsp;25&nbsp;000)
	</p>
	<p class="mt-3">Ассистент стилиста на&nbsp;съемке:</p>
	<p class="font-normal whitespace-pre-line">
		ассистент стилиста: подготовка к&nbsp;съемке, работа на&nbsp;площадке, развоз
		(от&nbsp;10&nbsp;000 ) работа костюмера (от&nbsp;6&nbsp;000 )
	</p>
	<p class="mt-3">Создание костюмов:</p>
	<p class="font-normal whitespace-pre-line">
		разработка одного костюма (от&nbsp;30&nbsp;000) изготовление рассчитывается индивидуально под задачу
	</p>
	<p class="font-normal whitespace-pre-line mt-3">
		Смена специалиста&nbsp;&mdash; 12&nbsp;часов. Рабочие часы сверх смены считаются как переработки
		и&nbsp;оплачиваются от&nbsp;500&nbsp;руб.&nbsp;/ час (ассистент), от&nbsp;1000&nbsp;руб.&nbsp;/
		час (стилист)
	</p>
	<p class="mt-3 font-bold">Частные услуги</p>
	<p class="font-normal whitespace-pre-line mt-3">
		Разбор гардероба: оценка и&nbsp;редактирование гардероба, составление галереи образов
		и&nbsp;их&nbsp;систематизация, координация починки и&nbsp;химчистки вещей
	</p>
	<p class="font-normal whitespace-pre-line mt-3">
		Персональный шоппинг: шоппинг со&nbsp;стилистом согласно индивидуально разработанному плану,
		составление галереи образов, встраивание образов в&nbsp;гардероб клиента, онлайн-сопровождение
	</p>
	<p class="mt-3 font-bold">Подбор&nbsp;/ создание костюмов на&nbsp;мероприятие</p>
</div>
