var admin = require("firebase-admin");

var serviceAccount = require("../admin-sdk.json");

const app = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://cuiapp-bb7e8-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const firestore = app.firestore();

(async () => {
	{
		const resource = await firestore.collection("clients").get();

		for (const doc of resource.docs) {
			firestore
				.collection("clients")
				.doc(doc.id)
				.update({ ...doc.data(), deletedAt: null });
		}
	}

	{
		const resource = await firestore.collection("services").get();

		for (const doc of resource.docs) {
			firestore
				.collection("services")
				.doc(doc.id)
				.update({ ...doc.data(), deletedAt: null });
		}
	}
})();
