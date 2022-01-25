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
<div class="my-10 pt-7 mx-5 text-sm">
	<p class="font-bold">
		Мы&nbsp;оказываем услуги по&nbsp;созданию и&nbsp;подбору костюма любой сложности для съемок фото, видео, кино, частных мероприятий и&nbsp;других проектов. Для того, чтобы рассчитать стоимость и&nbsp;подобрать специалиста позвоните или напишите нам
	</p>
	<p class="font-bold mt-3">КОММЕРЧЕСКИЕ УСЛУГИ</p>
	<p class="mt-3 font-bold">Создание костюмов:</p>
	<p class="font-normal whitespace-pre-line pl-5">
		&mdash;&nbsp;разработка одного костюма от&nbsp;/ 25&nbsp;000
		&mdash;&nbsp;изготовление рассчитывается индивидуально под задачу
	</p>
	<p class="mt-3 font-bold">Креатив:</p>
	<p class="font-normal whitespace-pre-line pl-5">
		&mdash;&nbsp;полная разработка концепции съемки с&nbsp;нуля от&nbsp;/ 50&nbsp;000
		&mdash;&nbsp;разработка стиля и&nbsp;образов для съемки или другого случая&nbsp;/ от&nbsp;30&nbsp;000
	</p>
	<p class="mt-3 font-bold">Стиль:</p>
	<p class="font-normal whitespace-pre-line pl-5">
		&mdash;&nbsp;стилизация луков для фото съемки&nbsp;/ от&nbsp;30&nbsp;000&nbsp;/ 1&nbsp;смена
		&mdash;&nbsp;стилизация луков для видео съемки&nbsp;/ от&nbsp;40&nbsp;000&nbsp;/ 1&nbsp;смена
	</p>
	<p class="mt-3 font-bold">Ассистент стилиста на&nbsp;съемке:</p>
	<p class="font-normal whitespace-pre-line pl-5">
		&mdash;&nbsp;ассистент стилиста: подготовка к&nbsp;съемке, работа на&nbsp;площадке, развоз&nbsp;/ от&nbsp;10&nbsp;000
		&mdash;&nbsp;работа костюмера&nbsp;/ от&nbsp;6&nbsp;000&nbsp;/ 1&nbsp;смена
	</p>
	<p class="font-normal whitespace-pre-line mt-3">
		Смена специалиста&nbsp;&mdash; 12&nbsp;часов. Рабочие часы сверх смены считаются как переработки и&nbsp;оплачиваются дополнительно по&nbsp;согласованию
	</p>
	<p class="mt-3 font-bold">ЧАСТНЫЕ УСЛУГИ</p>
	<p class="font-normal whitespace-pre-line mt-3 pl-5">
		&mdash;&nbsp;разбор гардероба от&nbsp;20&nbsp;000&nbsp;в день
		&mdash;&nbsp;персональный шоппинг от&nbsp;20&nbsp;000&nbsp;в день
		&mdash;&nbsp;дрессинг/ создание костюма на&nbsp;мероприятие 15&nbsp;000 лук
	</p>
</div>
