import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "../functions/getParams";
import {CreateUserData,User} from "@/types";
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
                department:typeof data.department === 'string' ? parseInt(data.department,10):data.department, //Ask about this too, the original type was string

            },
        });
        return NextResponse.json(newUser);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const identification = getParams(_req.url, { identification:"" }).identification;
        const response = await prisma.tL_Users.findUnique({
            where: {
                identification:identification
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
        const identification = getParams(_request.url, { identification:"" }).identification;
        const deletedUser = await prisma.tL_Users.delete({
            where: {
                identification:identification
            },
        });

        return NextResponse.json(deletedUser);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
export async function PUT(_request: Request) {
    try {
        const data: User = await _request.json();

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
        
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}