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
        const object = { name: "", description: "", forms: ""} 
        const url = _req.url
        const parameters = getParams(url, object)
        const { name,description, forms} = parameters
        const whereCondition = {
                where: {
                    name: name,
                    description: description,
                    forms: forms,
                },
            };
            let loggers;
            loggers = await prisma.tL_Sections.findMany({where: whereCondition.where});
        return NextResponse.json(loggers);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
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