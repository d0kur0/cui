import Title from "../components/Title";
import { BsArrowLeft } from "solid-icons/bs";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import Layout from "../components/Layout";
import { useParams } from "solid-app-router";
import { Button, FileInput, Form, TextInput } from "../components/Form";
import { clientsStore } from "../stores/clients";

type FormFields = {
	avatar: File;
	name: string;
	description: string;
};

export function ClientForm() {
	const { id } = useParams();
	const isCreate = !id;
	const { createClient } = clientsStore;

	const onSubmit = (
		event: Event & { submitter: HTMLElement } & {
			currentTarget: HTMLFormElement;
			target: Element;
		}
	) => {
		const formFields = Object.fromEntries([
			...new FormData(event.currentTarget).entries(),
		]) as FormFields;
		createClient(formFields);
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
