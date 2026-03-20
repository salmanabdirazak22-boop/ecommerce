import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const CartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
});

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ items: [] });

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: (session.user as any).id },
      include: { items: { include: { product: true } } },
    });
    return NextResponse.json(cart || { items: [] });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { productId, quantity } = CartItemSchema.parse(body);
    const userId = (session.user as any).id;

    let cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    const cartItem = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId } });

    if (quantity <= 0) {
      if (cartItem) {
        await prisma.cartItem.delete({ where: { id: cartItem.id } });
      }
      return NextResponse.json({ message: 'Item removed' });
    }

    const updatedItem = await prisma.cartItem.upsert({
      where: { id: cartItem?.id || 'new_dummy_id' },
      update: { quantity },
      create: { cartId: cart.id, productId, quantity }
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
