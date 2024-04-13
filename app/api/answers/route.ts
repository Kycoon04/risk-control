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
        const id = parseInt(getParams(_req.url, { id: 0 }).id);
        const response = await prisma.tL_Answers.findUnique({
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