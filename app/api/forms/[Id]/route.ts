import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import { postLogger } from "../../logger/actions";


export async function POST(req: Request) {
    try {
        const { name, inicialperiod, finalperiod, complete, state } = await req.json();
        const clientIp = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
        const newForms = await prisma.tL_forms.create({
            data: {
                name: name,
                inicialperiod: inicialperiod,
                finalperiod: finalperiod,
                state: state,
                complete: complete,
            },
        });
        const logger = {
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
        // Obtener los parámetros desde la URL
        const object = { id: 0, page: 1, limit: undefined };
        const params = getParams(_req.url, object);
        const { id, page, limit } = params;

        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = limit ? parseInt(limit, 10) : undefined;
        const skip = pageSize ? (pageNumber - 1) * pageSize : undefined;
console.log(limit)
        const clientIp = _req.headers.get("x-real-ip") || _req.headers.get("x-forwarded-for");
        const relatedData = await prisma.tL_forms.findMany({
            where: { id: id },
            ...(skip !== undefined && { skip: skip }),
            ...(pageSize !== undefined && { take: pageSize }),
        });

        const totalRecords = await prisma.tL_forms.count({
            where: {}
        });
        const totalPages = pageSize ? Math.ceil(totalRecords / pageSize) : 1;

        const logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "GET",
            role: "rol",
            transaction: "GET FORMS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }

        await postLogger(logger);

        return NextResponse.json({
            data: relatedData,
            pagination: {
                totalRecords,
                totalPages,
                currentPage: pageNumber,
                pageSize: pageSize || totalRecords,
            }
        });


        return new NextResponse("Not found", { status: 404 });

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
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
        const logger = {
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
                state: 1,
                complete: complete,
            },
        });
        const logger = {
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