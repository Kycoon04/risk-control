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
        const object = { name: "", description: "", forms: 0 }
        const url = _req.url
        const clientIp = _req.headers.get("x-real-ip") || _req.headers.get("x-forwarded-for");
        const parameters = getParams(url, object)
        const { name, description, forms } = parameters
        const whereCondition = {
            where: {
                name: name,
                description: description,
                forms: forms,
            },
        };
        let loggers;
        loggers = await prisma.tL_Sections.findMany({ where: whereCondition.where });
        const logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "GET",
            role: "rol",
            transaction: "GET SECTIONS",
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