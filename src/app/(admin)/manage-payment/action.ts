'use server';

import prisma from '@/src/lib/db';
import { PaymentSearch } from '@/src/lib/definition';

export const getPaymentHistoryList = async (searchParams: PaymentSearch) => {
  try {
    const {
      userid = '',
      payment_status = '',
      delivery_status = '',
      createSdt = '',
      createEdt = '',
    } = searchParams;

    return await prisma.paymentHistory.findMany({
      where: {
        user: { id: { contains: userid } },
        payment_status: { contains: payment_status },
        delivery_status: { contains: delivery_status },
        AND: [
          ...(createSdt
            ? [{ createdAt: { gte: new Date(createSdt + ' 00:00:00') } }]
            : []),
          ...(createEdt
            ? [{ createdAt: { lte: new Date(createEdt + ' 23:59:59') } }]
            : []),
        ],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true } },
        _count: { select: { paymentList: true } },
      },
    });
  } catch (e) {
    console.error('Failed to fetch getPaymentHistoryList:', e);
    throw new Error('Failed to fetch getPaymentHistoryList.');
  }
};

export const getPaymentList = async (pid: number) => {
  try {
    return await prisma.paymentList.findMany({
      where: { pid },
    });
  } catch (e) {
    console.error('Failed to fetch getPaymentHistoryList:', e);
    throw new Error('Failed to fetch getPaymentHistoryList.');
  }
};
