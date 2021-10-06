<style src="./List.css"></style>

<script>
export let items = [];
</script>

<ul class="list">
	{#each items as item (item.id)}
		<slot item="{item}" />
	{/each}
</ul>
