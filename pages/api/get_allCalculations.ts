import {NextApiRequest, NextApiResponse} from "next";
import ApiResponseHandler from "@/utils/ApiResponseHandler";
import prisma from "@/utils/globalPrisma";


export default async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const {method} = req

        if (method !== "GET") {
            throw new Error("Only GET Allowed")
        }

        const result = await prisma.calculator.findMany()

        await ApiResponseHandler.success(req, res, {data: result})
    } catch (error) {
        await ApiResponseHandler.error(req, res, error)
    }

}