<script>
	import { Object, Array, bind } from 'svelte-object'

  let data = [{
		name: 'Lillemis',
		age: 5,
		editable: 'You can edit this text'
	}]
	
	let store
</script>


<div>
	<Object bind:store let:store let:value value={{ name: 'Arthurs Pet Company' }}>
		<h2>{value.name}</h2>
		<input use:store={'name'}>
		<Array name='pets' let:value value={data}>
			<h3>Pets</h3>
			{#each value as item, k}
				<div>
					<Object let:store name={k}>
						<input use:store={'name'} />
						<input use:store={'age'} type='number' />
						<div use:store={'editable'}> {item.editable || ''} </div>
					</Object>
					<button on:click={() => value.removeByIndex(k)}>- {item.name || ''}</button>
				</div>
			{/each}
			<button on:click={() => value.push({})}>+</button>
		</Array>
	</Object>
</div>