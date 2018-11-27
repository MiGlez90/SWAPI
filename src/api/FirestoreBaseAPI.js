import db from './Firestore';

export const FirestoreFunctions = (function () {
	const get = (collectionName) => {
		return new Promise((resolve, reject) => {
			let data = [];
			db.collection(collectionName).get()
			  .then(snapshot => {
				  snapshot.forEach(doc => {
					  let document = doc.data();
					  document.id = doc.id;
					  data.push(document);
				  });
				  resolve(data);
			  })
			  .catch(e => reject(e));
		});
	};

	const getById = (collectionName, id) => {
		return new Promise((resolve, reject) => {
			db.collection(collectionName).doc(id).get()
			  .then(doc => {
				  if (!doc.exists) {
					  reject('No such document!');
				  } else {
					  let document = {id: doc.id, ...doc.data()};
					  resolve(document);
				  }
			  })
			  .catch(e => {
				  reject(e);
			  });
		});
	};

	const add = (collectionName, document) => {
		return new Promise((resolve, reject) => {
			db.collection(collectionName).add(document)
			  .then(function (docRef) {
				  docRef.get()
						.then(document => {
							let documentFormatted = {id: document.id, ...document.data()};
							resolve(documentFormatted);
						})
						.catch(reject);
			  })
			  .catch(function (error) {
				  reject(error);
			  });
		});
	};

	const put = (collectionName, id, document) => {
		return new Promise((resolve, reject) => {
			db.collection(collectionName).doc(id).set(document)
			  .then(function () {
				  resolve("Document successfully written!");
			  })
			  .catch(function (error) {
				  reject(error);
			  });
		});
	};

	const patch = (collectionName, id, document) => {
		return new Promise((resolve, reject) => {
			db.collection(collectionName).doc(id).update(document)
			  .then(function () {
				  resolve("Document successfully updated!");
			  })
			  .catch(function (error) {
				  reject(error);
			  });
		});
	};

	const remove = (collectionName, id) => {
		return new Promise((resolve, reject) => {
			db.collection(collectionName).doc(id).delete()
			  .then(function () {
				  resolve("Document successfully deleted!");
			  })
			  .catch(function (error) {
				  reject(error);
			  });
		});
	};

	return {
		get,
		getById,
		put,
		add,
		patch,
		remove
	}
})();

