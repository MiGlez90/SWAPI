import {FirestoreFunctions} from "./FirestoreBaseAPI";

export const PeopleRepository = (function () {

	const collectionName = "people";

	const getDocument = (docRef) => {
		return docRef
			.get()
			.then(doc => {
				return Promise.resolve({id: doc.id, ...doc.data()})
			})
			.catch((e) => Promise.reject(e));
	};

	const getHomeWorld = (document) => {
		if (document.homeworld) {
			return getDocument(document.homeworld);
		} else {
			return Promise.resolve({});
		}
	};

	const getFilms = (document) => {
		if (document.films && document.films.length > 0) {
			let filmsPromises = document.films.map(getDocument);
			return Promise.all(filmsPromises);
		} else {
			return Promise.resolve([]);
		}
	};

	const getSpecies = (document) => {
		if (document.species && document.species.length > 0) {
			let speciesPromises = document.species.map(getDocument);
			return Promise.all(speciesPromises);
		} else {
			return Promise.resolve([]);
		}
	};

	const getStarships = (document) => {
		if (document.starships && document.starships.length > 0) {
			let starshipsPromises = document.starships.map(getDocument);
			return Promise.all(starshipsPromises);
		} else {
			return Promise.resolve([]);
		}
	};

	const getVehicles = (document) => {
		if (document["vehicles"] && document["vehicles"].length > 0) {
			let promises = document["vehicles"].map(getDocument);
			return Promise.all(promises);
		} else {
			return Promise.resolve([]);
		}
	};

	const getMoreInfo = (document) => {
		return new Promise((resolve, reject) => {
			let personPromises = [];
			personPromises.push(getFilms(document));
			personPromises.push(getHomeWorld(document));
			personPromises.push(getSpecies(document));
			personPromises.push(getStarships(document));
			personPromises.push(getVehicles(document));
			return Promise
				.all(personPromises)
				.then(values => {
					let person = {
						...document,
						films: values["0"],
						homeworld: values["1"],
						species: values["2"],
						starships: values["3"],
						vehicles: values["4"]
					};
					// console.log(person);
					resolve(person)
				})
				.catch((e) => reject(e))

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
							// console.log(people);
							return Promise.resolve(people);
						})
						.catch((e) => Promise.reject(e))
				}
			})
			.catch((e) => Promise.reject(e));
	};

	const getPerson = (idPerson) => {
		return FirestoreFunctions
			.getById(collectionName, idPerson)
			.then(document => {
				return getMoreInfo(document)
			})
			.catch(console.error);
	};


	// const getRawMoreInfo = (person) => {
	// 	person.films = person.films.map(film => film.id);
	// 	person.homeworld = person.homeworld.id;
	// 	person.species = person.species.map(specie => specie.id);
	// 	person.starships = person.starships.map(starship => starship.id);
	// 	person.vehicles = person.vehicles.map(vehicle => vehicle.id);
	// 	return Promise.resolve(person);
	// };

	const getRawPerson = (idPerson) => {
		return FirestoreFunctions
			.getById(collectionName, idPerson)
			.then(document => {
				return Promise.resolve(document)
			})
			.catch(error => Promise.reject(error));
	};

	const addPerson = (document) => {
		return FirestoreFunctions.add(collectionName, document);
	};

	const updatePerson = (idPerson, document) => {
		return FirestoreFunctions.patch(collectionName, idPerson, document);
	};

	const removePerson = (idPerson) => {
		return FirestoreFunctions.remove(collectionName, idPerson);
	};

	return {
		getPeople,
		getPerson,
		addPerson,
		updatePerson,
		getRawPerson,
		removePerson
	}
})();