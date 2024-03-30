import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "../functions/getParams";
import { QueryOptions } from "@/app/types";
import { TL_Departaments } from "@prisma/client";
import { Logger,postLogger } from '../logger/actions';

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
        const logger : Logger = {
            id: "",
            usuario: "Kycoon04",
            transaction_type: "POST",
            role: "Admin",
            transaction: "POST FORMS",
            ip: "192.168.10.1",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(newForms);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
export async function GET(_req: Request) {
    try {
        const response = await prisma.tL_forms.findMany();
        const logger : Logger = {
            id: "",
            usuario: "Kycoon04",
            transaction_type: "GET",
            role: "Admin",
            transaction: "GET FORMS",
            ip: "192.168.10.1",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        console.log(response);
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
        const logger : Logger = {
            id: "",
            usuario: "Kycoon04",
            transaction_type: "DELETE",
            role: "Admin",
            transaction: "DELETE FORMS",
            ip: "192.168.10.1",
            date: new Date().toISOString(),
        }
        await postLogger(logger);

        return NextResponse.json(deletedUser);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}