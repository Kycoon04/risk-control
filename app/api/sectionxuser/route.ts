import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import {CreateSectionXUserData} from "@/types"

export async function POST(req: Request) {
    try {
        const data: CreateSectionXUserData = await req.json();
        const newDepartxForm = await prisma.tL_SectionXUser.create({
            data: {
                id: data.id,
                section: data.section,
                user: data.user,
                complete: data.complete,
            },
        });
        return NextResponse.json(newDepartxForm);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const object = { id: 0, user: 0,section: 0,complete:""}; 
        const url = _req.url;
        const parameters = getParams(url, object)
        const {id, user,section,complete} = parameters
        console.log(parameters)
        const whereCondition = {
                where: {
                    id: id,
                    section:section,
                    user:user,
                    complete:complete,
                },
            };
            let loggers;
            loggers = await prisma.tL_SectionXUser.findMany({where: whereCondition.where});
        return NextResponse.json(loggers);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { user, section, complete }: CreateSectionXUserData = await req.json();
        const existingEntry = await prisma.tL_SectionXUser.findFirst({
            where: {
                AND: [
                    { user: user },
                    { section: section }
                ]
            }
        });
        if (existingEntry) {
            const updatedSection = await prisma.tL_SectionXUser.update({
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