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
        const id = parseInt(getParams(_req.url, { id: 0 }).id);
        const response = await prisma.tL_Unit.findUnique({
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