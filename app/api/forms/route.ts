import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "../functions/getParams";
import { postLogger } from '../logger/actions';
import { Logger, CreateFormsData } from "@/types";
import { useAuthStore } from "@/provider/store";

export async function POST(req: Request) {
    const User = useAuthStore(state => state.user);
    const rol = useAuthStore(state => state.rol);
    try {
        const data: CreateFormsData = await req.json();
        const clientIp = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
        const newForms = await prisma.tL_forms.create({
            data: {
                name: data.name,
                state: data.state,
                inicialperiod: data.incialperiod,
                finalperiod: data.finalperiod,
                complete: data.complete
            },
        });
        const logger: Logger = {
            id: "",
            usuario: User?.nickname || "defaultUser",
            transaction_type: "POST",
            role: rol,
            transaction: "POST FORMS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(newForms);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
export async function GET(_req: Request) {
    const User = useAuthStore(state => state.user);
    const rol = useAuthStore(state => state.rol);
    try {
        const response = await prisma.tL_forms.findMany();
        const clientIp = _req.headers.get("x-real-ip") || _req.headers.get("x-forwarded-for");
        const logger: Logger = {
            id: "",
            usuario: User?.nickname || "defaultUser",
            transaction_type: "GET",
            role: rol,
            transaction: "GET FORMS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        console.log(response);
        if (response) {
            return NextResponse.json(response);
        }
        return new NextResponse("Not found", { status: 404 });

    } catch (error) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
}

export async function DELETE(_request: Request) {
    const User = useAuthStore(state => state.user);
    const rol = useAuthStore(state => state.rol);
    try {
        const identification = getParams(_request.url, { identification: "" }).identification;
        const deletedUser = await prisma.tL_Users.delete({
            where: {
                identification: identification
            },
        });
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for");
        const logger: Logger = {
            id: "",
            usuario: User?.nickname || "defaultUser",
            transaction_type: "DELETE",
            role: rol,
            transaction: "DELETE FORMS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);

        return NextResponse.json(deletedUser);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}