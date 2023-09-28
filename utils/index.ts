import {toast} from "react-toastify";


export function parseMathString(inputString: string) {
    const parts = inputString.split(' ')

    if (parts.length >= 5) {
        const inputA = parseFloat(parts[0]);
        const operand = parts[1];
        const inputB = parseFloat(parts[2]);
        const result = parseFloat(parts[4]);

        if (!isNaN(inputA) && !isNaN(inputB) && !isNaN(result)) {
            return {inputA, operand, inputB, result};
        }
    }
}

export const notify = (message: string) => {
    toast(message)
}

