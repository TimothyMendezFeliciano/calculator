import {useCallback, useEffect, useState} from "react";
import {Calculator} from "@prisma/client";

export default function useGetHistory(prevHistory: string[]): { history: string[], retry: () => {} } {

    const [history, setHistory] = useState<string[]>(prevHistory)

    const retry = useCallback(async () => {
        const response = await fetch("http://localhost:3000/api/get_allCalculations", {
            method: "GET"
        })

        const {payload} = await response.json()
        const allCalculations: Calculator[] = payload.data;

        const history: string[] = allCalculations.map(item =>
            `${item.inputA} ${item.operand} ${item.inputB} = ${item.result}`)
        setHistory(history)
    }, [])

    return {history, retry}
}
