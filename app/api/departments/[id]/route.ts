import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import {CreateDepartmentData} from "@/types";


export async function POST(req: Request) {
    try {
        const data: CreateDepartmentData = await req.json();
        const newDepartment = await prisma.tL_Departaments.create({
            data: {
                name:data.name,
                description:data.description,
                unit:data.unit
            },
        });
        return NextResponse.json(newDepartment);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const object = {  id:0, name: "", description:"",unit:0} 
        const url = _req.url
        const parameters = getParams(url, object)
        const {id,name, description,unit} = parameters
        const whereCondition = {
                where: {
                    id: id,
                    description: description,
                    name: name,
                    unit: unit,
                },
            };
            let loggers;
            loggers = await prisma.tL_Departaments.findMany({where: whereCondition.where});
        return NextResponse.json(loggers);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(_request: Request) {
    try {
        const object = { id: 0 };
        const url = _request.url;
        const parameters = getParams(url, object)
        const { id } = parameters
        const deletedDepartment = await prisma.tL_Departaments.delete({
            where: {
                id:id
            },
        });

        return NextResponse.json(deletedDepartment);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}