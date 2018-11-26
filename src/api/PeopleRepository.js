import {FirestoreFunctions} from "./FirestoreBaseAPI";

export const PeopleRepository = (function () {

    const collectionName = "people";

    const getDocument = (docRef) => {
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
                                let filmsPromises = person.films.map(getDocument);
                                Promise.all(filmsPromises)
                                    .then(films => {
                                        console.log(films);
                                        person.films = films;
                                        if (person.homeworld) {
                                            getDocument(person.homeworld)
                                                .then(homeWorld => {
                                                    person.homeworld = homeWorld;
                                                    resolve(person);
                                                })
                                                .catch(reject)
                                        }else {
                                            resolve(person);
                                        }
                                    })
                                    .catch(reject)
                            } else {
                                resolve(person)
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