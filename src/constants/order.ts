
export const fulfillmentStatusKey: Record<string, string> = {
  'Ready to pack': 'status.fulfillment.readyToPack',
  Packed: 'status.fulfillment.packed',
  Shipped: 'status.fulfillment.shipped',
  Delayed: 'status.fulfillment.delayed',
  'Awaiting payment': 'status.fulfillment.awaitingPayment',
};

export const priorityStatusKey: Record<string, string> = {
  Normal: 'status.orderPriority.normal',
  High: 'status.orderPriority.high',
};
