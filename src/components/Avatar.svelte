<style>
.avatar {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  background-color: #9ac7ff;
  color: #fff;
  text-overflow: clip;
  font-weight: 600;
}

.avatar--rounded {
  border-radius: 50%;
}
</style>

<script>
export let initials;
export let rounded = true;

let firstChars;
let chars;

$: {
  firstChars = initials.split(" ").slice(0, 2);
  chars =
    firstChars.length < 2
      ? initials.substring(0, 2)
      : firstChars.map(c => c.charAt(0)).join("");
}
</script>

<div class:avatar--rounded="{rounded}" class="avatar">
  {chars}
</div>
