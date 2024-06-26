import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import { CreateUnitData, ParamUnit } from "@/types"
import { postLogger } from "../../logger/actions";

export async function POST(req: Request) {
    try {
        const data: CreateUnitData = await req.json();
        const clientIp = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
        const newUnit = await prisma.tL_Unit.create({
            data: {
                name: data.name,
                description: data.description,
            },
        });
        const logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "POST",
            role: "rol",
            transaction: "POST UNITS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(newUnit);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
export async function GET(_req: Request) {
    try {
        // Definir el objeto de parámetros con paginación
        const object = { id: 0, name: "", description: "", page: 1, limit: undefined };
        const url = _req.url;
        const clientIp = _req.headers.get("x-real-ip") || _req.headers.get("x-forwarded-for");
        const parameters = getParams(url, object);
        const { id, name, description, page, limit } = parameters;

        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = limit ? parseInt(limit, 10) : undefined;
        const skip = pageSize ? (pageNumber - 1) * pageSize : undefined;

        // Definir las condiciones de búsqueda
        const whereCondition = {
            where: {
                id: id,
                description: description,
                name: name,
            },
        };

        // Obtener los registros paginados y el total de registros
        const [units, totalRecords] = await Promise.all([
            prisma.tL_Unit.findMany({
                ...whereCondition,
                ...(skip !== undefined && { skip }),
                ...(pageSize !== undefined && { take: pageSize }),
            }),
            prisma.tL_Unit.count({
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
            transaction: "GET UNITS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        };
        await postLogger(logger);

        // Responder con los registros y la información de paginación
        return NextResponse.json({
            data: units,
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
        const id = parseInt(getParams(_request.url, { id: 0 }).id);
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for");
        const deleteUnit = await prisma.tL_Unit.delete({
            where: {
                id: id
            },
        });
        const logger = {
            id: "",
            usuario:  "defaultUser",
            transaction_type: "DELETE",
            role: "rol",
            transaction: "DELETE UNITS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(deleteUnit);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PUT(_request: Request) {
    try {
        const data: ParamUnit = await _request.json();
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for");
        const updatedUnit = await prisma.tL_Unit.update({
            where: { id: typeof data.id === 'string' ? parseInt(data.id, 10) : data.id },
            data: {
                id: typeof data.id === 'string' ? parseInt(data.id, 10) : data.id,
                name: data.name,
                description: data.description,
            },
        });
        const logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "PUT",
            role: "rol",
            transaction: "PUT UNITS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(updatedUnit);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}