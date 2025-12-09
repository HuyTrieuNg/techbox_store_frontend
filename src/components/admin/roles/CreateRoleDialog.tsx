"use client";

import { useState } from "react";
import { useCreateRole } from "@/hooks/useRoles";
import { RoleCreateRequest } from "@/types/role";
import { Button } from "@/components/UI/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import { Textarea } from "@/components/UI/textarea";
import { Plus } from "lucide-react";

// Hàm chuyển text sang SCREAMING_SNAKE_CASE và thêm prefix ROLE_
function formatRoleName(input: string): string {
  // Loại bỏ khoảng trắng thừa ở đầu cuối
  const trimmed = input.trim();
  
  if (!trimmed) return '';
  
  // Chuyển thành SCREAMING_SNAKE_CASE
  const snakeCase = trimmed
    .replace(/\s+/g, '_')  // Thay khoảng trắng bằng underscore
    .toUpperCase();        // Chuyển thành chữ hoa
  
  // Thêm ROLE_ nếu chưa có
  return snakeCase.startsWith('ROLE_') ? snakeCase : `ROLE_${snakeCase}`;
}

export function CreateRoleDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<RoleCreateRequest>({
    name: "",
    description: "",
  });

  const createRoleMutation = useCreateRole();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      return;
    }

    // Format role name trước khi gửi
    const formattedData = {
      ...formData,
      name: formatRoleName(formData.name)
    };

    try {
      await createRoleMutation.mutateAsync(formattedData);
      setFormData({ name: "", description: "" });
      setOpen(false);
    } catch {
      // Error handled in hook
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tạo vai trò mới
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tạo vai trò mới</DialogTitle>
            <DialogDescription>
              Tạo vai trò mới cho hệ thống. Bạn có thể gán quyền sau khi tạo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">
                Tên vai trò <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="VD: Manager, Sales Manager, Warehouse Staff"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={50}
              />
              <p className="text-sm text-muted-foreground">
                Tối đa 50 ký tự. Hệ thống tự động thêm tiền tố ROLE_ và chuyển sang chữ hoa
              </p>
              {formData.name && (
                <p className="text-sm font-medium text-primary">
                  Kết quả: {formatRoleName(formData.name)}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Mô tả vai trò..."
                value={formData.description}
                onChange={handleChange}
                rows={3}
                maxLength={255}
              />
              <p className="text-sm text-muted-foreground">
                Tối đa 255 ký tự
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={createRoleMutation.isPending}>
              {createRoleMutation.isPending ? "Đang tạo..." : "Tạo vai trò"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
