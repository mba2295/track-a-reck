import { NextRequest, NextResponse } from "next/server";
import { ticketSchema } from "../../schemaValidation";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }
  const body = await request.json();
  const validation = await ticketSchema.safeParseAsync(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const newTicket = await prisma?.ticket.create({
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(newTicket, { status: 201 });
}
