import React, { Suspense } from 'react';
import ServiceFormClient from './ServiceFormClient';

export async function generateStaticParams() {
  return [{ id: 'new' }];
}

export default async function ServiceFormPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading service editor...</div>}>
      <ServiceFormClient serviceId={id} />
    </Suspense>
  );
}
