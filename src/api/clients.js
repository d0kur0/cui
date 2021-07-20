import { db } from "../firebase";

const COLLECTION = "clients";
const getPersistentKey = () => {
  return "cached-clients";
};

export const clientCreate = ({ client, userId }) => {
  const docRef = db.collection(COLLECTION).doc();
  docRef.set({ ...client, createdAt: new Date(), userId });
  return docRef.id;
};

export const clientGetAll = async ({ userId }) => {
  const resource = await db.collection(COLLECTION).where("userId", "==", userId).get();
  const clients = resource.docs.map(doc => {
    const client = doc.data();
    return { id: doc.id, ...doc.data(), createdAt: client.createdAt.toDate() };
  });

  return clients.sort((a, b) => b.createdAt - a.createdAt);
};

export const clientDelete = async ({ clientId }) => {
  return db.collection(COLLECTION).doc(clientId).delete();
};

export const clientUpdate = async ({ client }) => {
  return db.collection(COLLECTION).doc(client.id).update(client);
};

export const clientGetFormCache = () => {
  const persistentKey = getPersistentKey();
  const cachedClients = localStorage.getItem(persistentKey);

  if (cachedClients) {
    try {
      return JSON.parse(cachedClients);
    } catch (error) {
      console.warn("error on clientGetFormCache");
      console.error(error);
      localStorage.removeItem(persistentKey);
      return null;
    }
  }
};

export const clientSetToCache = ({ clients }) => {
  if (!clients) return;
  const persistentKey = getPersistentKey();

  try {
    const clientsAsJson = JSON.stringify(clients);
    localStorage.setItem(persistentKey, clientsAsJson);
  } catch (error) {
    console.warn("error on clientSetToCache");
    console.error(error);
  }
};
