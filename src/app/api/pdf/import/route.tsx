import { NextRequest } from 'next/server';
import React from 'react';
import { pdf } from '@react-pdf/renderer';
import ImportDocument from '@/lib/pdfTemplates/ImportDocument';
import QRCode from 'qrcode';

export const runtime = 'nodejs';

import { stockImportServiceServer } from '@/services/server/stockImportService.server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get('id');
  if (!id) return new Response('Missing id parameter', { status: 400 });

  try {
    const data = await stockImportServiceServer.getStockImportById(Number(id));
    if (!data) {
      return new Response('Not found or unauthorized', { status: 404 });
    }
    const frontendBase = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    // Link QR to inventory import page instead of a /verify page
    const verificationUrl = `${frontendBase}/admin/inventory/import/${id}`;
    const qrDataUrl = await QRCode.toDataURL(verificationUrl);

    const doc = <ImportDocument data={data} qrImage={qrDataUrl} />;
    const buffer = await pdf(doc).toBuffer();

    return new Response(buffer as any, {
      status: 200,
      headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename=import-${data.documentCode || id}.pdf` },
    });
  } catch (err) {
    console.error('Failed to generate import PDF', err); return new Response('Failed to generate PDF', { status: 500 });
  }
}
