import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "../functions/getParams";
import {CreateUserData,Logger,User} from "@/types";
import { useAuthStore } from "@/provider/store";
import { postLogger } from "../logger/actions";
const user = useAuthStore(state => state.user);
const rol = useAuthStore(state => state.rol);

export async function POST(req: Request) {
    try {
        const data: CreateUserData = await req.json();
        const clientIp = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") ;
        const newUser = await prisma.tL_Users.create({
            data: {
                name: data.name,
                second_name:  data.second_name,
                surname:  data.surname,
                second_surname: data.second_surname,
                email:  data.email,
                phone_number: data.phone_number,
                nickname:  data.nickname,
                identification:  data.identification,
                department:typeof data.department === 'string' ? parseInt(data.department,10):data.department, //Ask about this too, the original type was string

            },
        });
        const logger : Logger = {
            id: "",
            usuario: user?.nickname || "defaultUser",
            transaction_type: "POST",
            role: rol,
            transaction: "POST USERS",
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
        const identification = getParams(_req.url, { identification:"" }).identification;
        const clientIp = _req.headers.get("x-real-ip") || _req.headers.get("x-forwarded-for") ;
        const response = await prisma.tL_Users.findUnique({
            where: {
                identification:identification
            }
        });
        if (response) {
            const logger : Logger = {
                id: "",
                usuario: user?.nickname || "defaultUser",
                transaction_type: "GET",
                role: rol,
                transaction: "GET USERS",
                ip: clientIp || "192.168",
                date: new Date().toISOString(),
            }
            await postLogger(logger);
            return NextResponse.json(response);
        }
        const logger : Logger = {
            id: "",
            usuario: user?.nickname || "defaultUser",
            transaction_type: "GET",
            role: rol,
            transaction: "GET USERS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return new NextResponse("Not found", { status: 404 });

    } catch (error) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
}

export async function DELETE(_request: Request) {
    try {
        const identification = getParams(_request.url, { identification:"" }).identification;
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for") ;
        const deletedUser = await prisma.tL_Users.delete({
            where: {
                identification:identification
            },
        });
        const logger : Logger = {
            id: "",
            usuario: user?.nickname || "defaultUser",
            transaction_type: "DELETE",
            role: rol,
            transaction: "DELETE USERS",
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
        const data: User = await _request.json();
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for") ;
        const updatedUser = await prisma.tL_Users.update({
            where: { id: typeof data.id === 'string' ? parseInt(data.id, 10) : data.id  },
            data: {
                id: typeof data.id === 'string' ? parseInt(data.id, 10): data.id,
                name: data.name,
                second_name: data.second_name,
                surname: data.surname,
                second_surname: data.second_surname,
                email: data.email,
                phone_number: data.phone_number,
                nickname: data.nickname,
                identification: data.identification,
                department: typeof data.department === 'string' ? parseInt(data.department, 10) : data.department
            },
        });
        const logger : Logger = {
            id: "",
            usuario: user?.nickname || "defaultUser",
            transaction_type: "PUT",
            role: rol,
            transaction: "PUT USERS",
            ip: clientIp || "192.168",
            date: new Date().toISOString(),
        }
        await postLogger(logger);
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}