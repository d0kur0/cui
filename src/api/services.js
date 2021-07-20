import { db } from "../firebase";

const COLLECTION = "services";
const getPersistentKey = () => {
  return "cached-services";
};

export const serviceCreate = ({ userId, service }) => {
  service = { ...service, createdAt: new Date(), userId };
  const docRef = db.collection(COLLECTION).doc();
  docRef.set(service);
  return docRef.id;
};

export const serviceGetAll = async ({ userId }) => {
  const resource = await db.collection(COLLECTION).where("userId", "==", userId).get();

  const services = resource.docs.map(doc => {
    const service = doc.data();
    return { id: doc.id, ...doc.data(), createdAt: service.createdAt.toDate() };
  });

  return services.sort((a, b) => b.createdAt - a.createdAt);
};

export const serviceDelete = async ({ serviceId }) => {
  return db.collection(COLLECTION).doc(serviceId).delete();
};

export const serviceUpdate = async ({ service }) => {
  return db.collection(COLLECTION).doc(service.id).update(service);
};

export const serviceGetFormCache = () => {
  const persistentKey = getPersistentKey();
  const cachedServices = localStorage.getItem(persistentKey);

  if (cachedServices) {
    try {
      return JSON.parse(cachedServices);
    } catch (error) {
      localStorage.removeItem(persistentKey);
      console.warn("error on serviceGetFormCache");
      console.error(error);
      return null;
    }
  }
};

export const serviceSetToCache = ({ services }) => {
  if (!services || !services.length) return;
  const persistentKey = getPersistentKey();

  try {
    const servicesAsJson = JSON.stringify(services);
    localStorage.setItem(persistentKey, servicesAsJson);
  } catch (error) {
    console.warn("error on serviceSetToCache");
    console.error(error);
  }
};
