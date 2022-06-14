import { useNavigate, useParams } from "solid-app-router";
import { BsArrowLeft } from "solid-icons/bs";
import { createMemo, createSignal } from "solid-js";

import { Button, Form, TextInput } from "../components/Form";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import Title from "../components/Title";
import { CreateProps } from "../storage/record";
import { recordsStore } from "../stores/records";

export default function RecordForm() {
	const { id } = useParams();
	const isCreate = !id;
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = createSignal(false);
	const { records, create, update } = recordsStore;
	const record = createMemo(() => records.list.find(service => service.id === id));

	const onSubmit = (
		event: Event & { submitter: HTMLElement } & {
			currentTarget: HTMLFormElement;
			target: Element;
		}
	) => {
		setIsLoading(true);

		const formFields = Object.fromEntries([...new FormData(event.currentTarget).entries()]) as CreateProps;

		const onDone = () => {
			navigate("/");
			setIsLoading(false);
		};

		isCreate ? create(formFields, onDone) : update({ ...formFields, serviceId: record()?.id || "" }, onDone);
	};

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
					<TextInput value={"123"} name="name" required={true} label="Название*" placeholder="Опил когтей" />
					<Button fullWidth={true} isLoading={isLoading()} margin="5px 0">
						Сохранить
					</Button>
				</Form>
			</Paper>
		</Layout>
	);
}
