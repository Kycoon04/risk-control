import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";

interface CreateAnswerData {
    user: number;
    option:number;
}

export async function POST(req: Request) {
    try {
        const data: CreateAnswerData = await req.json();
        const newAnswer = await prisma.tL_Answers.create({
            data: {
                user: data.user,
                option:data.option,
            },
        });
        return NextResponse.json(newAnswer);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const object = {  id: 0,user:0, option:0} 
        const url = _req.url
        const parameters = getParams(url, object)
        const {id, user,option} = parameters
        console.log(parameters)
        const whereCondition = {
                where: {
                    id: id,
                    option: option,
                    user: user,
                },
            };
            let loggers;
            loggers = await prisma.tL_Answers.findMany({where: whereCondition.where});
        return NextResponse.json(loggers);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(_request: Request) {
    try {
        const id = parseInt(getParams(_request.url, { id: 0 }).id);
        const deletedAnswer = await prisma.tL_Answers.delete({
            where: {
                id:id
            },
        });

        return NextResponse.json(deletedAnswer);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}