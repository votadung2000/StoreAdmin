import { PageShell } from '@/components/shared/layout/PageShell';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const orders = [
  {
    id: '#ST-1048',
    customer: 'Olivia Martin',
    status: 'Paid',
    fulfillment: 'Ready to pack',
    total: '$1,248.00',
  },
  {
    id: '#ST-1047',
    customer: 'Jackson Lee',
    status: 'Paid',
    fulfillment: 'Packed',
    total: '$189.00',
  },
  {
    id: '#ST-1046',
    customer: 'Isabella Nguyen',
    status: 'Pending',
    fulfillment: 'Awaiting payment',
    total: '$699.00',
  },
  {
    id: '#ST-1045',
    customer: 'William Kim',
    status: 'Paid',
    fulfillment: 'Shipped',
    total: '$128.00',
  },
];

export const OrdersPage = () => (
  <PageShell
    title='Orders'
    description='Track payments, packing status, and fulfillment progress.'
  >
    <div className='overflow-hidden rounded-lg border bg-background shadow-sm'>
      <Table>
        <TableHeader className='bg-muted/60'>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Fulfillment</TableHead>
            <TableHead className='text-right'>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className='font-medium'>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell className='text-muted-foreground'>
                {order.fulfillment}
              </TableCell>
              <TableCell className='text-right font-medium'>
                {order.total}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </PageShell>
);
