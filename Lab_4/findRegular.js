
import { dirDegrees } from "./calcDegrees.js";

const findRegular = (degree) => {
    const set = new Set(degree);

    if (set.size === 1) {
        return { true: true, degree: set };
    } else {
        return false ;
    }
}

let isRegular = findRegular(dirDegrees);

export {isRegular}

