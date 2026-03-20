import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    
    if (code) {
      const campaign = await prisma.campaign.findUnique({
        where: { code }
      });
      
      if (!campaign || !campaign.active || new Date() > campaign.validUntil || new Date() < campaign.validFrom) {
        return NextResponse.json({ error: 'Invalid or expired campaign code' }, { status: 400 });
      }
      return NextResponse.json(campaign);
    }
    
    const activeCampaigns = await prisma.campaign.findMany({
      where: {
        active: true,
        validUntil: { gte: new Date() },
        validFrom: { lte: new Date() }
      }
    });

    return NextResponse.json(activeCampaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }
}
