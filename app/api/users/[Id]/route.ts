import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import { CreateUserData, Logger } from "@/types"
import { useAuthStore } from "@/provider/store";
import { postLogger } from "../../logger/actions";
export async function POST(req: Request) {
    const User = useAuthStore(state => state.user);
    const rol = useAuthStore(state => state.rol);
    try {
        const data: CreateUserData = await req.json();
        const clientIp = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
        const newUser = await prisma.tL_Users.create({
            data: {
                name: data.name,
                second_name: data.second_name,
                surname: data.surname,
                second_surname: data.second_surname,
                email: data.email,
                phone_number: data.phone_number,
                nickname: data.nickname,
                identification: data.identification,
                department: data.department,
            },
        });
        const logger: Logger = {
            id: "",
            usuario: User?.nickname || "defaultUser",
            transaction_type: "POST",
            role: rol,
            transaction: "POST USERS",
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
    const User = useAuthStore(state => state.user);
    const rol = useAuthStore(state => state.rol);
    try {
        const clientIp = _req.headers.get("x-real-ip") || _req.headers.get("x-forwarded-for");
        const object = {
            id: 0, name: "", second_name: "", surname: "",
            second_surname: "", email: "", phone_number: "", nickname: "", identification: "",
            department: 0
        };
        const url = _req.url;
        const parameters = getParams(url, object)
        const { id, name, second_name, surname, second_surname, email, phone_number, nickname, identification, department } = parameters
        console.log(parameters)
        const whereCondition = {
            where: {
                id: id,
                name: name,
                second_name: second_name,
                surname: surname,
                second_surname: second_surname,
                email: email,
                identification: identification,
                nickname: nickname,
                phone_number: phone_number,
                department: department
            },
        };
        let loggers;
        loggers = await prisma.tL_Users.findMany({ where: whereCondition.where });
        const logger: Logger = {
            id: "",
            usuario: User?.nickname || "defaultUser",
            transaction_type: "GET",
            role: rol,
            transaction: "GET USERS",
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
        const object = { id: 0 };
        const url = _request.url;
        const clientIp = _request.headers.get("x-real-ip") || _request.headers.get("x-forwarded-for");
        const parameters = getParams(url, object)
        const { id } = parameters
        const deletedUser = await prisma.tL_Users.delete({
            where: {
                id: id
            },
        });
        const logger: Logger = {
            id: "",
            usuario: User?.nickname || "defaultUser",
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