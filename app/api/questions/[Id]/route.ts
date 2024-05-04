import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import {CreateQuestionData, ParamQuestions} from "@/types"


export async function POST(req: Request) {
    try {
        const data: CreateQuestionData = await req.json();
        const newQuestion = await prisma.tL_Questions.create({
            data: {
                question:data.question,
                description:data.description,
                section:data.section,
            },
        });
        return NextResponse.json(newQuestion);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const object = { id: 0, question: "", description: "", section: 0} 
        const url = _req.url
        const parameters = getParams(url, object)
        const {id, question,description, section} = parameters
        console.log(parameters)
        const whereCondition = {
                where: {
                    id: id,
                    question: question,
                    description: description,
                    section: section,
                },
            };
            let loggers;
            loggers = await prisma.tL_Questions.findMany({where: whereCondition.where});
        return NextResponse.json(loggers);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(_request: Request) {
    try {
        const id = parseInt(getParams(_request.url, { id: 0 }).id);
        const deleteQuestion= await prisma.tL_Questions.delete({
            where: {
                id:id
            },
        });

        return NextResponse.json(deleteQuestion);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PUT(_request: Request) {
    try {
        const data: ParamQuestions = await _request.json();

        const updatedQuestion = await prisma.tL_Questions.update({
            where: { id: typeof data.id === 'string' ? parseInt(data.id, 10) : data.id  },
            data: {
                id: typeof data.id === 'string' ? parseInt(data.id, 10): data.id,
                question: data.question,
                description: data.description,
                section:parseInt(data.section, 10),
            },
        });
        
        return NextResponse.json(updatedQuestion);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}