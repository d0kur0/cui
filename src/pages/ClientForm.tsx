import { useNavigate, useParams } from "solid-app-router";
import { BsArrowLeft } from "solid-icons/bs";
import { createMemo, createSignal } from "solid-js";

import { Avatar } from "../components/Avatar";
import { Button, FileInput, Form, TextInput } from "../components/Form";
import { Layout } from "../components/Layout";
import { NavBar } from "../components/NavBar";
import { Paper } from "../components/Paper";
import { Title } from "../components/Title";

import { CreateProps } from "../storage/client";
import { useStore } from "../stores";

export function ClientForm() {
	const { id } = useParams();
	const isCreate = !id;
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = createSignal(false);
	const { clients, create, update } = useStore("clients");
	const client = createMemo(() => clients.list.find(client => client.id === id));

	const onSubmit = (
		event: Event & { submitter: HTMLElement } & {
			currentTarget: HTMLFormElement;
			target: Element;
		}
	) => {
		setIsLoading(true);

		const formFields = Object.fromEntries([...new FormData(event.currentTarget).entries()]) as CreateProps;

		const onDone = () => {
			navigate("/clients");
			setIsLoading(false);
		};

		isCreate && create(formFields, onDone);
		isCreate || update({ ...formFields, clientId: client()?.id || "" }, onDone);
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
					title={isCreate ? "Добавление клиента" : "Редактирование клиента"}
				/>
			}
			navBar={<NavBar />}>
			<Paper autoHeight={true}>
				<Form onSubmit={onSubmit}>
					{isCreate || <Avatar margin="10px 0 0 0" imageSrc={client()?.avatar} name={client()?.name} />}
					<FileInput accept="image/*" name="avatar" label="Аватар" />
					<TextInput
						value={client()?.name}
						name="name"
						required={true}
						label="Имя*"
						placeholder="Имя Фамилия"
					/>
					<TextInput
						value={client()?.description}
						name="description"
						label="Описание"
						placeholder="Любит хлеб"
					/>
					<Button nativeType="submit" fullWidth={true} isLoading={isLoading()} margin="5px 0">
						Сохранить
					</Button>
				</Form>
			</Paper>
		</Layout>
	);
}
