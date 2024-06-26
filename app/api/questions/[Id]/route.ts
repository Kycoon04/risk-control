import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import { CreateQuestionData, ParamQuestions } from "@/types"
import { postLogger } from "../../logger/actions";


export async function POST(req: Request) {
    try {
        const data: CreateQuestionData = await req.json();
        const clientIp = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
        const newQuestion = await prisma.tL_Questions.create({
            data: {
                question: data.question,
                description: data.description,
                section: data.section,
            },
        });
        const logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "POST",
            role: "rol",
            transaction: "POST QUESTIONS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(newQuestion);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        // Definir el objeto de parámetros con paginación
        const object = { id: 0, question: "", description: "", section: 0, page: 1, limit: undefined };
        const url = _req.url;
        const clientIp = _req.headers.get("x-real-ip") || _req.headers.get("x-forwarded-for");
        const parameters = getParams(url, object);
        const { id, question, description, section, page, limit } = parameters;

        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = limit ? parseInt(limit, 10) : undefined;
        const skip = pageSize ? (pageNumber - 1) * pageSize : undefined;

        // Definir las condiciones de búsqueda
        const whereCondition = {
            where: {
                id: id,
                question: question,
                description: description,
                section: section,
            },
        };

        // Obtener los registros paginados y el total de registros
        const [loggers, totalRecords] = await Promise.all([
            prisma.tL_Questions.findMany({
                ...whereCondition,
                ...(skip !== undefined && { skip: skip }),
                ...(pageSize !== undefined && { take: pageSize }),
            }),
            prisma.tL_Questions.count({
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
            transaction: "GET QUESTIONS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        };
        await postLogger(logger);

        // Responder con los registros y la información de paginación
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
        const id = parseInt(getParams(_request.url, { id: 0 }).id);
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for");
        const deleteQuestion = await prisma.tL_Questions.delete({
            where: {
                id: id
            },
        });
        const logger = {
            id: "",
            usuario:  "defaultUser",
            transaction_type: "DELETE",
            role: "rol",
            transaction: "DELETE QUESTIONS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(deleteQuestion);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PUT(_request: Request) {
    try {
        const data: ParamQuestions = await _request.json();
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for");
        const updatedQuestion = await prisma.tL_Questions.update({
            where: { id: typeof data.id === 'string' ? parseInt(data.id, 10) : data.id },
            data: {
                id: typeof data.id === 'string' ? parseInt(data.id, 10) : data.id,
                question: data.question,
                description: data.description,
                section: parseInt(data.section, 10),
            },
        });
        const logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "PUT",
            role: "rol",
            transaction: "PUT QUESTIONS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(updatedQuestion);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}