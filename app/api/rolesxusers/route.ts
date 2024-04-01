import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "../functions/getParams";
import { QueryOptions } from "@/app/types";

interface CreateRoleXUserData {
    id: number;
    user: number;
    role: number;
}

export async function POST(req: Request) {
    try {
        const data: CreateRoleXUserData = await req.json();
        const newUser = await prisma.tL_UserXRoles.create({
            data: {
                user: data.user,
                role: data.role,
            },
        });
        return NextResponse.json(newUser);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const object = { id: 0, user: 0,role: 0}; 
        const url = _req.url;
        const parameters = getParams(url, object)
        const {id, user,role} = parameters
        console.log(parameters)
        const whereCondition = {
                where: {
                    id: id,
                    user: user,
                    role:role
                },
            };
            let loggers;
            loggers = await prisma.tL_UserXRoles.findMany({where: whereCondition.where});
        return NextResponse.json(loggers);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(_request: Request) {
    try {
        const id = parseInt(getParams(_request.url, { id: 0 }).id);
        const deletedUser = await prisma.tL_UserXRoles.delete({
            where: {
                id:id
            },
        });

        return NextResponse.json(deletedUser);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}