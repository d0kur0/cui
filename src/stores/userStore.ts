import { GoogleAuthProvider, UserCredential, signInWithPopup, signOut as signOutGoogle } from "firebase/auth";
import { User } from "firebase/auth";
import { createStore } from "solid-js/store";

import { auth } from "../firebase";
import { notificationsStore } from "./notificationsStore";

export type UserStore = {
	id: string;
	name: string;
	email: string;
	image: string;
	isTick: boolean;
	isAuth: boolean;
};

const initialValue: UserStore = {
	id: "",
	name: "",
	email: "",
	image: "",
	isTick: false,
	isAuth: false,
};

function getUserFromGoogleProvider(user: User): UserStore {
	return {
		id: user.uid || "",
		name: user.displayName || "",
		image: user.photoURL || "",
		email: user.email || "",
		isTick: true,
		isAuth: true,
	};
}

const { pushError } = notificationsStore;
const errorHandler = (err: Error) => pushError(err.message);

export function userFactory() {
	const [store, setStore] = createStore<UserStore>(initialValue);

	auth.onAuthStateChanged(user =>
		setStore(user ? getUserFromGoogleProvider(user) : { ...initialValue, isTick: true })
	);

	function signIn() {
		const onSignedIn = ({ user }: UserCredential) => {
			setStore(getUserFromGoogleProvider(user));
		};

		signInWithPopup(auth, new GoogleAuthProvider()).then(onSignedIn, errorHandler);
	}

	function signOut(onSignOut: () => void) {
		const onSignedOut = () => {
			setStore(initialValue);
			onSignOut?.();
		};

		signOutGoogle(auth).then(onSignedOut, errorHandler);
	}

	return {
		user: store,
		signIn,
		signOut,
	};
}

export const userStore = userFactory();
