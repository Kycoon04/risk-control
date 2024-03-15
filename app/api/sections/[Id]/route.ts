import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import { QueryOptions } from "@/app/types";
import { TL_Departaments } from "@prisma/client";


interface CreateSectionData {
    name: string;
    description:string;
    forms:number;

}

export async function POST(req: Request) {
    try {
        const data: CreateSectionData = await req.json();
        const newSection = await prisma.tL_Sections.create({
            data: {
                name:data.name,
                description:data.description,
                forms:data.forms,
            },
        });
        return NextResponse.json(newSection);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const id = parseInt(getParams(_req.url, { id: 0 }).id);
        const response = await prisma.tL_Sections.findUnique({
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
        const deleteSection= await prisma.tL_Sections.delete({
            where: {
                id:id
            },
        });

        return NextResponse.json(deleteSection);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}