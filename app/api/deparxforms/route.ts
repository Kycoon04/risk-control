import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import { CreateDepartmentXFormsData } from "@/types";
import { postLogger } from "../logger/actions";

export async function GET(_req: Request) {
    try {
        const id = parseInt(getParams(_req.url, { id: 0 }).id);
        const clientIp = _req.headers.get("x-real-ip") || _req.headers.get("x-forwarded-for");
        const response = await prisma.tL_DeparXforms.findMany({
            where: {
                forms: id
            }
        });
        if (response) {
            const logger = {
                id: "",
                usuario: "defaultUser",
                transaction_type: "GET",
                role:"rol",
                transaction: "GET DEPARTXFORM",
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
        const form = parseInt(getParams(_request.url, { forms: 0 }).form);
        const department = parseInt(getParams(_request.url, { department: 0 }).department);
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for");
        console.log(form + " " + department);

        const deleteDepartXForm = await prisma.tL_DeparXforms.deleteMany({
            where: {
                forms: form,
                department: department,
            },
        });

        const logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "DELETE",
            role: "rol",
            transaction: "DELETE DEPARTMENTSXFORMS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        };

        await postLogger(logger);

        return NextResponse.json(deleteDepartXForm);
    } catch (error) {
        console.error(error); 
        return new NextResponse("Internal Error", { status: 500 });
    }
}