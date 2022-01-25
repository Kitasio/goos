<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const closeTop = () => {
		dispatch('closeTop');
	};
</script>

<main class="grid grid-cols-top w-full font-medium divide-x divide-black bg-white">
	<div
		on:click={closeTop}
		class="flex items-center pl-5 2xl:pl-7 py-2 transition duration-200 hover:shadow-border border-l border-b border-black cursor-pointer"
	>
		<span>О нас</span>
	</div>
	<div
		on:click={closeTop}
		class="flex items-center pl-5 2xl:pl-7 py-2 transition duration-200 hover:shadow-border border-b border-black cursor-pointer"
	>
		<span>Услуги</span>
	</div>
	<div
		on:click={closeTop}
		class="flex items-center pl-5 2xl:pl-7 py-2 transition duration-200 hover:shadow-border border-b border-black cursor-pointer"
	>
		<span>Контакты</span>
	</div>

	<div class="px-5 2xl:px-7 py-10 text-sm border-black border-b">
		<p class="font-bold">GOOSEVA KOMANDA &mdash;</p>
		<p class="font-normal 2xl:whitespace-pre-line">
			профессиональная команда стилистов, художников по&nbsp;костюму и&nbsp;ассистентов под
			руководством Анны Гусевой.
		</p>
		<p class="mt-5 font-normal 2xl:whitespace-pre-line">
			Мы&nbsp;разрабатываем концепции съемок, собираем нужный коллектив под проект или сотрудничаем с&nbsp;вашей командой. Продумываем стиль и&nbsp;образы, создаем костюмы для героев в&nbsp;кино, рекламе, видео роликах, музыкальных клипах и&nbsp;модных журналах. А&nbsp;также оказываем услуги персонального стайлинга. Специалисты нашей команды&nbsp;&mdash; это сильный творческий коллектив, где каждый обладает художественным вкусом, большой экспертизой в&nbsp;области моды и&nbsp;психологии, способностью быстро реагировать и&nbsp;находить альтернативные решения.
		</p>
	</div>

	<div class="px-5 2xl:px-7 py-10 text-sm border-black border-b">
		<p class="font-bold">
			Мы&nbsp;оказываем услуги по&nbsp;созданию и&nbsp;подбору костюма любой сложности для съемок
			фото, видео, кино, частных мероприятий и&nbsp;других проектов. Для того, чтобы рассчитать
			стоимость и&nbsp;подобрать специалиста позвоните или напишите нам
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
			Смена специалиста&nbsp;&mdash; 12&nbsp;часов. Рабочие часы сверх смены считаются как
			переработки и&nbsp;оплачиваются дополнительно по&nbsp;согласованию
		</p>
		<p class="mt-3 font-bold">ЧАСТНЫЕ УСЛУГИ</p>
		<p class="font-normal whitespace-pre-line mt-3 pl-5">
			&mdash;&nbsp;разбор гардероба от&nbsp;20&nbsp;000&nbsp;в день 
			&mdash;&nbsp;персональный шоппинг от&nbsp;20&nbsp;000&nbsp;в день 
			&mdash;&nbsp;дрессинг/ создание костюма на&nbsp;мероприятие 15&nbsp;000 лук
		</p>
	</div>
	<div class="px-5 2xl:px-7 py-10 text-sm border-black border-b">
		<p class="font-bold">Анна Гусева</p>
		<p>+79099505999</p>
		<p>gooseva.style@gmail.com</p>

		<p class="mt-3">Instagram</p>
		<div>
			<a href="https://www.instagram.com/guseva_director" target="_blank" class="font-bold"
				>@guseva_director</a
			>
		</div>
		<div>
			<a href="https://www.instagram.com/gooseva_komanda" target="_blank" class="font-bold"
				>@gooseva_komanda</a
			>
		</div>
	</div>
</main>
