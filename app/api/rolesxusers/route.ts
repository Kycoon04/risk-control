import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "../functions/getParams";
import { CreateRoleXUserData } from "@/types"
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
        const logger = {
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
        const whereCondition = {
            where: {
                user: user,
            },
        };
        let loggers;
        loggers = await prisma.tL_UserXRoles.findMany({ where: whereCondition.where });
        const logger = {
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
        const logger = {
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

export async function PUT(_request: Request) {
    try {
        const {id, user,role} = await _request.json();
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for");
        const updatedDepartment = await prisma.tL_UserXRoles.update({
            where: { id: typeof id === 'string' ? parseInt(id, 10) : id },
            data: {
                id: typeof id === 'string' ? parseInt(id, 10) : id,
                user: user,
                role: role
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