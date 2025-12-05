import { NextRequest } from 'next/server';
import React from 'react';
import { pdf } from '@react-pdf/renderer';
import AdjustmentDocument from '@/lib/pdfTemplates/AdjustmentDocument';
import QRCode from 'qrcode';

export const runtime = 'nodejs';

import { stockAdjustmentServiceServer } from '@/services/server/stockAdjustmentService.server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get('id');

  if (!id) {
    return new Response('Missing id parameter', { status: 400 });
  }

  try {
    // get data from service
    const data = await stockAdjustmentServiceServer.getAdjustmentById(Number(id));
    if (!data) {
      return new Response('Not found or unauthorized', { status: 404 });
    }

    // Use react-pdf to render PDF directly from data
    const frontendBase = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    // Link QR to inventory adjustment page instead of a /verify page
    const verificationUrl = `${frontendBase}/admin/inventory/adjustment/${id}`;
    const qrDataUrl = await QRCode.toDataURL(verificationUrl);

    const doc = <AdjustmentDocument data={data} qrImage={qrDataUrl} />;
    const buffer = await pdf(doc).toBuffer();

    return new Response(buffer as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=adjustment-${data.documentCode || id}.pdf`,
      },
    });
  } catch (error: any) {
    console.error('Failed to generate PDF:', error);
    return new Response('Failed to generate PDF', { status: 500 });
  }
}
