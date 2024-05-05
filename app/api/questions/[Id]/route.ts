import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import { CreateQuestionData, Logger, ParamQuestions } from "@/types"
import { useAuthStore } from "@/provider/store";
import { postLogger } from "../../logger/actions";


export async function POST(req: Request) {
    const User = useAuthStore(state => state.user);
    const rol = useAuthStore(state => state.rol);
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
        const logger: Logger = {
            id: "",
            usuario: User?.nickname || "defaultUser",
            transaction_type: "POST",
            role: rol,
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
    const User = useAuthStore(state => state.user);
    const rol = useAuthStore(state => state.rol);
    try {
        const object = { id: 0, question: "", description: "", section: 0 }
        const url = _req.url
        const clientIp = _req.headers.get("x-real-ip") || _req.headers.get("x-forwarded-for");
        const parameters = getParams(url, object)
        const { id, question, description, section } = parameters
        console.log(parameters)
        const whereCondition = {
            where: {
                id: id,
                question: question,
                description: description,
                section: section,
            },
        };
        let loggers;
        loggers = await prisma.tL_Questions.findMany({ where: whereCondition.where });
        const logger: Logger = {
            id: "",
            usuario: User?.nickname || "defaultUser",
            transaction_type: "GET",
            role: rol,
            transaction: "GET QUESTIONS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(loggers);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(_request: Request) {
    const User = useAuthStore(state => state.user);
    const rol = useAuthStore(state => state.rol);
    try {
        const id = parseInt(getParams(_request.url, { id: 0 }).id);
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for");
        const deleteQuestion = await prisma.tL_Questions.delete({
            where: {
                id: id
            },
        });
        const logger: Logger = {
            id: "",
            usuario: User?.nickname || "defaultUser",
            transaction_type: "DELETE",
            role: rol,
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
    const User = useAuthStore(state => state.user);
    const rol = useAuthStore(state => state.rol);
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
        const logger: Logger = {
            id: "",
            usuario: User?.nickname || "defaultUser",
            transaction_type: "PUT",
            role: rol,
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