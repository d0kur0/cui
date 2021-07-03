<style>
.navbar {
  background-color: rgb(255, 255, 255);
  height: calc(100% - 3px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 5px 0px #dadada;
  font-size: 1.1em;
}
</style>

<script>
export let title = "Заголовок страницы";
</script>

<div class="navbar">
  {title}
  <slot />
</div>
