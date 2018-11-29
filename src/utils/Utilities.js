export const Utilities = (function () {
    const distributeDataInBsRows = function (data, numberOfRows) {
        let peopleCard = [];
        let row = [];
        let counter = 0;
        let length = Math.ceil(data.length / numberOfRows);
        for (let i = 0; i < length; i++) {
            row = [];
            for (let j = 0; j < numberOfRows; ++j) {
                let person = data[counter];
                row.push(person);
                counter++;
            }
            peopleCard.push(row);
        }
        return peopleCard;
    };

    return {
        distributeDataInBsRows
    }
})();