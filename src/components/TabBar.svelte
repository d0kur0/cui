<style src="./TabBar.css"></style>

<script>
import IoIosListBox from "svelte-icons/io/IoIosListBox.svelte";
import TiUser from "svelte-icons/ti/TiUser.svelte";
import TiGroup from "svelte-icons/ti/TiGroup.svelte";
import TiCalendar from "svelte-icons/ti/TiCalendar.svelte";
import TiChartArea from "svelte-icons/ti/TiChartArea.svelte";
import active from "svelte-spa-router/active";
import { link } from "svelte-spa-router";
</script>

<ul class="tabbar">
	<li class="tabbar__item">
		<a use:link use:active href="/" class="tabbar__link">
			<TiCalendar />
		</a>
	</li>

	<li class="tabbar__item">
		<a use:link use:active href="/clients" class="tabbar__link">
			<TiGroup />
		</a>
	</li>

	<li class="tabbar__item">
		<a use:link use:active href="/services" class="tabbar__link">
			<IoIosListBox />
		</a>
	</li>

	<li class="tabbar__item">
		<a use:link use:active href="/statistic" class="tabbar__link">
			<TiChartArea />
		</a>
	</li>

	<li class="tabbar__item">
		<a use:link use:active href="/account" class="tabbar__link">
			<TiUser />
		</a>
	</li>
</ul>
