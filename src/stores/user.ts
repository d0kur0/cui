import { GoogleAuthProvider, signInWithPopup, signOut as signOutGoogle } from "firebase/auth";
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

const { pushError } = notificationsStore;

export function createUserStore() {
	const [user, setUser] = createStore<UserStore>(initialValue);

	auth.onAuthStateChanged(user =>
		setUser(user ? getUserFromGoogleProvider(user) : { ...initialValue, isTick: true })
	);

	function signIn() {
		signInWithPopup(auth, new GoogleAuthProvider()).then(
			({ user }) => setUser(getUserFromGoogleProvider(user)),
			err => pushError(err.message)
		);
	}

	function signOut(onSignOut: () => void) {
		signOutGoogle(auth)
			.then(() => {
				setUser(initialValue);
				onSignOut?.();
			})
			.catch(error => pushError(error.message));
	}

	return {
		user,
		signIn,
		signOut,
	};
}

export const userStore = createUserStore();
