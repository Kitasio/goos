<script lang="ts">
	import Nav from '$lib/components/nav/Nav.svelte';
	import { white } from '$lib/functions/utils';
	import { people } from '$lib/people';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Scroller } from 'svelte-aid';

	let w
	$: if (w > 1024) goto('/team/gooseva');
	onMount(() => {
		$white = false;
	});
</script>

<svelte:window bind:innerWidth={w} />
<!-- FOR JIT COMPILER -->
<div class="top-0 h-5 w-5 relative hidden h-full mx-5 2xl:w-80 2xl:h-80" />

<div class="top-0 fixed w-full z-10">
	<Nav />
</div>
<Scroller items={people} parentClass={'py-10'} wrapperClass={'lg:hidden'} />


