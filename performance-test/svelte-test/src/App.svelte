<script>
	import CounterButton from './CounterButton.svelte';
	import CounterDisplay from './CounterDisplay.svelte';
	import { writable } from 'svelte/store';
	const counter = writable(0);
	let counterValue;
	counter.subscribe(c => counterValue = c);

	const increaseCounter = () => {
		counter.update(n => n + 1);
	}

	const decreaseCounter = () => {
		counter.update(n => n - 1);
	}
</script>

<main>
	<CounterButton onClick={increaseCounter} buttonText={'Increase'}></CounterButton>
	<CounterButton onClick={decreaseCounter} buttonText={'Decrease'}></CounterButton>
	<CounterDisplay text={counterValue}></CounterDisplay>
</main>

<style>
	main {
		display: flex;
	}
</style>