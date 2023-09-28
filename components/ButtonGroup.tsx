import {Dispatch, SetStateAction} from "react";
import {OperandInterface} from "@/models/OperandInterface";

interface Props {
    operands: OperandInterface[]
    action: Dispatch<SetStateAction<any>>
}

export const ButtonGroup = ({operands,action}: Props) => {

    return (
        <span className={'isolate rounded-md shadow-sm'}>
                {operands.map((op, index) => (
                    <button
                        key={op.name}
                        type={'button'}
                        onClick={() => action(op.name)}
                        className={
                            index === 0 ? "relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                                : index === operands.length - 1 ? "relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                                    : "relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                        }
                    >
                        <op.icon/>
                    </button>
                ))}
        </span>
    )
}