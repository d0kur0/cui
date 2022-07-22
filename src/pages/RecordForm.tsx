import { format } from "date-fns";
import { useNavigate, useParams } from "solid-app-router";
import { BsArrowLeft } from "solid-icons/bs";
import { createMemo, createSignal } from "solid-js";

import { ClientPicker } from "../components/ClientPicker";
import { Button, Form, TextInput } from "../components/Form";
import { Layout } from "../components/Layout";
import { NavBar } from "../components/NavBar";
import { Paper } from "../components/Paper";
import { ServicesPicker } from "../components/ServicesPicker";
import { Title } from "../components/Title";

import { CreateProps } from "../storage/record";
import { useStore } from "../stores";

export function RecordForm() {
	const { id } = useParams();
	const isCreate = !id;
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = createSignal(false);
	const { records, create, update } = useStore("records");
	const record = createMemo(() => records.list.find(service => service.id === id));
	const { pushWarning } = useStore("notifications");

	const onSubmit = (
		event: Event & { submitter: HTMLElement } & {
			currentTarget: HTMLFormElement;
			target: Element;
		}
	) => {
		const formFields = Object.fromEntries([
			...new FormData(event.currentTarget).entries(),
		]) as unknown as CreateProps;

		console.log(formFields);

		if (!formFields.clientId) return pushWarning("Выберите клиента");
		if (!formFields.serviceIds) return pushWarning("Выберите услугу");

		setIsLoading(true);

		const onDone = () => {
			navigate("/");
			setIsLoading(false);
		};

		isCreate ? create(formFields, onDone) : update({ ...formFields, recordId: record()?.id || "" }, onDone);
	};

	const recordDate = createMemo(() =>
		format((isCreate ? records.currentDate : record()?.date.toDate()) || new Date(), "yyyy-MM-dd'T'HH:mm")
	);

	return (
		<Layout
			title={
				<Title
					leftChildren={
						<button onClick={() => history.back()}>
							<BsArrowLeft size={24} />
						</button>
					}
					title={isCreate ? "Добавление записи" : "Редактирование записи"}
				/>
			}
			navBar={<NavBar />}>
			<Paper autoHeight={true}>
				<Form onSubmit={onSubmit}>
					<TextInput
						value={recordDate()}
						type="datetime-local"
						name="date"
						required={true}
						label="Дата записи*"
					/>
					<TextInput
						value={record()?.description}
						placeholder="Помыть пятку"
						type="text"
						name="description"
						label="Примечание"
					/>
					<ClientPicker defaultClientId={record()?.clientId} />
					<ServicesPicker defaultServiceIds={[...(record()?.serviceIds || [])]} />
					<Button nativeType="submit" fullWidth={true} isLoading={isLoading()} margin="5px 0">
						Сохранить
					</Button>
				</Form>
			</Paper>
		</Layout>
	);
}
