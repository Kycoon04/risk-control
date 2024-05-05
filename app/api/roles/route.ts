import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "../functions/getParams";
import { CreateRoleData, Logger } from "@/types"
import { useAuthStore } from "@/provider/store";
import { postLogger } from "../logger/actions";
export async function POST(req: Request) {
    try {
        const data: CreateRoleData = await req.json();
        const clientIp = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
        const newUser = await prisma.tL_Roles.create({
            data: {
                active: data.active,
                name: data.name,
            },
        });
        const logger: Logger = {
            id: "",
            usuario:  "defaultUser",
            transaction_type: "POST",
            role: "rol",
            transaction: "POST ROLES",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(newUser);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const id = parseInt(getParams(_req.url, { id: 0 }).id);
        const clientIp = _req.headers.get("x-real-ip") || _req.headers.get("x-forwarded-for");
        const response = await prisma.tL_Roles.findUnique({
            where: {
                id: id
            }
        });
        if (response) {
            const logger: Logger = {
                id: "",
                usuario: "defaultUser",
                transaction_type: "GET",
                role:"rol",
                transaction: "GET ROLES",
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
        const id = parseInt(getParams(_request.url, { id: 0 }).id);
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for");
        const deletedUser = await prisma.tL_Roles.delete({
            where: {
                id: id
            },
        });
        const logger: Logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "DELETE",
            role: "rol",
            transaction: "DELETE ROLES",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(deletedUser);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}