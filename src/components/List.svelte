<style>
.list {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
}

:global(.list > li) {
  margin: 0;
  padding: 0px 15px;
  display: flex;
  align-items: center;
  position: relative;
  transition: 0.3s;
}

:global(.list > li:hover),
:global(.list > li:focus-within) {
  background-color: #fff7fe;
}

:global(.list__item) {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  color: #5f5f5f;
}

:global(.list__item-avatar) {
  padding: 0 15px;
}

:global(.list__item-content > h2) {
  margin: 0;
  padding: 0;
  font-size: 1.1em;
  font-weight: normal;
}

:global(.list__item-content > h3) {
  margin: 0;
  padding: 0;
  font-size: 0.9em;
  font-weight: normal;
}

:global(.list__item-end) {
  color: rgb(156, 156, 156);
}

:global(.list__item-end > svg) {
  width: 32px;
}

:global(.list__event-button) {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  background-color: transparent;
  color: transparent;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
}
</style>

<script>
export let items = [];
</script>

<ul class="list">
  {#each items as item (item.id)}
    <slot item="{item}" />
  {/each}
</ul>
