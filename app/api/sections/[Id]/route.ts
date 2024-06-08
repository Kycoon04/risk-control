import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import { UpdateSectionData, CreateSectionData} from "@/types";
import { postLogger } from "../../logger/actions";

export async function PUT(req: Request) {
    try {
        const { id, name, description, forms, complete }: UpdateSectionData = await req.json();
        const clientIp = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
        const updatedSection = await prisma.tL_Sections.update({
            where: {
                id: id
            },
            data: {
                name: name,
                description: description,
                forms: forms,
                complete: complete,
            },
        });
        const logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "PUT",
            role: "rol",
            transaction: "PUT SECTIONS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(updatedSection);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data: CreateSectionData = await req.json();
        const clientIp = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
        const newSection = await prisma.tL_Sections.create({
            data: {
                name: data.name,
                description: data.description,
                forms: data.forms,
                complete: data.complete,
            },
        });
        const logger = {
            id: "",
            usuario:  "defaultUser",
            transaction_type: "POST",
            role: "rol",
            transaction: "POST SECTIONS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(newSection);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
export async function GET(_req: Request) {
    try {
        // Definir el objeto de parámetros con paginación
        const object = { name: "", description: "", forms: 0, page: 1, limit: undefined };
        const url = _req.url;
        const clientIp = _req.headers.get("x-real-ip") || _req.headers.get("x-forwarded-for");
        const parameters = getParams(url, object);
        const { name, description, forms, page, limit } = parameters;

        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = limit ? parseInt(limit, 10) : undefined;
        const skip = pageSize ? (pageNumber - 1) * pageSize : undefined;

        // Definir las condiciones de búsqueda
        const whereCondition = {
            where: {
                name: name,
                description: description,
                forms: forms,
            },
        };

        // Obtener los registros paginados y el total de registros
        const [sections, totalRecords] = await Promise.all([
            prisma.tL_Sections.findMany({
                ...whereCondition,
                ...(skip !== undefined && { skip }),
                ...(pageSize !== undefined && { take: pageSize }),
            }),
            prisma.tL_Sections.count({
                ...whereCondition,
            })
        ]);

        const totalPages = pageSize ? Math.ceil(totalRecords / pageSize) : 1;

        // Registrar la acción
        const logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "GET",
            role: "rol",
            transaction: "GET SECTIONS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        };
        await postLogger(logger);

        // Responder con los registros y la información de paginación
        return NextResponse.json({
            data: sections,
            pagination: {
                totalRecords,
                totalPages,
                currentPage: pageNumber,
                pageSize: pageSize || totalRecords,
            }
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function DELETE(_request: Request) {
    try {
        const object = { id: 0 };
        const url = _request.url;
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for");
        const parameters = getParams(url, object)
        const { id } = parameters
        const deletedUser = await prisma.tL_Sections.delete({
            where: {
                id: id
            },
        });
        const logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "DELETE",
            role:"rol",
            transaction: "DELETE SECTIONS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(deletedUser);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}