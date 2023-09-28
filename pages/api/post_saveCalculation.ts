import {NextApiRequest, NextApiResponse} from "next";
import ApiResponseHandler from "@/utils/ApiResponseHandler";
import prisma from "@/utils/globalPrisma";
import {parseMathString} from "@/utils";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {calculation} = req.body
        const {method} = req;

        // @ts-ignore
        const {inputA, inputB, operand, result} = parseMathString(calculation)

        if (method !== "POST") {
            throw new Error("Only POST Allowed")
        }

        await prisma.calculator.create({
            data: {
                inputA,
                inputB,
                operand,
                result,
            }
        })

        await ApiResponseHandler.success(req, res, {data: true})

    } catch (error) {
        await ApiResponseHandler.error(req, res, error)
    }
}