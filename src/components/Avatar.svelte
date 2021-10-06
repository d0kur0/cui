<style src="./Avatar.css"></style>

<script>
export let initials;
export let rounded = true;
export let src;

let firstChars;
let chars;

$: if (!src) {
	firstChars = initials.split(" ").slice(0, 2);
	chars =
		firstChars.length < 2
			? initials.substring(0, 2)
			: firstChars.map(c => c.charAt(0)).join("");
}
</script>

<div class:avatar--rounded="{rounded}" class="avatar">
	{#if src}
		<img src="{src}" class="avatar__image" alt="Avatar of user" />
	{:else}
		{chars}
	{/if}
</div>
