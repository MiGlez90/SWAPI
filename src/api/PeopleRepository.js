import {FirestoreFunctions} from "./FirestoreBaseAPI";

export const PeopleRepository = (function () {

    const collectionName = "people";

    const getFilm = (docRef) => {
        return docRef.get()
            .then(doc => {
                return Promise.resolve({id: doc.id, ...doc.data()})
            })
            .catch(Promise.reject);
    };

    const getPeople = () => {
        return FirestoreFunctions.get(collectionName)
            .then(people => {
                if (people) {
                    let peoplePromises = [];
                    people.forEach(person => {
                        peoplePromises.push(new Promise((resolve, reject) => {
                            if (person.films) {
                                let filmsPromises = person.films.map(getFilm);
                                Promise.all(filmsPromises)
                                    .then(films => {
                                        console.log(films);
                                        person.films = films;
                                        resolve(person)
                                    })
                                    .catch(reject)
                            }
                        }));
                    });
                    return Promise.all(peoplePromises)
                        .then(people => {
                            console.log(people);
                            return Promise.resolve(people);
                        })
                        .catch(console.error)
                }
            })
            .catch(console.error);
    };

    const getPerson = (idPerson) => {
        return FirestoreFunctions.getById(collectionName, idPerson);
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