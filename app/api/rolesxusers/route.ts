import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "../functions/getParams";
import { CreateRoleXUserData, Logger } from "@/types"
import { useAuthStore } from "@/provider/store";
import { postLogger } from "../logger/actions";

export async function POST(req: Request) {
    try {
        const data: CreateRoleXUserData = await req.json();
        const clientIp = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
        const newUser = await prisma.tL_UserXRoles.create({
            data: {
                user: data.user,
                role: data.role,
            },
        });
        const logger: Logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "POST",
            role: "rol",
            transaction: "POST ROLESXUSERS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(newUser);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const object = { id: 0, user: 0, role: 0 };
        const url = _req.url;
        const clientIp = _req.headers.get("x-real-ip") || _req.headers.get("x-forwarded-for");
        const parameters = getParams(url, object)
        const { id, user, role } = parameters
        console.log(parameters)
        const whereCondition = {
            where: {
                id: id,
                user: user,
                role: role
            },
        };
        let loggers;
        loggers = await prisma.tL_UserXRoles.findMany({ where: whereCondition.where });
        const logger: Logger = {
            id: "",
            usuario: "defaultUser",
            transaction_type: "GET",
            role: "rol",
            transaction: "GET ROLESXUSERS",
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
        const id = parseInt(getParams(_request.url, { id: 0 }).id);
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for");
        const deletedUser = await prisma.tL_UserXRoles.delete({
            where: {
                id: id
            },
        });
        const logger: Logger = {
            id: "",
            usuario:  "defaultUser",
            transaction_type: "DELETE",
            role:"rol",
            transaction: "DELETE ROLESXUSERS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(deletedUser);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}