import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Supplier, SupplierCreateRequest, SupplierUpdateRequest } from '@/features/supplier';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Textarea } from '@/components/UI/textarea';
import { Label } from '@/components/UI/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/card';

const supplierSchema = z.object({
  name: z.string().min(1, 'Tên nhà cung cấp là bắt buộc'),
  phone: z.string().optional(),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  address: z.string().optional(),
  taxCode: z.string().optional(),
});

type SupplierFormData = z.infer<typeof supplierSchema>;

type SupplierFormProps = {
  supplier?: Supplier;
  onSubmit: (data: SupplierCreateRequest | SupplierUpdateRequest) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
};

const SupplierForm: React.FC<SupplierFormProps> = ({
  supplier,
  onSubmit,
  onCancel,
  loading
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SupplierFormData>({
    resolver: zodResolver(supplierSchema),
    defaultValues: supplier ? {
      name: supplier.name,
      phone: supplier.phone || '',
      email: supplier.email || '',
      address: supplier.address || '',
      taxCode: supplier.taxCode || '',
    } : {
      name: '',
      phone: '',
      email: '',
      address: '',
      taxCode: '',
    }
  });

  const onFormSubmit = async (data: SupplierFormData) => {
    const submitData = {
      ...data,
      email: data.email || undefined,
      phone: data.phone || undefined,
      address: data.address || undefined,
      taxCode: data.taxCode || undefined,
    };

    await onSubmit(submitData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {supplier ? 'Chỉnh sửa nhà cung cấp' : 'Thêm nhà cung cấp mới'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Tên nhà cung cấp *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Nhập tên nhà cung cấp"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="Nhập số điện thoại"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="Nhập email"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxCode">Mã số thuế</Label>
            <Input
              id="taxCode"
              {...register('taxCode')}
              placeholder="Nhập mã số thuế"
              className={errors.taxCode ? 'border-red-500' : ''}
            />
            {errors.taxCode && (
              <p className="text-sm text-red-500">{errors.taxCode.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ</Label>
            <Textarea
              id="address"
              {...register('address')}
              placeholder="Nhập địa chỉ"
              rows={3}
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Đang xử lý...' : supplier ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SupplierForm;