import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Obtener todos los usuarios ordenados por fecha de creación y apellidos
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: [
        { fechaCreacion: 'desc' },
        { apellidos: 'asc' }
      ]
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener los usuarios' }, { status: 500 });
  }
}

export async function POST(request) {
    const data = await request.json();
    try {
      const newUser = await prisma.user.create({ data });
      return NextResponse.json(newUser);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Error al crear el usuario' }, { status: 500 });
    }
  }
  