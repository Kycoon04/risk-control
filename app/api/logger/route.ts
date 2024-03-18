import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";
import getParams from "@/app/api/functions/getParams";
import { ObjectId } from 'mongodb';


interface createLoggerTransactionData {
    id_usuario: number;
    transaction_type: string;
    date: Date;
}

const dbname = "risk-control-db";

export async function POST(req: Request) {
    try {
        const data: createLoggerTransactionData = await req.json();
        const client = await clientPromise;
        const db = client.db(dbname);
        const newLogger = await db.collection("logger").insertOne(data);
        return NextResponse.json(newLogger);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const client = await clientPromise;
        const db = client.db(dbname);
        const response = await db.collection("logger").find().toArray();
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
        const para = getParams(_request.url, { _id: 0});
        const id = new ObjectId(para._id);
        const client = await clientPromise;
        const db = client.db(dbname);
        const deleteLogger = await db.collection("logger").deleteOne({ _id: id });
        return NextResponse.json(deleteLogger);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const data: createLoggerTransactionData = await req.json();
        const para = getParams(req.url, { _id: 0 });
        const id = new ObjectId(para._id);
        const client = await clientPromise;
        const db = client.db(dbname);
        const updateLogger = await db.collection("logger").updateOne({ _id: id }, { $set: data });
        return NextResponse.json(updateLogger);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
