import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageShell } from '@/components/shared/app-page-shell';

const products = [
  {
    name: 'Premium Tote',
    sku: 'BAG-001',
    stock: 42,
    price: '$128.00',
    status: 'Active',
  },
  {
    name: 'Studio Chair',
    sku: 'FUR-214',
    stock: 8,
    price: '$699.00',
    status: 'Low stock',
  },
  {
    name: 'Desk Lamp',
    sku: 'LGT-078',
    stock: 64,
    price: '$128.00',
    status: 'Active',
  },
  {
    name: 'Ceramic Set',
    sku: 'KIT-332',
    stock: 12,
    price: '$86.00',
    status: 'Active',
  },
];

export const ProductsPage = () => (
  <PageShell
    title='Products'
    description='Manage catalog items, prices, SKUs, and stock availability.'
    actions={
      <Button>
        <Plus />
        Add product
      </Button>
    }
  >
    <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
      {products.map((product) => (
        <div
          key={product.sku}
          className='rounded-lg border bg-background p-4 shadow-sm'
        >
          <div className='mb-4 flex items-start justify-between gap-3'>
            <div>
              <h2 className='font-semibold'>{product.name}</h2>
              <p className='text-sm text-muted-foreground'>{product.sku}</p>
            </div>
            <span className='rounded-full bg-muted px-2 py-1 text-xs'>
              {product.status}
            </span>
          </div>
          <div className='flex items-end justify-between'>
            <div>
              <p className='text-xs text-muted-foreground'>Stock</p>
              <p className='text-2xl font-bold'>{product.stock}</p>
            </div>
            <p className='font-medium'>{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  </PageShell>
);
