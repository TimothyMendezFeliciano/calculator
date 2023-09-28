import {useCallback, useEffect, useState} from "react";
import EventEmitter from "events";
import useSWRSubscription from "swr/subscription";
import {Calculator} from "@prisma/client";

const event = new EventEmitter
const swrKey = 'sub-key'
export default function useHistorySubscription() {

    const [num, setNum] = useState(0)
    useEffect(() => {
        const fetchHistory = async () => {
            const response = await fetch("http://localhost:3000/api/get_allCalculations", {
                method: "GET"
            })

            const {payload} = await response.json()
            const allCalculations: Calculator[] = payload.data;

            const history: string[] = allCalculations.map(item =>
                `${item.inputA} ${item.operand} ${item.inputB} = ${item.result}`)
            event.emit("data", history)
        }

        if (num === 0 || num % 3 === 0) {
            fetchHistory()
        } else {
            event.emit("error", "No Lookup")
        }
    }, [num])

    const subscribe = useCallback((key, {next}) => {
        const onData = (value) => next(undefined, value);
        const onError = (error) => next(error)

        event.on("data", onData)
        event.on("error", onError)

        return () => {
            event.off("data", onData)
            event.off("error", onError)
        }
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            setNum(num + 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [num])

    const {data, error} = useSWRSubscription(swrKey, subscribe);
    return {data, error}
}