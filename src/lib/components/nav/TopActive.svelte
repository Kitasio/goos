<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const closeTop = () => {
		dispatch('closeTop')
	}
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
			Мы&nbsp;разрабатываем концепции съемок, собираем нужный коллектив под проект или сотрудничаем
			с&nbsp;вашей командой. Продумываем стиль и&nbsp;образы, создаем костюмы для героев
			в&nbsp;рекламе, видео роликах, музыкальных клипах и&nbsp;модных журналах. А&nbsp;также
			оказываем услуги персонального стайлинга. Специалисты нашей команды&nbsp;&mdash; это сильный
			творческий коллектив, где каждый обладает художественным вкусом, большой экспертизой
			в&nbsp;области моды и&nbsp;психологии, способностью быстро реагировать и&nbsp;находить
			альтернативные решения.
		</p>
	</div>

	<div class="px-5 2xl:px-7 py-10 text-sm border-black border-b">
		<p class="font-bold">Коммерческие услуги</p>
		<p class="mt-3 font-bold">Креатив:</p>
		<p class="font-normal whitespace-pre-line">
			полная разработка концепции съемки (от&nbsp;50&nbsp;000) разработка стиля и&nbsp;образов
			(от&nbsp;30&nbsp;000)
		</p>
		<p class="mt-3 font-bold">Стиль:</p>
		<p class="font-normal whitespace-pre-line">
			стилизация луков для фото и&nbsp;видео&nbsp;&mdash; съемки (от&nbsp;30&nbsp;000) мероприятия
			или другого случая (от&nbsp;25&nbsp;000)
		</p>
		<p class="mt-3 font-bold">Ассистент стилиста на&nbsp;съемке:</p>
		<p class="font-normal whitespace-pre-line">
			ассистент стилиста: подготовка к&nbsp;съемке, работа на&nbsp;площадке, развоз
			(от&nbsp;10&nbsp;000 ) работа костюмера (от&nbsp;6&nbsp;000 )
		</p>
		<p class="mt-3 font-bold">Создание костюмов:</p>
		<p class="font-normal whitespace-pre-line">
			разработка одного костюма (от&nbsp;30000) изготовление рассчитывается индивидуально под задачу
		</p>
		<p class="font-normal whitespace-pre-line mt-3">
			Смена специалиста&nbsp;&mdash; 12&nbsp;часов. Рабочие часы сверх смены считаются как
			переработки и&nbsp;оплачиваются от&nbsp;500&nbsp;руб.&nbsp;/ час (ассистент),
			от&nbsp;1000&nbsp;руб.&nbsp;/ час (стилист)
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
	<div class="px-5 2xl:px-7 py-10 text-sm border-black border-b">
		<p class="font-bold">Анна Гусева</p>
		<p>+79099505999</p>
		<p>gooseva.style@gmail.com</p>

		<p class="mt-3">Instagram</p>
		<p class="font-bold">@guseva_stylist</p>
		<a href="https://www.instagram.com/gooseva_komanda" class="font-bold">@gooseva_komanda</a>
		<p class="mt-3">
			Если вы&nbsp;хотите присоединиться к&nbsp;нашей команде, поделиться новостями или просто
			познакомиться с&nbsp;нами, напишите на&nbsp;goosevastyle@gmail.com
		</p>
	</div>
</main>
