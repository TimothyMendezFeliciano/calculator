import {CgMathDivide, CgMathMinus, CgMathPlus} from "react-icons/cg";
import {ImCross} from "react-icons/im";
import {OperandInterface} from "@/models/OperandInterface";

export const operands: OperandInterface[] = [
    {
        name: 'addition',
        icon: CgMathPlus,
        symbol: '+'
    },
    {
        name: 'subtraction',
        icon: CgMathMinus,
        symbol: '-'
    },
    {
        name: 'multiplication',
        icon: ImCross,
        symbol: 'x'
    },
    {
        name: 'division',
        icon: CgMathDivide,
        symbol: '÷'
    },
]