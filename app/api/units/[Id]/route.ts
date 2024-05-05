import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import { CreateUnitData, Logger, ParamUnit } from "@/types"
import { useAuthStore } from "@/provider/store";
import { postLogger } from "../../logger/actions";

export async function POST(req: Request) {
    const User = useAuthStore(state => state.user);
    const rol = useAuthStore(state => state.rol);
    try {
        const data: CreateUnitData = await req.json();
        const clientIp = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
        const newUnit = await prisma.tL_Unit.create({
            data: {
                name: data.name,
                description: data.description,
            },
        });
        const logger: Logger = {
            id: "",
            usuario: User?.nickname || "defaultUser",
            transaction_type: "POST",
            role: rol,
            transaction: "POST UNITS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(newUnit);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    const User = useAuthStore(state => state.user);
    const rol = useAuthStore(state => state.rol);
    try {
        const object = { id: 0, name: "", description: "" }
        const url = _req.url
        const clientIp = _req.headers.get("x-real-ip") || _req.headers.get("x-forwarded-for");
        const parameters = getParams(url, object)
        const { id, name, description } = parameters
        const whereCondition = {
            where: {
                id: id,
                description: description,
                name: name,
            },
        };
        let loggers;
        loggers = await prisma.tL_Unit.findMany({ where: whereCondition.where });
        const logger: Logger = {
            id: "",
            usuario: User?.nickname || "defaultUser",
            transaction_type: "GET",
            role: rol,
            transaction: "GET UNITS",
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
        const deleteUnit = await prisma.tL_Unit.delete({
            where: {
                id: id
            },
        });
        const logger: Logger = {
            id: "",
            usuario: User?.nickname || "defaultUser",
            transaction_type: "DELETE",
            role: rol,
            transaction: "DELETE UNITS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(deleteUnit);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PUT(_request: Request) {
    const User = useAuthStore(state => state.user);
    const rol = useAuthStore(state => state.rol);
    try {
        const data: ParamUnit = await _request.json();
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for");
        const updatedUnit = await prisma.tL_Unit.update({
            where: { id: typeof data.id === 'string' ? parseInt(data.id, 10) : data.id },
            data: {
                id: typeof data.id === 'string' ? parseInt(data.id, 10) : data.id,
                name: data.name,
                description: data.description,
            },
        });
        const logger: Logger = {
            id: "",
            usuario: User?.nickname || "defaultUser",
            transaction_type: "PUT",
            role: rol,
            transaction: "PUT UNITS",
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