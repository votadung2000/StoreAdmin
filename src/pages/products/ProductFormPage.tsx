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
import { PageState } from '@/components/shared/app-page-state';
import { ROUTES } from '@/constants/routes';
import { useTranslation } from 'react-i18next';
import { products } from '@/shared/demo/store-data';

type Translate = (key: string, params?: Record<string, string | number>) => string;

const createProductSchema = (t: Translate) =>
  z
    .object({
      name: z.string().min(3, t('validation.nameMin')),
      slug: z.string().min(3, t('validation.slugMin')),
      sku: z.string().min(3, t('validation.skuMin')),
      category: z.string().min(1, t('validation.categoryRequired')),
      audience: z.string().min(1, t('validation.audienceRequired')),
      status: z.enum(['Draft', 'Active']),
      price: z.number().positive(t('validation.pricePositive')),
      salePrice: z.number().min(0, t('validation.salePriceMin')),
      stock: z.number().min(0, t('validation.stockMin')),
      seoTitle: z.string().min(5, t('validation.seoTitleMin')),
      seoDescription: z.string().min(20, t('validation.seoDescriptionMin')),
    })
    .refine((value) => value.salePrice === 0 || value.salePrice < value.price, {
      path: ['salePrice'],
      message: t('validation.salePriceLower'),
    });

type ProductFormValues = z.output<ReturnType<typeof createProductSchema>>;

type ProductFormPageProps = {
  mode: 'create' | 'edit';
};

export const ProductFormPage = ({ mode }: ProductFormPageProps) => {
  const { t } = useTranslation();
  const params = useParams({ strict: false }) as { productId?: string };
  const existingProduct =
    mode === 'edit'
      ? products.find((item) => item.id === params.productId)
      : undefined;
  const [submitted, setSubmitted] = React.useState(false);
  const productSchema = React.useMemo(() => createProductSchema(t), [t]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
    defaultValues: {
      name: existingProduct?.name ?? '',
      slug:
        existingProduct
          ? existingProduct.name.toLowerCase().replace(/\s+/g, '-')
          : '',
      sku: existingProduct?.sku ?? '',
      category: existingProduct?.category ?? '',
      audience: existingProduct?.audience ?? 'Unisex',
      status: existingProduct?.status === 'Draft' ? 'Draft' : 'Active',
      price: existingProduct?.price ?? 0,
      salePrice: 0,
      stock: existingProduct?.stock ?? 0,
      seoTitle: existingProduct?.name ?? '',
      seoDescription:
        existingProduct
          ? `${existingProduct.name} for curated seasonal merchandising.`
          : '',
    },
  });

  const watchedValues = useWatch({ control: form.control });
  const completionItems = [
    {
      label: t('productForm.step.identity'),
      complete: Boolean(
        watchedValues.name &&
          watchedValues.slug &&
          watchedValues.sku &&
          watchedValues.category,
      ),
    },
    {
      label: t('productForm.step.pricing'),
      complete: Boolean((watchedValues.price ?? 0) > 0),
    },
    {
      label: t('productForm.step.inventory'),
      complete: Boolean((watchedValues.stock ?? -1) >= 0),
    },
    {
      label: t('productForm.step.seo'),
      complete: Boolean(
        watchedValues.seoTitle && (watchedValues.seoDescription?.length ?? 0) >= 20,
      ),
    },
  ];

  const onSubmit = () => {
    setSubmitted(true);
  };

  if (mode === 'edit' && !existingProduct) {
    return (
      <PageShell
        title={t('productDetail.notFoundTitle')}
        description={t('productDetail.notFoundDescription')}
        actions={
          <Button
            asChild
            variant='outline'
          >
            <Link to={ROUTES.MAIN.PRODUCTS}>
              <ArrowLeft />
              {t('actions.products')}
            </Link>
          </Button>
        }
      >
        <PageState
          variant='empty'
          title={t('productDetail.notFoundTitle')}
          description={t('productDetail.notFoundState')}
        />
      </PageShell>
    );
  }

  return (
    <PageShell
      title={
        mode === 'create'
          ? t('route.createProduct.label')
          : t('route.editProduct.label')
      }
      description={t('productForm.description')}
      actions={
        <div className='flex flex-wrap items-center gap-2'>
          <Badge variant='info'>{t('productForm.status.validatedDraft')}</Badge>
          <Button
            asChild
            variant='outline'
          >
            <Link to={ROUTES.MAIN.PRODUCTS}>
              <ArrowLeft />
              {t('actions.products')}
            </Link>
          </Button>
        </div>
      }
    >
      {submitted && (
        <Alert className='border-emerald-200 bg-emerald-50 text-emerald-900 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1'>
          <CheckCircle2 className='h-4 w-4' />
          <AlertTitle>{t('productForm.alert.title')}</AlertTitle>
          <AlertDescription>
            {t('productForm.alert.description')}
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
              {item.complete
                ? t('status.generic.ready')
                : t('status.generic.open')}
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
                <CardTitle>{t('productForm.identity.title')}</CardTitle>
                <CardDescription>
                  {t('productForm.identity.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('field.name')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('placeholder.productName')}
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
                      <FormLabel>{t('field.slug')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('placeholder.productSlug')}
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
                      <FormLabel>{t('field.primarySku')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('placeholder.productSku')}
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
                      <FormLabel>{t('field.category')}</FormLabel>
                      <FormControl>
                        <select
                          className='h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring'
                          {...field}
                        >
                          <option value=''>{t('placeholder.selectCategory')}</option>
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
                <CardTitle>{t('productForm.seo.title')}</CardTitle>
                <CardDescription>
                  {t('productForm.seo.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <FormField
                  control={form.control}
                  name='seoTitle'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('field.seoTitle')}</FormLabel>
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
                      <FormLabel>{t('field.seoDescription')}</FormLabel>
                      <FormControl>
                        <textarea
                          className='min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring'
                          placeholder={t('placeholder.seoDescription')}
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
                <CardTitle>{t('productForm.pricing.title')}</CardTitle>
                <CardDescription>
                  {t('productForm.pricing.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('field.price')}</FormLabel>
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
                        <FormLabel>{t('field.salePrice')}</FormLabel>
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
                      <FormLabel>{t('field.onHandStock')}</FormLabel>
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
                <CardTitle>{t('productForm.publishing.title')}</CardTitle>
                <CardDescription>
                  {t('productForm.publishing.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <FormField
                  control={form.control}
                  name='audience'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('field.audience')}</FormLabel>
                      <FormControl>
                        <select
                          className='h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring'
                          {...field}
                        >
                          <option value='Women'>{t('status.audience.women')}</option>
                          <option value='Men'>{t('status.audience.men')}</option>
                          <option value='Unisex'>
                            {t('status.audience.unisex')}
                          </option>
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
                      <FormLabel>{t('field.status')}</FormLabel>
                      <FormControl>
                        <select
                          className='h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring'
                          {...field}
                        >
                          <option value='Draft'>{t('status.product.draft')}</option>
                          <option value='Active'>
                            {t('status.product.active')}
                          </option>
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
                  {mode === 'create'
                    ? t('actions.createDraft')
                    : t('actions.saveChanges')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </PageShell>
  );
};
