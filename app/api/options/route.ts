import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";

interface CreateOptionData {
    option:string;
    question:number;
    score:number;
}

export async function POST(req: Request) {
    try {
        const data: CreateOptionData = await req.json();
        const newOption = await prisma.tL_Options.create({
            data: {
                option:data.option,
                question:data.question,
                score:data.score,
            },
        });
        return NextResponse.json(newOption);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
export async function GET(_req: Request) {
    try {
        const object = {  id: 0,option:"", question:"",score:""} 
        const url = _req.url
        const parameters = getParams(url, object)
        const {id, option,question,score} = parameters
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
            loggers = await prisma.tL_Options.findMany({where: whereCondition.where});
        return NextResponse.json(loggers);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(_request: Request) {
    try {
        const id = parseInt(getParams(_request.url, { id: 0 }).id);
        const deleteOption= await prisma.tL_Options.delete({
            where: {
                id:id
            },
        });

        return NextResponse.json(deleteOption);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}