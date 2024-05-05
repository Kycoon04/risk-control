import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Logger, Role,CreateRoleData } from "@/types"
import { useAuthStore } from "@/provider/store";
import { postLogger } from "../../logger/actions";

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
        const logger: Logger = {
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
        const response = await prisma.tL_Roles.findMany({});
        const clientIp = _req.headers.get("x-real-ip") || _req.headers.get("x-forwarded-for");
        if (response) {
            const logger: Logger = {
                id: "",
                usuario: "defaultUser",
                transaction_type: "GET",
                role: "rol",
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
        const logger: Logger = {
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