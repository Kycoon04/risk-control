import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import { CreateDepartmentData, ParamDepartment } from "@/types";
import { postLogger } from "../../logger/actions";

export async function POST(req: Request) {
    try {
        const data: CreateDepartmentData = await req.json();
        const clientIp = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
        const newDepartment = await prisma.tL_Departaments.create({
            data: {
                name: data.name,
                description: data.description,
                unit: data.unit
            },
        });
        const logger = {
            id: "",
            usuario:  "defaultUser",
            transaction_type: "POST",
            role: "rol",
            transaction: "POST DEPARTMENTS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(newDepartment);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const object = { id: 0, name: "", description: "", unit: 0, page: 1, limit: undefined };
        const clientIp = _req.headers.get("x-real-ip") || _req.headers.get("x-forwarded-for");
        const url = _req.url;
        const parameters = getParams(url, object);
        const { id, name, description, unit, page, limit } = parameters;

        const pageNumber = parseInt(page, 10) || 1;
        console.log(page)
        const pageSize = limit ? parseInt(limit, 10) : undefined;
        const skip = pageSize ? (pageNumber - 1) * pageSize : undefined;

        const whereCondition = {
            where: {
                id: id,
                description: description,
                name: name,
                unit: unit,
            },
        };

        const loggers = await prisma.tL_Departaments.findMany({
            ...whereCondition,
            ...(skip !== undefined && { skip: skip }),
            ...(pageSize !== undefined && { take: pageSize }),
        });

        const totalRecords = await prisma.tL_Departaments.count({
            ...whereCondition,
        });

        const totalPages = pageSize ? Math.ceil(totalRecords / pageSize) : 1;

        const logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "POST",
            role: "rol",
            transaction: "POST DEPARTMENTS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        };

        await postLogger(logger);

        return NextResponse.json({
            data: loggers,
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
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for");
        const url = _request.url;
        const parameters = getParams(url, object)
        const { id } = parameters
        const deletedDepartment = await prisma.tL_Departaments.delete({
            where: {
                id: id
            },
        });
        const logger = {
            id: "",
            usuario:  "defaultUser",
            transaction_type: "DELETE",
            role: "rol",
            transaction: "DELETE DEPARTMENTS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(deletedDepartment);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PUT(_request: Request) {
    try {
        const data: ParamDepartment = await _request.json();
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for");
        const updatedDepartment = await prisma.tL_Departaments.update({
            where: { id: typeof data.id === 'string' ? parseInt(data.id, 10) : data.id },
            data: {
                id: typeof data.id === 'string' ? parseInt(data.id, 10) : data.id,
                name: data.name,
                description: data.description,
                unit: parseInt(data.unit, 10),
            },
        });
        const logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "PUT",
            role: "rol",
            transaction: "PUT DEPARTMENTS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(updatedDepartment);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}