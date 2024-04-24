import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


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