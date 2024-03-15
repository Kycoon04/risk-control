import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "../functions/getParams";
import { QueryOptions } from "@/app/types";
import { TL_Departaments } from "@prisma/client";


interface CreateFormsData {
    name: string;
    state:number;
    incialperiod:Date;
    finalperiod:Date;

}

export async function POST(req: Request) {
    try {
        const data: CreateFormsData = await req.json();
        const newForms = await prisma.tL_forms.create({
            data: {
                name: data.name,
                state:data.state,
                inicialperiod:data.incialperiod,
                finalperiod:data.finalperiod,
            },
        });
        return NextResponse.json(newForms);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
export async function GET(_req: Request) {
    try {
        const name = getParams(_req.url, { name:"" }).name;
        const response = await prisma.tL_forms.findMany({
            where: {
                name:name
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
        const identification = getParams(_request.url, { identification:"" }).identification;
        const deletedUser = await prisma.tL_Users.delete({
            where: {
                identification:identification
            },
        });

        return NextResponse.json(deletedUser);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}