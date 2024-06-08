import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Role,CreateRoleData } from "@/types"
import { postLogger } from "../../logger/actions";
import getParams from "../../functions/getParams";

export async function POST(req: Request) {
    try {
        const data: CreateRoleData = await req.json();
        const clientIp = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
        const newRole = await prisma.tL_Roles.create({
            data: {
                name: data.name,
                active: data.active,
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
        return NextResponse.json(newRole);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
export async function GET(_req: Request) {
    try {
        // Definir el objeto de parámetros con paginación
        const object = { id: "", name: "", active: "", page: 1, limit: undefined };
        const url = _req.url;
        const clientIp = _req.headers.get("x-real-ip") || _req.headers.get("x-forwarded-for");
        const parameters = getParams(url, object);
        const { id, name, active, page, limit } = parameters;

        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = limit ? parseInt(limit, 10) : undefined;
        const skip = pageSize ? (pageNumber - 1) * pageSize : undefined;

        // Definir las condiciones de búsqueda
        const whereCondition = {
            where: {
                id: id,
                name: name,
                active: active,
            },
        };

        // Obtener los registros paginados y el total de registros
        const [roles, totalRecords] = await Promise.all([
            prisma.tL_Roles.findMany({
                ...whereCondition,
                ...(skip !== undefined && { skip: skip }),
                ...(pageSize !== undefined && { take: pageSize }),
            }),
            prisma.tL_Roles.count({
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
            transaction: "GET ROLES",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        };
        await postLogger(logger);

        // Responder con los registros y la información de paginación
        return NextResponse.json({
            data: roles,
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

export async function PUT(_request: Request) {
    try {
        const data: Role = await _request.json();
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for");
        const updatedUnit = await prisma.tL_Roles.update({
            where: { id: typeof data.id === 'string' ? parseInt(data.id, 10) : data.id },
            data: {
                id: typeof data.id === 'string' ? parseInt(data.id, 10) : data.id,
                name: data.name,
                active: parseInt(data.active, 10),
            },
        });
        const logger = {
            id: "",
            usuario:  "defaultUser",
            transaction_type: "PUT",
            role: "rol",
            transaction: "PUT ROLES",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(updatedUnit);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}