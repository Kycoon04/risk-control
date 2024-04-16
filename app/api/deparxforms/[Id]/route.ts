import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";


interface CreateDepartmentXFormsData {
    departament: number;
    forms:number;

}

export async function POST(req: Request) {
    try {
        const data: CreateDepartmentXFormsData = await req.json();
        const newDepartxForm = await prisma.tL_DeparXforms.create({
            data: {
                department: data.departament,
                forms:data.forms,
            },
        });
        return NextResponse.json(newDepartxForm);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const object = { id: 0, department: 0,forms: 0}; 
        const url = _req.url;
        const parameters = getParams(url, object)
        const {id, department,forms} = parameters
        console.log(parameters)
        const whereCondition = {
                where: {
                    id: id,
                    forms:forms,
                    department:department
                },
            };
            let loggers;
            loggers = await prisma.tL_DeparXforms.findMany({where: whereCondition.where});
        return NextResponse.json(loggers);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(_request: Request) {
    try {
        const id = parseInt(getParams(_request.url, { id: 0 }).id);
        const deleteDepartXForm = await prisma.tL_DeparXforms.delete({
            where: {
                id:id
            },
        });

        return NextResponse.json(deleteDepartXForm);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}