import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import { CreateFormsData, Logger } from "@/types"
import { postLogger } from "../../logger/actions";


export async function POST(req: Request) {
    try {
        const data: CreateFormsData = await req.json();
        const clientIp = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
        const newForms = await prisma.tL_forms.create({
            data: {
                name: data.name,
                state: data.state,
                inicialperiod: data.incialperiod,
                finalperiod: data.finalperiod,
                complete: data.complete
            },
        });
        const logger: Logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "POST",
            role: "rol",
            transaction: "POST FORMS",
            ip: clientIp || "192.168",
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
        const id = parseInt(getParams(_req.url, { id: 0 }).id);
        const clientIp = _req.headers.get("x-real-ip") || _req.headers.get("x-forwarded-for");
        const response = await prisma.tL_forms.findUnique({
            where: {
                id: id
            }
        });
        if (response) {
            const logger: Logger = {
                id: "",
                usuario: "defaultUser",
                transaction_type: "GET",
                role: "rol",
                transaction: "GET FORMS",
                ip: clientIp || "192.168",
                date: new Date().toISOString(),
            }
            await postLogger(logger);
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
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for");
        const deletedUser = await prisma.tL_forms.delete({
            where: {
                id: id
            },
        });
        const logger: Logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "DELETE",
            role: "rol",
            transaction: "DELETE FORMS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(deletedUser);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
export async function PUT(req: Request) {
    try {
        const { id, name, inicialperiod, finalperiod, complete, state } = await req.json();
        const clientIp = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
        const updatedSection = await prisma.tL_forms.update({
            where: {
                id: id
            },
            data: {
                name: name,
                inicialperiod: inicialperiod,
                finalperiod: finalperiod,
                state: state,
                complete: complete,
            },
        });
        const logger: Logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "PUT",
            role: "rol",
            transaction: "PUT FORMS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(updatedSection);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}