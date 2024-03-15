import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import { QueryOptions } from "@/app/types";
import { TL_Departaments } from "@prisma/client";


interface CreateOptionData {
    option:string;
    question:number;

}

export async function POST(req: Request) {
    try {
        const data: CreateOptionData = await req.json();
        const newOption = await prisma.tL_Options.create({
            data: {
                option:data.option,
                question:data.question,
            },
        });
        return NextResponse.json(newOption);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const id = parseInt(getParams(_req.url, { id: 0 }).id);
        const response = await prisma.tL_Options.findUnique({
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