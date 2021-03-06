import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { db, storage } from "../firebase";
import { useStore } from "../stores";

export type Client = {
	id: string;
	name: string;
	userId: string;
	avatar: string;
	createdAt: Timestamp;
	deletedAt: Timestamp | null;
	description: string;
};

export type ClientAdditionalInfo = {
	latestRecord: Timestamp | null;
	countRecords: number;
};

// fetchAllOwnedByUser
async function fetchAllOwnedByUser(userId: string): Promise<Client[]> {
	const _query = query(
		collection(db, "clients"),
		where("userId", "==", userId),
		orderBy("createdAt", "desc")
	);
	const { docs } = await getDocs(_query);
	return docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
}

// fetchAdditionalInfo
export type FetchAdditionalInfoProps = {
	clientId: string;
	userId: string;
};

async function fetchAdditionalInfo({
	userId,
	clientId,
}: FetchAdditionalInfoProps): Promise<ClientAdditionalInfo> {
	const _query = query(
		collection(db, "records"),
		where("clientId", "==", clientId),
		where("userId", "==", userId),
		orderBy("createdAt", "asc")
	);

	const { docs } = await getDocs(_query);

	return {
		countRecords: docs.length,
		latestRecord: docs.pop()?.data()?.createdAt || null,
	};
}

// save avatar
type SaveClientAvatarProps = {
	file: File;
	clientId: string;
};

async function saveClientAvatar({ file, clientId }: SaveClientAvatarProps): Promise<string> {
	const ALLOWED_TYPES = ["png", "jpeg", "jpg", "gif"];
	const [, imageType] = file.type.split("/");

	if (!file.size || !file.type.includes("image") || !ALLOWED_TYPES.includes(imageType)) return "";

	const avatarRef = ref(storage, `client_avatar_${clientId}`);
	const avatarSnapshot = await uploadBytes(avatarRef, file);

	return await getDownloadURL(avatarSnapshot.ref);
}

// create
export type CreateProps = {
	name: string;
	avatar: File;
	description: string;
};

async function create({ name, description, avatar }: CreateProps): Promise<Client> {
	const { user } = useStore("user");

	const clientObject = {
		name,
		userId: user.id,
		avatar: "",
		createdAt: Timestamp.now(),
		deletedAt: null,
		description,
	};

	const newClient = await addDoc(collection(db, "clients"), clientObject);
	const avatarUrl = await saveClientAvatar({ clientId: newClient.id, file: avatar });

	avatarUrl && (await updateDoc(newClient, { avatar: avatarUrl }));

	return { ...clientObject, id: newClient.id, avatar: avatarUrl };
}

// update
export type UpdateProps = {
	name: string;
	avatar: File;
	description: string;
	clientId: string;
};

async function update(props: UpdateProps): Promise<Client> {
	const clientRef = doc(collection(db, "clients"), props.clientId);
	const clientSnap = await getDoc(clientRef);
	const client = { ...clientSnap.data() } as Client;

	client.name = props.name;
	client.description = props.description;

	const avatarUrl = await saveClientAvatar({
		clientId: props.clientId,
		file: props.avatar,
	});

	avatarUrl && (client["avatar"] = avatarUrl);
	await updateDoc(clientRef, client);
	return { ...client, id: clientSnap.id };
}

// toArchive
async function toArchive(clientId: string) {
	const clientRef = doc(collection(db, "clients"), clientId);
	await updateDoc(clientRef, { deletedAt: Timestamp.now() });
}

export const clientStorage = {
	fetchAllOwnedByUser,
	fetchAdditionalInfo,
	toArchive,
	create,
	update,
};
