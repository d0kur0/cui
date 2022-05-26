import { useNavigate, useParams } from "solid-app-router";
import { BsArrowLeft } from "solid-icons/bs";

import { Button, FileInput, Form, TextInput } from "../components/Form";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import Title from "../components/Title";
import { CreateProps } from "../storage/client";
import { clientsStore } from "../stores/clients";

export function ClientForm() {
	const { id } = useParams();
	const isCreate = !id;
	const navigate = useNavigate();

	const onSubmit = (
		event: Event & { submitter: HTMLElement } & {
			currentTarget: HTMLFormElement;
			target: Element;
		}
	) => {
		const formFields = Object.fromEntries([
			...new FormData(event.currentTarget).entries(),
		]) as CreateProps;

		clientsStore.create(formFields, () => {
			navigate("/clients");
		});
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
					<FileInput accept="image/*" name="avatar" label="Аватар" />
					<TextInput name="name" required={true} label="Имя*" placeholder="Имя Фамилия" />
					<TextInput name="description" label="Описание" placeholder="Любит хлеб" />
					<Button margin="5px 0">Сохранить</Button>
				</Form>
			</Paper>
		</Layout>
	);
}
