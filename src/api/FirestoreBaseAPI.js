import db from './Firestore';

export const get = (collectionName) => {
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

export const getById = (collectionName, id) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).get().doc(id)
            .then(doc => {
                console.log(doc.data());
                if (!doc.exists) {
                    reject('No such document!');
                } else {
                    resolve(doc.data());
                }
            })
            .catch(e => {
                reject(e);
            });
    });
};

export const add = (collectionName, document) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName).add(document)
            .then(function (docRef) {
                resolve(docRef)
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

export const put = (collectionName, id, document) => {
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

export const patch = (collectionName, id, document) => {
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

export const remove = (collectionName, id) => {
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