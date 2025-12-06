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

    try {
      await createRoleMutation.mutateAsync(formData);
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
                placeholder="VD: ROLE_MANAGER"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={50}
              />
              <p className="text-sm text-muted-foreground">
                Tối đa 50 ký tự. Nên bắt đầu với ROLE_
              </p>
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
