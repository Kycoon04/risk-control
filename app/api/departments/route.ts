import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import { QueryOptions } from "@/app/types";
import { TL_Departaments } from "@prisma/client";


interface CreateDepartmentData {
    name:string;
    description:string;
    unit:number;

}

export async function POST(req: Request) {
    try {
        const data: CreateDepartmentData = await req.json();
        const newDepartment = await prisma.tL_Departaments.create({
            data: {
                name:data.name,
                description:data.description,
                unit:data.unit
            },
        });
        return NextResponse.json(newDepartment);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const id = parseInt(getParams(_req.url, { id: 0 }).id);
        const response = await prisma.tL_Departaments.findUnique({
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
        const deletedDepartment = await prisma.tL_Departaments.delete({
            where: {
                id:id
            },
        });

        return NextResponse.json(deletedDepartment);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}