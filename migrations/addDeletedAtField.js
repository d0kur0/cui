const admin = require("firebase-admin");
// Project settings -> Service accounts
const serviceAccount = require("../admin-sdk.json");

const app = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://cuiapp-bb7e8-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const firestore = app.firestore();

const addDeletedAtField = async collectionName => {
	const resource = await firestore.collection(collectionName).get();

	for (const doc of resource.docs) {
		await firestore
			.collection(collectionName)
			.doc(doc.id)
			.update({ ...doc.data(), deletedAt: null });
	}
};

(async () => {
	for (let collection of ["records", "services", "clients"]) {
		await addDeletedAtField(collection);
	}
})();
