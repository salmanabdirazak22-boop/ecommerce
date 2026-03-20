import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { z } from 'zod';

const UpdateProductSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  price: z.number().optional(),
  inventory: z.number().nonnegative().optional(),
  image: z.string().optional(),
  category: z.string().optional(),
});

export async function PUT(req: Request) {
  const session = await auth();
  if (!session || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = UpdateProductSchema.parse(body);
    const { id, ...updateData } = data;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: 'Invalid data', details: error.issues }, { status: 400 });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
