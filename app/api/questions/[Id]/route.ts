import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import { QueryOptions } from "@/app/types";
import { TL_Departaments } from "@prisma/client";


interface CreateQuestionData {
    question:string;
    description:string;
    section:number;

}

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
        const id = parseInt(getParams(_req.url, { id: 0 }).id);
        const response = await prisma.tL_Questions.findUnique({
            where: {
                id: id
            }
        });
        if (response) {
            return NextResponse.json(response);
        }
        return new NextResponse("Not found", { status: 404 });

    } catch (error) {
        return new NextResponse("Unauthorized", { status: 401 });
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