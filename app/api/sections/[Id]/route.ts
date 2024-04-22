import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";

interface CreateSectionData {
    name: string;
    description:string;
    forms:number;
    complete:string;
}
interface UpdateSectionData {
    id: number;
    name: string;
    description:string;
    forms:number;
    complete:string;
}

export async function PUT(req: Request) {
    try {
        const { id, name, description, forms, complete }: UpdateSectionData = await req.json();
        const updatedSection = await prisma.tL_Sections.update({
            where: {
                id: id
            },
            data: {
                name: name,
                description: description,
                forms: forms,
                complete: complete,
            },
        });
        return NextResponse.json(updatedSection);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data: CreateSectionData = await req.json();
        const newSection = await prisma.tL_Sections.create({
            data: {
                name:data.name,
                description:data.description,
                forms:data.forms,
                complete:data.complete,
            },
        });
        return NextResponse.json(newSection);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const object = { name: "", description: "", forms: 0} 
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
        const object = { id: 0 };
        const url = _request.url;
        const parameters = getParams(url, object)
        const { id } = parameters
        const deletedUser = await prisma.tL_Sections.delete({
            where: {
                id: id
            },
        });

        return NextResponse.json(deletedUser);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}