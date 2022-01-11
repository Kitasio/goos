<script>
	export let items
	export let duration = '10s';
	export let durationMobile = '20s';
	export let classWrapper = 'absolute';
	export let classParent = 'space-x-6';
	export let classChild = 'inline-block';
</script>

<div class="ticker-wrap {classWrapper}">
	<div
		class="ticker {classParent}"
		style="--duration: {duration}; --duration-mobile: {durationMobile}"
	>
		{#each items as i, index (index)}
			<div class={classChild}>{i}</div>
		{/each}
	</div>
</div>

<style>
	@-webkit-keyframes ticker {
		0% {
			-webkit-transform: translate3d(-20%, 0, 0);
			transform: translate3d(-20%, 0, 0);
			visibility: visible;
		}
		100% {
			-webkit-transform: translate3d(-100%, 0, 0);
			transform: translate3d(-100%, 0, 0);
		}
	}
	@keyframes ticker {
		0% {
			-webkit-transform: translate3d(-20%, 0, 0);
			transform: translate3d(-20%, 0, 0);
			visibility: visible;
		}
		100% {
			-webkit-transform: translate3d(-100%, 0, 0);
			transform: translate3d(-100%, 0, 0);
		}
	}
	.ticker-wrap {
		width: 100%;
		overflow: hidden;
		padding-left: 100%;
		box-sizing: content-box;
	}
	.ticker-wrap .ticker {
		display: inline-block;
		white-space: nowrap;
		padding-right: 100%;
		box-sizing: content-box;
		-webkit-animation-iteration-count: infinite;
		animation-iteration-count: infinite;
		-webkit-animation-timing-function: linear;
		animation-timing-function: linear;
		-webkit-animation-name: ticker;
		animation-name: ticker;
		-webkit-animation-duration: var(--duration-mobile);
		animation-duration: var(--duration-mobile);
	}
	@media (min-width: 640px) {
		.ticker-wrap .ticker {
			display: inline-block;
			white-space: nowrap;
			padding-right: 100%;
			box-sizing: content-box;
			-webkit-animation-iteration-count: infinite;
			animation-iteration-count: infinite;
			-webkit-animation-timing-function: linear;
			animation-timing-function: linear;
			-webkit-animation-name: ticker;
			animation-name: ticker;
			-webkit-animation-duration: var(--duration);
			animation-duration: var(--duration);
		}
	}
</style>
