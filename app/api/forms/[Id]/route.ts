import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";

interface CreateFormsData {
    name: string;
    state: number;
    incialperiod: Date;
    finalperiod: Date;
    complete: string;
}

export async function POST(req: Request) {
    try {
        const data: CreateFormsData = await req.json();
        const newForms = await prisma.tL_forms.create({
            data: {
                name: data.name,
                state: data.state,
                inicialperiod: data.incialperiod,
                finalperiod: data.finalperiod,
                complete: data.complete
            },
        });
        return NextResponse.json(newForms);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const id = parseInt(getParams(_req.url, { id: 0 }).id);
        const response = await prisma.tL_forms.findUnique({
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
        const deletedForms = await prisma.tL_forms.delete({
            where: {
                id: id
            },
        });

        return NextResponse.json(deletedForms);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}