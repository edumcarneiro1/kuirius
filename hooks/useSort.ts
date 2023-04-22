import { parse } from "path";

export const sort = (values: any[], condition: string) => {
    return [...values.sort(dynamicSort(condition))];
};


const dynamicSort = (condition: string) => {
    var sortOrder = 1;
    if(condition[0] === "-") {
        sortOrder = -1;
        condition = condition.substr(1);
    }
    return (a,b) => {
        let valueA = a[condition];
        let valueB = b[condition];

        if (condition === 'score' || condition === '-score') {
            valueA = parseInt( a[condition]);
            valueB = parseInt( b[condition]);
        }

        const result = (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0;
        return result * sortOrder;
    }
}