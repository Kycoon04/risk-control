import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";

interface CreateUnitData {
    name:string;
    description:string;
}

export async function POST(req: Request) {
    try {
        const data: CreateUnitData = await req.json();
        const newUnit = await prisma.tL_Unit.create({
            data: {
                name:data.name,
                description:data.description,
            },
        });
        return NextResponse.json(newUnit);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const object = {  id:0, name: "", description:""} 
        const url = _req.url
        const parameters = getParams(url, object)
        const {id,name, description} = parameters
            const whereCondition = {
                where: {
                    id: id,
                    description: description,
                    name: name,
                },
            };
            let loggers;
            loggers = await prisma.tL_Unit.findMany({where: whereCondition.where});
            return NextResponse.json(loggers);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(_request: Request) {
    try {
        const id = parseInt(getParams(_request.url, { id: 0 }).id);
        const deleteUnit= await prisma.tL_Unit.delete({
            where: {
                id:id
            },
        });

        return NextResponse.json(deleteUnit);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}