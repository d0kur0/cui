import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { User } from "firebase/auth";
import { createStore } from "solid-js/store";

import { auth } from "../firebase";
import { notificationsStore } from "./notifications";

export type UserStore = {
	isTick: boolean;
	isAuth: boolean;
	image: string;
	email: string;
	name: string;
	id: string;
};

const initialValue: UserStore = {
	isTick: false,
	isAuth: false,
	image: "",
	email: "",
	name: "",
	id: "",
};

function getUserFromGoogleProvider(user: User): UserStore {
	return {
		isTick: true,
		isAuth: true,
		email: user.email || "",
		image: user.photoURL || "",
		name: user.displayName || "",
		id: user.uid || "",
	};
}

export function createUserStore() {
	const [user, setUser] = createStore<UserStore>(initialValue);

	auth.onAuthStateChanged(user => {
		setUser(user ? getUserFromGoogleProvider(user) : { ...initialValue, isTick: true });
	});

	function signIn() {
		signInWithPopup(auth, new GoogleAuthProvider()).then(
			({ user }) => {
				setUser(getUserFromGoogleProvider(user));
			},
			error => {
				notificationsStore.pushNotification({
					type: "error",
					message: `При загрузке списка клиентов произошла ошибка (${error})`,
				});
			}
		);
	}

	function signOut() {}

	return {
		user,
		signIn,
		signOut,
	};
}

export const userStore = createUserStore();
