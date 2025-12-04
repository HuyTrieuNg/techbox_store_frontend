import { NextRequest } from 'next/server';
import React from 'react';
import { pdf } from '@react-pdf/renderer';
import ExportDocument from '@/lib/pdfTemplates/ExportDocument';

export const runtime = 'nodejs';

import { stockExportServiceServer } from '@/services/server/stockExportService.server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get('id');
  if (!id) return new Response('Missing id parameter', { status: 400 });

  try {
    const data = await stockExportServiceServer.getStockExportById(Number(id));
    if (!data) {
      return new Response('Not found or unauthorized', { status: 404 });
    }
    const doc = <ExportDocument data={data} />;
    const buffer = await pdf(doc).toBuffer();
    const pdfBuffer: Buffer = buffer;

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=export-${data.documentCode || id}.pdf`,
      },
    });
  } catch (err) {
    console.error('Failed to generate export PDF', err); return new Response('Failed to generate PDF', { status: 500 });
  }
}
