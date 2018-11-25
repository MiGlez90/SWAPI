import * as fireStoreFunctions from "./FirestoreBaseAPI";

const collectionName = "people";

const getFilm = (docRef) => {
    return docRef.get()
        .then( doc => {
            return Promise.resolve({id: doc.id, ...doc.data()})
        })
        .catch( Promise.reject );
};

export const getPeople = () => {
    return fireStoreFunctions.get(collectionName)
        .then( people => {
           if( people ){
               let peoplePromises = [];
               people.forEach( person => {
                   peoplePromises.push( new Promise( (resolve, reject) => {
                       if( person.films){
                           let filmsPromises = person.films.map( getFilm );
                           Promise.all(filmsPromises)
                               .then( films => {
                                   console.log(films);
                                   person.films = films;
                                   resolve(person)
                               })
                               .catch( reject )
                       }
                   }));
               });
               return Promise.all( peoplePromises )
                   .then( people => {
                       console.log(people);
                       return Promise.resolve(people);
                   })
                   .catch( console.error )
           }
        })
        .catch( console.error );
};

export const getPerson = (idPerson) => {
    return fireStoreFunctions.getById(collectionName, idPerson);
};

export const addPerson = (document) => {
    return fireStoreFunctions.add(collectionName, document);
};

export const updatePerson = (idPerson, document) => {
    return fireStoreFunctions.patch(collectionName, idPerson, document);
};