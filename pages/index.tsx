import {NumberInput} from "@/components/NumberInput";
import "../customStringMethod"
import {useCallback, useMemo, useState} from "react";
import {ButtonGroup} from "@/components/ButtonGroup";
import {operands} from "@/utils/constants";
import {AiOutlineSave} from "react-icons/ai";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {notify} from "@/utils";
import {Calculator} from "@prisma/client";
import useGetHistory from "@/hooks/useGetHistory";
import Lists from "@/components/Lists";

export const getServerSideProps = (async (context) => {
    const response = await fetch("http://localhost:3000/api/get_allCalculations", {
        method: "GET"
    })

    const {payload} = await response.json()
    const allCalculations: Calculator[] = payload.data;

    const history: string[] = allCalculations.map(item =>
        `${item.inputA} ${item.operand} ${item.inputB} = ${item.result}`)
    return {
        props: {
            data: history
        }
    }
})

export default function Home({data}) {


    const {history, retry} = useGetHistory(data)
    console.log('History', history)
    const [inputA, setInputA] = useState<number>(0)
    const [inputB, setInputB] = useState<number>(0)
    const [operand, setOperand] = useState<string>('addition')
    const [lastResult, setLastResult] = useState<string>()

    const valueResult = useMemo(() => {
        let result = 0;
        const symbol = operands.find(op => op.name === operand)?.symbol
        switch (operand) {
            case "addition":
                result = inputA + inputB
                setLastResult(`${inputA} ${symbol} ${inputB} = ${result}`)
                return result
            case "subtraction":
                result = inputA - inputB
                setLastResult(`${inputA} ${symbol} ${inputB} = ${result}`)
                return result
            case "multiplication":
                result = inputA * inputB
                setLastResult(`${inputA} ${symbol} ${inputB} = ${result}`)
                return result
            case "division":
                result = inputA / inputB
                setLastResult(`${inputA} ${symbol} ${inputB} = ${result}`)
                return result
        }
    }, [inputA, inputB, operand])

    const uploadOperation = useCallback(async () => {
        const res = await fetch("api/post_saveCalculation", {
            method: "POST",
            body: JSON.stringify({
                calculation: lastResult
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        notify('Calculation Uploaded!')
        retry()
    }, [lastResult])

    return (
        <>
            <header></header>
            <main>
                <div className={'bg-white grid grid-rows-3 gap-4 place-content-center'}>
                    <NumberInput name={"Input A"} onChange={setInputA} value={inputA}/>
                    <NumberInput name={"Input B"} onChange={setInputB} value={inputB}/>
                    <NumberInput name={"Result"} disabled={true} value={valueResult}/>
                </div>
                <div className={'grid grid-rows-2 place-content-center'}>
                    <ButtonGroup operands={operands} action={setOperand}/>
                    <button
                        type={'button'}
                        onClick={uploadOperation}
                        className={"relative justify-between rounded-md -ml-px inline-flex bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"}
                    >
                        <text>
                            Save
                        </text>
                        <AiOutlineSave aria-setsize={32}/>
                    </button>
                </div>

                <ToastContainer/>
                <Lists title={'History'} list={history}/>
            </main>
            <footer></footer>
        </>
    )
}
