import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import { CreateAnswerData } from "@/types";
import { postLogger } from "../logger/actions";

export async function POST(req: Request) {
    try {
        const data: CreateAnswerData = await req.json();
        const clientIp = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
        const newAnswer = await prisma.tL_Answers.create({
            data: {
                user: data.user,
                option: data.option,
            },
        });
        const logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "POST",
            role: "rol",
            transaction: "POST ANSWERS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(newAnswer);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const object = { id: 0, user: 0, option: 0 }
        const clientIp = _req.headers.get("x-real-ip") || _req.headers.get("x-forwarded-for");
        const url = _req.url
        const parameters = getParams(url, object)
        const { id, user, option } = parameters
        const whereCondition = {
            where: {
                id: id,
                option: option,
                user: user,
            },
            include: {
                TL_Users:{
                    include:{
                        TL_Departaments:true,
                    },
                },
                TL_Options: {
                    include: {
                        TL_Questions: {
                            include: {
                                TL_Sections: {
                                    include: {
                                        TL_forms: true,
                                    }
                                }
                            }
                        }
                    },
                },
            },

        };
        let loggers;
        loggers = await prisma.tL_Answers.findMany({ where: whereCondition.where, include: whereCondition.include });
        const logger = {
            id: "",
            usuario:  "defaultUser",
            transaction_type: "GET",
            role: "rol",
            transaction: "GET ANSWERS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(loggers);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(_request: Request) {
    try {
        const id = parseInt(getParams(_request.url, { id: 0 }).id);
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for");
        const deletedAnswer = await prisma.tL_Answers.delete({
            where: {
                id: id
            },
        });
        const logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "DELETE",
            role: "rol",
            transaction: "DELETE ANSWERS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(deletedAnswer);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}