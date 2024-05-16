import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { postLogger } from "../../logger/actions";

export async function PUT(_request: Request) {
    try {
        const {id,option,question,score} = await _request.json();
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for");
        const updatedOption = await prisma.tL_Options.update({
            where: { id: id },
            data: {
                option: option,
                question: question,
                score: score,
            },
        });
        const logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "PUT",
            role: "rol",
            transaction: "PUT OPTIONS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(updatedOption);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}