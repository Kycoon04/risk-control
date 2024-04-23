import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";


interface CreateFormsXUserData {
    id: number;
    Forms:number;
    User:number;
    complete:string;
}

export async function POST(req: Request) {
    try {
        const data: CreateFormsXUserData = await req.json();
        const newFormsXUserData = await prisma.tL_FormXUser.create({
            data: {
                id: data.id,
                Forms: data.Forms,
                User: data.User,
                complete: data.complete,
            },
        });
        return NextResponse.json(newFormsXUserData);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const object = { id: 0, user: 0,forms: 0,complete:""}; 
        const url = _req.url;
        const parameters = getParams(url, object)
        const {id, user,forms,complete} = parameters
        console.log(parameters)
        const whereCondition = {
                where: {
                    id: id,
                    Forms:forms,
                    User:user,
                    complete:complete,
                },
            };
            let loggers;
            loggers = await prisma.tL_FormXUser.findMany({where: whereCondition.where});
        return NextResponse.json(loggers);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { User, Forms, complete }: CreateFormsXUserData = await req.json();
        const existingEntry = await prisma.tL_FormXUser.findFirst({
            where: {
                AND: [
                    { User: User },
                    { Forms: Forms }
                ]
            }
        });
        if (existingEntry) {
            const updatedSection = await prisma.tL_FormXUser.update({
                where: {
                    id: existingEntry.id
                },
                data: {
                    complete: complete
                },
            });
            return NextResponse.json(updatedSection);
        } else {
            return new NextResponse("Entrada no encontrada", { status: 404 });
        }
    } catch (error) {
        return new NextResponse("Error interno", { status: 500 });
    }
}