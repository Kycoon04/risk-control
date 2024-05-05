import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import { CreateOptionData, Logger } from "@/types"
import { postLogger } from "../logger/actions";

export async function POST(req: Request) {
    try {
        const data: CreateOptionData = await req.json();
        const clientIp = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
        const newOption = await prisma.tL_Options.create({
            data: {
                option: data.option,
                question: data.question,
                score: data.score,
            },
        });
        const logger: Logger = {
            id: "",
            usuario:  "defaultUser",
            transaction_type: "POST",
            role: "rol",
            transaction: "POST OPTIONS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(newOption);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
export async function GET(_req: Request) {
    try {
        const object = { id: 0, option: "", question: "", score: "" }
        const url = _req.url
        const clientIp = _req.headers.get("x-real-ip") || _req.headers.get("x-forwarded-for");
        const parameters = getParams(url, object)
        const { id, option, question, score } = parameters
        console.log(parameters)
        const whereCondition = {
            where: {
                id: id,
                option: option,
                question: question,
                score: score
            }
        };
        let loggers;
        loggers = await prisma.tL_Options.findMany({ where: whereCondition.where });
        const logger: Logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "GET",
            role: "rol",
            transaction: "GET OPTIONS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(loggers);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(_request: Request) {
    try {
        const id = parseInt(getParams(_request.url, { id: 0 }).id);
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for");
        const deleteOption = await prisma.tL_Options.delete({
            where: {
                id: id
            },
        });
        const logger: Logger = {
            id: "",
            usuario:  "defaultUser",
            transaction_type: "DELETE",
            role: "rol",
            transaction: "DELETE OPTIONS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(deleteOption);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}