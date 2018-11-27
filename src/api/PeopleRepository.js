import {FirestoreFunctions} from "./FirestoreBaseAPI";

export const PeopleRepository = (function () {

	const collectionName = "people";

	const getDocument = (docRef) => {
		return docRef
			.get()
			.then(doc => {
				return Promise.resolve({id: doc.id, ...doc.data()})
			})
			.catch(Promise.reject);
	};

	const getMoreInfo = (document) => {
		return new Promise((resolve, reject) => {
			if (document.films) {
				let filmsPromises = document.films.map(getDocument);
				Promise
					.all(filmsPromises)
					.then(films => {
						document.films = films;
						if (document.homeworld) {
							getDocument(document.homeworld)
								.then(homeWorld => {
									document.homeworld = homeWorld;
									resolve(document);
								})
								.catch(reject)
						} else {
							resolve(document);
						}
					})
					.catch(reject)
			} else {
				resolve(document)
			}
		})
	};

	const getPeople = () => {
		return FirestoreFunctions
			.get(collectionName)
			.then(people => {
				if (people) {
					let peoplePromises = [];
					people.forEach(person => {
						peoplePromises.push(getMoreInfo(person));
					});
					return Promise
						.all(peoplePromises)
						.then(people => {
							console.log(people);
							return Promise.resolve(people);
						})
						.catch(Promise.reject)
				}
			})
			.catch(Promise.reject);
	};

	const getPerson = (idPerson) => {
		return FirestoreFunctions
			.getById(collectionName, idPerson)
			.then(document => {
				return getMoreInfo(document)
			})
			.catch(console.error);
	};

	const addPerson = (document) => {
		return FirestoreFunctions.add(collectionName, document);
	};

	const updatePerson = (idPerson, document) => {
		return FirestoreFunctions.patch(collectionName, idPerson, document);
	};

	return {
		getPeople,
		getPerson,
		addPerson,
		updatePerson
	}
})();