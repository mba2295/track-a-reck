import { PatchTicketSchema } from "@/app/schemaValidation";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }
  const body = await request.json();
  const validation = await PatchTicketSchema.safeParseAsync(body);
  if (!validation.success) {
    return NextResponse.json(validation?.error?.format(), { status: 400 });
  }

  const { title, description, assignedToUserId } = body;
  if (assignedToUserId) {
    const user = prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user) {
      return NextResponse.json("No user found for assignment", { status: 400 });
    }
  }
  const updatedTicket = await prisma?.ticket.update({
    where: { id: parseInt(params.id) },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });
  return NextResponse.json(updatedTicket);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!ticket) {
    return NextResponse.json({ error: "ticket not found" }, { status: 404 });
  }
  await prisma.ticket.delete({
    where: { id: ticket.id },
  });
  return NextResponse.json({});
}
