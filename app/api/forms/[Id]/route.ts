import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import {CreateFormsData} from "@/types"

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
        const object = { id: 0 };
        const url = _request.url;
        const parameters = getParams(url, object)
        const { id } = parameters
        const deletedUser = await prisma.tL_forms.delete({
            where: {
                id: id
            },
        });

        return NextResponse.json(deletedUser);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
export async function PUT(req: Request) {
    try {
        const { id, name, inicialperiod, finalperiod, complete,state } = await req.json();
        const updatedSection = await prisma.tL_forms.update({
            where: {
                id: id
            },
            data: {
                name: name,
                inicialperiod: inicialperiod,
                finalperiod:finalperiod,
                state: state,
                complete: complete,
            },
        });
        return NextResponse.json(updatedSection);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}