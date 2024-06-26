import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import { CreateDepartmentXFormsData } from "@/types";
import { postLogger } from "../../logger/actions";

export async function POST(req: Request) {
    try {
        const {department, forms} = await req.json();
        const clientIp = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
        const newDepartxForm = await prisma.tL_DeparXforms.create({
            data: {
                department: department,
                forms: forms,
            },
        });
        const logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "POST",
            role: "rol",
            transaction: "POST DEPARTMENTSXFORMS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(newDepartxForm);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const object = { id: 0, department: 0, forms: 0 };
        const url = _req.url;
        const parameters = getParams(url, object)
        const clientIp = _req.headers.get("x-real-ip") || _req.headers.get("x-forwarded-for");
        const { id, department, forms } = parameters
        const whereCondition = {
            where: {
                id: id,
                forms: forms,
                department: department
            },
            include: {
                TL_forms: true,
            },
        };
        let loggers;
        loggers = await prisma.tL_DeparXforms.findMany({ where: whereCondition.where, include: whereCondition.include });
        const logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "GET",
            role: "rol",
            transaction: "GET DEPARTMENTSXFORMS",
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
        const object = { department: 0, forms: 0 };
        const url = _request.url;
        const parameters = getParams(url, object)
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for");
        const { department, forms } = parameters
        const whereCondition = {
            where: {
                forms: forms,
                department: department
            },
        };
        let loggers;
        loggers = await prisma.tL_DeparXforms.deleteMany({ where: whereCondition.where });
        const logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "GET",
            role: "rol",
            transaction: "GET DEPARTMENTSXFORMS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(loggers);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}