import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "../functions/getParams";
import {CreateRoleData} from "@/types"

export async function POST(req: Request) {
    try {
        const data: CreateRoleData = await req.json();
        const newUser = await prisma.tL_Roles.create({
            data: {
                active: data.active,
                name: data.name,
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
        const response = await prisma.tL_Roles.findUnique({
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
        const deletedUser = await prisma.tL_Roles.delete({
            where: {
                id:id
            },
        });

        return NextResponse.json(deletedUser);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}