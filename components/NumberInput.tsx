import {Dispatch, SetStateAction} from "react";

interface Props {
    name: String
    step?: number
    disabled?: boolean
    value?: number,
    onChange?: Dispatch<SetStateAction<any>>
}

export const NumberInput = ({name, step, disabled, value, onChange = ()=>{}}:Props) => {

    return (
        <div className={'row-span-1'}>
            <label htmlFor={'inputA'} className={'block text-sm font-medium leading-6 text-gray-900'}>
                {name}
            </label>
            <div className={'relative mt-2 rounded-md shadow-md'}>
                <input
                    onChange={(e)=>onChange(Number(e.target.value))}
                    type={'number'}
                    name={name.toCamelCase()}
                    id={name.toCamelCase()}
                    className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                    step={step || 0.01}
                    placeholder={'0.00'}
                    disabled={!!disabled}
                    value={value || ""}
                />
            </div>
        </div>
    )
}