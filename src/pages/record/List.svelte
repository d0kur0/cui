<style>
.list__item-content {
	width: 100%;
}

.services {
	margin-top: 10px;
	display: flex;
	flex-wrap: wrap;
	gap: 4px;
}

.services__service {
	background: #ffe8ff;
	color: #0a0a0a;
	border-radius: 5px;
	padding: 3px 10px;
	font-size: 0.9em;
	font-weight: initial;
}

.client {
	display: flex;
}

.client__avatar {
	margin-right: 8px;
}

.client__info-time {
	color: rgb(49, 49, 49);
	font-weight: normal;
	font-size: 0.8em;
}

.client__price {
	flex-grow: 1;
	text-align: right;
}

.description {
	margin-top: 8px;
	font-size: 0.9em;
}

.sum-of-records {
	padding: 5px;
	text-align: center;
	font-size: 0.9em;
	background: #d9eaff;
	color: #6191c1;
	border-radius: 5px;
	margin-bottom: 5px;
}

.margin-container {
	margin: 0 10px;
}

.swipe {
	position: absolute;
	top: 0;
	right: 0;
	width: 100%;
	transition: 0.3s;
}
</style>

<script>
import { link } from "svelte-spa-router";
import { addDays, format, subDays } from "date-fns";
import { useStoreon } from "@storeon/svelte";

import List from "../../components/List.svelte";
import Title from "../../components/Title.svelte";
import Avatar from "../../components/Avatar.svelte";
import DatePicker from "../../components/DatePicker.svelte";
import EmptyMessage from "../../components/EmptyMessage.svelte";
import { RECORDS_SET_DATE } from "../../stores/records";

const { records, clients, services, recordsDate, dispatch } = useStoreon(
	"records",
	"clients",
	"services",
	"recordsDate"
);

$: recordForList = $records.map(record => {
	const servicesList = $services.filter(({ id }) => record.serviceIds.includes(id));

	return {
		...record,
		client: $clients.find(({ id }) => id === record.clientId),
		services: servicesList.map(({ name }) => name),
		sumPriceOfServices: servicesList.reduce((acc, { price }) => acc + +price, 0),
	};
});

function swipe(e) {
	const maxDiff = 70;
	const minDiff = 30;

	let startPosition = 0;
	let diff = 0;

	e.addEventListener("touchmove", event => {
		diff = startPosition - event.changedTouches[0].pageX;
		if (Math.abs(diff) < minDiff) return;

		e.style.right = `${
			diff > maxDiff
				? maxDiff
				: diff < Math.abs(maxDiff) * -1
				? Math.abs(maxDiff) * -1
				: diff
		}px`;
	});

	e.addEventListener("touchstart", event => {
		startPosition = event.changedTouches[0].pageX;
	});

	e.addEventListener("touchend", () => {
		startPosition = 0;
		e.style.right = "0px";

		if (Math.abs(diff) >= maxDiff) {
			dispatch(
				RECORDS_SET_DATE,
				diff > 0 ? addDays($recordsDate, 1) : subDays($recordsDate, 1)
			);
		}
	});
}
</script>

<div class="swipe" use:swipe>
	<Title title="Мои записи" />
	<DatePicker />

	{#if recordForList.length}
		<div class="margin-container">
			<div class="sum-of-records">
				Потенциальный доход -
				{recordForList.reduce((acc, record) => acc + record.sumPriceOfServices, 0)}₽
			</div>

			<List items="{recordForList}" let:item>
				<li>
					<a
						title="Открыть запись"
						href="{`/records/${item.id}`}"
						use:link
						class="list__event-button">
						Открыть запись
					</a>

					<div class="list__item">
						<div class="list__item-content">
							<div class="client">
								<div class="client__avatar">
									<Avatar initials="{item.client?.name || 'Deleted'}" />
								</div>
								<div class="client__info">
									<div class="client__info-name">
										{item.client?.name || "Deleted"}
										{item.client?.description || ""}
									</div>
									<div class="client__info-time">
										{format(item.date, "HH:mm")}
									</div>
								</div>
								<div class="client__price">
									{item.sumPriceOfServices}₽
								</div>
							</div>
							<div class="services">
								{#each item.services as service}
									<div class="services__service">{service}</div>
								{/each}
							</div>
							{#if item.description}
								<div class="description">Примечание: {item.description}</div>
							{/if}
						</div>
					</div>
				</li>
			</List>
		</div>
	{:else}
		<EmptyMessage />
	{/if}
</div>
