import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { z } from 'zod';

const OrderItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
  price: z.number(),
});

const CreateOrderSchema = z.object({
  items: z.array(OrderItemSchema),
  shippingInfo: z.any(), 
  referralCode: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  
  try {
    const body = await req.json();
    const validatedData = CreateOrderSchema.parse(body);

    const totalAmount = validatedData.items.reduce(
      (acc, item) => acc + item.price * item.quantity, 
      0
    );

    const order = await prisma.$transaction(async (tx) => {
      // 1. Decrement inventory for each item
      for (const item of validatedData.items) {
        const product = await tx.product.findUnique({ where: { id: item.productId } });
        if (!product || product.inventory < item.quantity) {
          throw new Error(`Insufficient inventory for product: ${item.productId}`);
        }
        await tx.product.update({
          where: { id: item.productId },
          data: { inventory: { decrement: item.quantity } },
        });
      }

      // 2. Create the order
      return await tx.order.create({
        data: {
          userId: (session?.user as any)?.id || null,
          totalAmount,
          shippingInfo: validatedData.shippingInfo,
          referralCode: validatedData.referralCode,
          items: {
            create: validatedData.items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: true,
        },
      });
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId: (session.user as any).id },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
