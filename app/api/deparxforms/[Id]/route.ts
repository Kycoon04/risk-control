import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import { QueryOptions } from "@/app/types";
import { TL_Departaments } from "@prisma/client";


interface CreateDepartmentXFormsData {
    departament: number;
    forms:number;

}

export async function POST(req: Request) {
    try {
        const data: CreateDepartmentXFormsData = await req.json();
        const newDepartxForm = await prisma.tL_DeparXforms.create({
            data: {
                department: data.departament,
                forms:data.forms,
            },
        });
        return NextResponse.json(newDepartxForm);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const id = parseInt(getParams(_req.url, { id: 0 }).id);
        const response = await prisma.tL_DeparXforms.findUnique({
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
        const deleteDepartXForm = await prisma.tL_DeparXforms.delete({
            where: {
                id:id
            },
        });

        return NextResponse.json(deleteDepartXForm);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}