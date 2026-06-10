import { PageShell } from '@/components/shared/layout/PageShell';

const categories = [
  { name: 'Bags', products: 38, revenue: '$18,420' },
  { name: 'Furniture', products: 24, revenue: '$44,900' },
  { name: 'Lighting', products: 16, revenue: '$12,880' },
  { name: 'Home Goods', products: 52, revenue: '$27,540' },
];

export const CategoriesPage = () => (
  <PageShell
    title='Categories'
    description='Organize products by collection, buying intent, and merchandising plan.'
  >
    <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
      {categories.map((category) => (
        <div
          key={category.name}
          className='rounded-lg border bg-background p-5 shadow-sm'
        >
          <h2 className='font-semibold'>{category.name}</h2>
          <p className='mt-1 text-sm text-muted-foreground'>
            {category.products} products
          </p>
          <p className='mt-6 text-2xl font-bold'>{category.revenue}</p>
          <p className='text-xs text-muted-foreground'>30-day revenue</p>
        </div>
      ))}
    </div>
  </PageShell>
);
