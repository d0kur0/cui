<style>
.avatar {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1em;
  background-color: var(--bg-color, "#ddd");
  color: var(--color, "#000");
  text-overflow: clip;
}

.avatar--rounded {
  border-radius: 50%;
}
</style>

<script>
import generateColor from "../helpers/generateColor";
import invert from "invert-color";

export let initials;
export let rounded = true;

let color;
let chars;
let backgroundColor;
let firstChars;

$: {
  backgroundColor = generateColor(initials);
  firstChars = initials.split(" ").slice(0, 2);

  chars =
    firstChars.length < 2
      ? initials.substring(0, 2)
      : firstChars.map(c => c.charAt(0)).join("");

  color = invert(backgroundColor, true);
}
</script>

<div
  class:avatar--rounded="{rounded}"
  style="{`--bg-color: ${backgroundColor}; --color: ${color}`}"
  class="avatar">
  {chars}
</div>
