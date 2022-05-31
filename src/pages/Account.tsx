import { BsArrowLeft } from "solid-icons/bs";

import { Avatar } from "../components/Avatar";
import { Card, CardAvatar, CardHeader, CardInfo, CardMainRow, CardSecondRow } from "../components/Card";
import { Button, ButtonGroup } from "../components/Form";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import Paper from "../components/Paper";
import Title from "../components/Title";
import { userStore } from "../stores/user";

function Account() {
	const { user } = userStore;
	const handleSignOut = () => userStore.signOut(() => location.replace("/"));

	return (
		<Layout
			title={
				<Title
					leftChildren={
						<button onClick={() => history.back()}>
							<BsArrowLeft size={24} />
						</button>
					}
					title="Записи"
				/>
			}
			navBar={<NavBar />}>
			<Paper autoHeight={true}>
				<Card>
					<CardHeader>
						<CardAvatar>
							<Avatar size="large" imageSrc={user.image}></Avatar>
						</CardAvatar>
						<CardInfo>
							<CardMainRow>{user.name}</CardMainRow>
							<CardSecondRow>{user.email}</CardSecondRow>
						</CardInfo>
					</CardHeader>
				</Card>
			</Paper>

			<ButtonGroup>
				<Button onClick={handleSignOut} fullWidth={true} type="danger">
					Выйти из аккаунта
				</Button>
			</ButtonGroup>
		</Layout>
	);
}

export default Account;
