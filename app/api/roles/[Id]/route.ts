import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import {Role} from "@/types"

export async function GET(_req: Request) {
    try {
        const response = await prisma.tL_Roles.findMany({});
        if (response) {
            return NextResponse.json(response);
        }
        return new NextResponse("Not found", { status: 404 });

    } catch (error) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
}
export async function PUT(_request: Request) {
    try {
        const data: Role = await _request.json();

        const updatedUnit = await prisma.tL_Roles.update({
            where: { id: typeof data.id === 'string' ? parseInt(data.id, 10) : data.id  },
            data: {
                id: typeof data.id === 'string' ? parseInt(data.id, 10): data.id,
                name: data.name,
                active: parseInt(data.active, 10),
            },
        });
        
        return NextResponse.json(updatedUnit);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}