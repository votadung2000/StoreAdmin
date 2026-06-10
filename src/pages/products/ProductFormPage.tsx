import * as React from 'react';
import { Link, useParams } from '@tanstack/react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, CheckCircle2, Save } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PageShell } from '@/components/shared/app-page-shell';
import { ROUTES } from '@/constants/routes';
import { products } from '@/shared/demo/store-data';

const productSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    slug: z.string().min(3, 'Slug is required'),
    sku: z.string().min(3, 'SKU is required'),
    category: z.string().min(1, 'Category is required'),
    audience: z.string().min(1, 'Audience is required'),
    status: z.enum(['Draft', 'Active']),
    price: z.number().positive('Price must be greater than zero'),
    salePrice: z.number().min(0, 'Sale price cannot be negative'),
    stock: z.number().min(0, 'Stock cannot be negative'),
    seoTitle: z.string().min(5, 'SEO title is required'),
    seoDescription: z.string().min(20, 'SEO description is required'),
  })
  .refine((value) => value.salePrice === 0 || value.salePrice < value.price, {
    path: ['salePrice'],
    message: 'Sale price must be lower than list price',
  });

type ProductFormValues = z.output<typeof productSchema>;

type ProductFormPageProps = {
  mode: 'create' | 'edit';
};

export const ProductFormPage = ({ mode }: ProductFormPageProps) => {
  const params = useParams({ strict: false }) as { productId?: string };
  const existingProduct =
    products.find((item) => item.id === params.productId) ?? products[0];
  const [submitted, setSubmitted] = React.useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
    defaultValues: {
      name: mode === 'edit' ? existingProduct.name : '',
      slug:
        mode === 'edit'
          ? existingProduct.name.toLowerCase().replace(/\s+/g, '-')
          : '',
      sku: mode === 'edit' ? existingProduct.sku : '',
      category: mode === 'edit' ? existingProduct.category : '',
      audience: mode === 'edit' ? existingProduct.audience : 'Unisex',
      status: mode === 'edit' ? 'Active' : 'Draft',
      price: mode === 'edit' ? existingProduct.price : 0,
      salePrice: 0,
      stock: mode === 'edit' ? existingProduct.stock : 0,
      seoTitle: mode === 'edit' ? existingProduct.name : '',
      seoDescription:
        mode === 'edit'
          ? `${existingProduct.name} for curated seasonal merchandising.`
          : '',
    },
  });

  const watchedValues = useWatch({ control: form.control });
  const completionItems = [
    {
      label: 'Identity',
      complete: Boolean(
        watchedValues.name &&
          watchedValues.slug &&
          watchedValues.sku &&
          watchedValues.category,
      ),
    },
    {
      label: 'Pricing',
      complete: Boolean((watchedValues.price ?? 0) > 0),
    },
    {
      label: 'Inventory',
      complete: Boolean((watchedValues.stock ?? -1) >= 0),
    },
    {
      label: 'SEO',
      complete: Boolean(
        watchedValues.seoTitle && (watchedValues.seoDescription?.length ?? 0) >= 20,
      ),
    },
  ];

  const onSubmit = () => {
    setSubmitted(true);
  };

  return (
    <PageShell
      title={mode === 'create' ? 'Create Product' : 'Edit Product'}
      description='Build product identity, pricing, inventory, SEO, and publish state in one workflow.'
      actions={
        <div className='flex flex-wrap items-center gap-2'>
          <Badge variant='info'>Validated draft</Badge>
          <Button
            asChild
            variant='outline'
          >
            <Link to={ROUTES.MAIN.PRODUCTS}>
              <ArrowLeft />
              Products
            </Link>
          </Button>
        </div>
      }
    >
      {submitted && (
        <Alert className='border-emerald-200 bg-emerald-50 text-emerald-900 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1'>
          <CheckCircle2 className='h-4 w-4' />
          <AlertTitle>Draft validated</AlertTitle>
          <AlertDescription>
            This product draft is ready for operational review.
          </AlertDescription>
        </Alert>
      )}

      <section className='grid gap-3 md:grid-cols-4'>
        {completionItems.map((item) => (
          <div
            key={item.label}
            className='flex items-center justify-between gap-3 rounded-md border bg-background p-3 transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent/40 hover:shadow-sm'
          >
            <span className='font-medium'>{item.label}</span>
            <Badge variant={item.complete ? 'success' : 'outline'}>
              {item.complete ? 'Ready' : 'Open'}
            </Badge>
          </div>
        ))}
      </section>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='grid gap-4 xl:grid-cols-[1fr_0.8fr]'
        >
          <div className='space-y-4'>
            <Card className='transition-[box-shadow,border-color] duration-200 hover:border-primary/25 hover:shadow-md'>
              <CardHeader>
                <CardTitle>Product Identity</CardTitle>
                <CardDescription>
                  Core catalog fields used by storefront and operations.
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Premium Canvas Tote'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='slug'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='premium-canvas-tote'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='sku'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary SKU</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='BAG-001'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='category'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <select
                          className='h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring'
                          {...field}
                        >
                          <option value=''>Select category</option>
                          <option value='Bags'>Bags</option>
                          <option value='Outerwear'>Outerwear</option>
                          <option value='Knitwear'>Knitwear</option>
                          <option value='Bottoms'>Bottoms</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className='transition-[box-shadow,border-color] duration-200 hover:border-primary/25 hover:shadow-md'>
              <CardHeader>
                <CardTitle>SEO Metadata</CardTitle>
                <CardDescription>
                  Search metadata and merchandising description.
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <FormField
                  control={form.control}
                  name='seoTitle'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEO title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Premium Canvas Tote'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='seoDescription'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEO description</FormLabel>
                      <FormControl>
                        <textarea
                          className='min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring'
                          placeholder='Describe the product for search and storefront previews.'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <div className='space-y-4'>
            <Card className='transition-[box-shadow,border-color] duration-200 hover:border-primary/25 hover:shadow-md'>
              <CardHeader>
                <CardTitle>Pricing and Inventory</CardTitle>
                <CardDescription>
                  SKU pricing, sale guardrails, and stock availability.
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            min='0'
                            step='1'
                            value={field.value}
                            onChange={(event) =>
                              field.onChange(Number(event.target.value))
                            }
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='salePrice'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sale price</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            min='0'
                            step='1'
                            value={field.value}
                            onChange={(event) =>
                              field.onChange(Number(event.target.value))
                            }
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='stock'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>On-hand stock</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          min='0'
                          step='1'
                          value={field.value}
                          onChange={(event) =>
                            field.onChange(Number(event.target.value))
                          }
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className='transition-[box-shadow,border-color] duration-200 hover:border-primary/25 hover:shadow-md'>
              <CardHeader>
                <CardTitle>Publishing</CardTitle>
                <CardDescription>
                  Audience, status, and operational visibility.
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <FormField
                  control={form.control}
                  name='audience'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Audience</FormLabel>
                      <FormControl>
                        <select
                          className='h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring'
                          {...field}
                        >
                          <option value='Women'>Women</option>
                          <option value='Men'>Men</option>
                          <option value='Unisex'>Unisex</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <select
                          className='h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring'
                          {...field}
                        >
                          <option value='Draft'>Draft</option>
                          <option value='Active'>Active</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type='submit'
                  disabled={!form.formState.isValid || form.formState.isSubmitting}
                  className='w-full'
                >
                  <Save />
                  {mode === 'create' ? 'Create draft' : 'Save changes'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </PageShell>
  );
};
