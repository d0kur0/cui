import { useNavigate, useParams } from "solid-app-router";
import { BsArrowLeft } from "solid-icons/bs";
import { createMemo, createSignal } from "solid-js";

import { Button, Form, TextInput } from "../components/Form";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import Title from "../components/Title";
import { CreateProps } from "../storage/service";
import { servicesStore } from "../stores/services";

export default function ServiceForm() {
	const { id } = useParams();
	const isCreate = !id;
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = createSignal(false);
	const { services, create, update } = servicesStore;
	const service = createMemo(() => services.list.find(service => service.id === id));

	const onSubmit = (
		event: Event & { submitter: HTMLElement } & {
			currentTarget: HTMLFormElement;
			target: Element;
		}
	) => {
		setIsLoading(true);

		const formFields = Object.fromEntries([...new FormData(event.currentTarget).entries()]) as CreateProps;

		const onDone = () => {
			navigate("/services");
			setIsLoading(false);
		};

		isCreate ? create(formFields, onDone) : update({ ...formFields, serviceId: service()?.id || "" }, onDone);
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
					title={isCreate ? "Добавление услуги" : "Редактирование услуги"}
				/>
			}
			navBar={<NavBar />}>
			<Paper autoHeight={true}>
				<Form onSubmit={onSubmit}>
					<TextInput
						value={service()?.name}
						name="name"
						required={true}
						label="Название*"
						placeholder="Опил когтей"
					/>
					<TextInput
						type="number"
						value={service()?.price.toString()}
						name="price"
						label="Стоимость"
						placeholder="500"
					/>
					<Button nativeType="submit" fullWidth={true} isLoading={isLoading()} margin="5px 0">
						Сохранить
					</Button>
				</Form>
			</Paper>
		</Layout>
	);
}
