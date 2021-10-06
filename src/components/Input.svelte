<style src="./Input.css"></style>

<script>
export let label;
export let type;
export let required = false;
export let name;
export let placeholder;
export let value = "";
</script>

<div class="input">
	{#if label}
		<label class="input__label" for="{name}">{label}</label>
	{/if}

	<input
		on:blur
		on:change
		class="input__input"
		placeholder="{placeholder}"
		required="{required}"
		type="{type}"
		id="{name}"
		value="{value}"
		name="{name}" />
</div>
