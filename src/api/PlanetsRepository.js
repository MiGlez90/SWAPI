import {FirestoreFunctions} from "./FirestoreBaseAPI";

export const PlanetsRepository = (function () {

    const collectionName = "planets";

    const getPlanets = () => {
        return FirestoreFunctions.get(collectionName);
    };

    const getPlanet = (idPlanet) => {
        return FirestoreFunctions.getById(collectionName, idPlanet);
    };

    const addPlanet = (document) => {
        return FirestoreFunctions.add(collectionName, document);
    };

    const updatePlanet = (idPlanet, document) => {
        return FirestoreFunctions.patch(collectionName, idPlanet, document);
    };

    return {
        getPlanets,
        getPlanet,
        addPlanet,
        updatePlanet
    }
})();