import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import { QueryOptions } from "@/app/types";
import { TL_Departaments } from "@prisma/client";


interface CreateUserData {
    name: string;
    second_name: string;
    surname: string;
    second_surname: string;
    email: string;
    phone_number: string;
    nickname: string;
    identification: string;
    department: number;
}

export async function POST(req: Request) {
    try {
        const data: CreateUserData = await req.json();
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
                department:  data.department,
            },
        });
        return NextResponse.json(newUser);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const id = parseInt(getParams(_req.url, { id: 0 }).id);
        const response = await prisma.tL_Users.findUnique({
            where: {
                id: id
            }
        });
        if (response) {
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
        const deletedUser = await prisma.tL_Users.delete({
            where: {
                id:id
            },
        });

        return NextResponse.json(deletedUser);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}