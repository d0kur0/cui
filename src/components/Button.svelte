<style src="./Button.css"></style>

<script>
export let fullWidth = false;
export let rounded = true;
export let small = false;
export let large = false;
export let danger = false;
export let onlyBorder = false;
</script>

<button
	type="submit"
	class:button--fullwidth="{fullWidth}"
	class:button--rounded="{rounded}"
	class:button--large="{large}"
	class:button--small="{small}"
	class:button--danger="{danger}"
	class:button--only-border="{onlyBorder}"
	class="button"
	on:click>
	<slot />
</button>
