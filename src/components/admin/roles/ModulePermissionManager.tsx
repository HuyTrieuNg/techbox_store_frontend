"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import {
  getAllModules,
  createModule,
  deleteModule,
  createPermission,
  ModulePermissionResponse,
} from "@/services/roleService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import { Textarea } from "@/components/UI/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/accordion";
import { Badge } from "@/components/UI/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, FolderOpen, Key } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/UI/alert-dialog";

// Utility function to convert to SCREAMING_SNAKE_CASE
const toScreamingSnakeCase = (str: string): string => {
  return str
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '_')
    .replace(/[^A-Z0-9_]/g, '');
};

export function ModulePermissionManager() {
  const { toast } = useToast();

  const [moduleDialogOpen, setModuleDialogOpen] = useState(false);
  const [permissionDialogOpen, setPermissionDialogOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState<string>("");
  const [isCreatingModule, setIsCreatingModule] = useState(false);
  const [isCreatingPermission, setIsCreatingPermission] = useState(false);
  const [isDeletingModule, setIsDeletingModule] = useState(false);

  // Form states
  const [moduleName, setModuleName] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [permissionModule, setPermissionModule] = useState("");
  const [permissionAction, setPermissionAction] = useState("");
  const [permissionDescription, setPermissionDescription] = useState("");

  // Fetch modules with SWR
  const { data: modules, isLoading, mutate: revalidate } = useSWR<ModulePermissionResponse[]>(
    "modules",
    getAllModules,
    { revalidateOnFocus: false }
  );

  const handleCreateModule = async () => {
    const formattedName = toScreamingSnakeCase(moduleName);
    
    if (!formattedName) {
      toast({
        title: "Lỗi",
        description: "Tên module không hợp lệ",
        variant: "destructive",
      });
      return;
    }

    setIsCreatingModule(true);
    try {
      await createModule({
        moduleName: formattedName,
        description: moduleDescription,
      });
      
      await revalidate();
      
      toast({
        title: "Thành công",
        description: "Đã tạo module mới",
      });
      
      setModuleDialogOpen(false);
      setModuleName("");
      setModuleDescription("");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast({
        title: "Lỗi",
        description: err.response?.data?.message || "Không thể tạo module",
        variant: "destructive",
      });
    } finally {
      setIsCreatingModule(false);
    }
  };

  const handleCreatePermission = async () => {
    const formattedModule = toScreamingSnakeCase(permissionModule);
    const formattedAction = toScreamingSnakeCase(permissionAction);
    
    if (!formattedModule || !formattedAction) {
      toast({
        title: "Lỗi",
        description: "Tên module và hành động không hợp lệ",
        variant: "destructive",
      });
      return;
    }

    const permissionName = `${formattedModule}:${formattedAction}`;

    setIsCreatingPermission(true);
    try {
      await createPermission({
        name: permissionName,
        description: permissionDescription,
      });
      
      await revalidate();
      
      toast({
        title: "Thành công",
        description: "Đã tạo quyền mới",
      });
      
      setPermissionDialogOpen(false);
      setPermissionModule("");
      setPermissionAction("");
      setPermissionDescription("");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast({
        title: "Lỗi",
        description: err.response?.data?.message || "Không thể tạo quyền",
        variant: "destructive",
      });
    } finally {
      setIsCreatingPermission(false);
    }
  };

  const handleDeleteModule = (moduleName: string) => {
    setModuleToDelete(moduleName);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteModule = async () => {
    if (!moduleToDelete) return;
    
    setIsDeletingModule(true);
    try {
      await deleteModule(moduleToDelete);
      
      await revalidate();
      
      toast({
        title: "Thành công",
        description: "Đã xóa module",
      });
      
      setDeleteDialogOpen(false);
      setModuleToDelete("");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast({
        title: "Lỗi",
        description: err.response?.data?.message || "Không thể xóa module",
        variant: "destructive",
      });
    } finally {
      setIsDeletingModule(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Đang tải...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex gap-3">
        <Dialog open={moduleDialogOpen} onOpenChange={setModuleDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tạo Module
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tạo Module mới</DialogTitle>
              <DialogDescription>
                Nhập tên module (sẽ tự động chuyển sang SCREAMING_SNAKE_CASE)
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="module-name">Tên Module</Label>
                <Input
                  id="module-name"
                  placeholder="VD: User Management, Product Catalog"
                  value={moduleName}
                  onChange={(e) => setModuleName(e.target.value)}
                />
                {moduleName && (
                  <p className="text-sm text-muted-foreground">
                    Sẽ tạo: <span className="font-mono font-bold">{toScreamingSnakeCase(moduleName)}</span>
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="module-description">Mô tả (tùy chọn)</Label>
                <Textarea
                  id="module-description"
                  placeholder="Mô tả chức năng của module"
                  value={moduleDescription}
                  onChange={(e) => setModuleDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setModuleDialogOpen(false)}>
                Hủy
              </Button>
              <Button
                onClick={handleCreateModule}
                disabled={!moduleName || isCreatingModule}
              >
                {isCreatingModule ? "Đang tạo..." : "Tạo Module"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={permissionDialogOpen} onOpenChange={setPermissionDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Key className="mr-2 h-4 w-4" />
              Tạo Quyền
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tạo Quyền mới</DialogTitle>
              <DialogDescription>
                Nhập tên module và hành động (sẽ tự động ghép thành MODULE:ACTION)
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="permission-module">Module</Label>
                <Input
                  id="permission-module"
                  placeholder="VD: User, Product, Order"
                  value={permissionModule}
                  onChange={(e) => setPermissionModule(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="permission-action">Hành động</Label>
                <Input
                  id="permission-action"
                  placeholder="VD: Read, Write, Delete, Create"
                  value={permissionAction}
                  onChange={(e) => setPermissionAction(e.target.value)}
                />
              </div>
              {permissionModule && permissionAction && (
                <p className="text-sm text-muted-foreground">
                  Tên quyền: <span className="font-mono font-bold">
                    {toScreamingSnakeCase(permissionModule)}:{toScreamingSnakeCase(permissionAction)}
                  </span>
                </p>
              )}
              <div className="space-y-2">
                <Label htmlFor="permission-description">Mô tả (tùy chọn)</Label>
                <Textarea
                  id="permission-description"
                  placeholder="Mô tả quyền này cho phép làm gì"
                  value={permissionDescription}
                  onChange={(e) => setPermissionDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPermissionDialogOpen(false)}>
                Hủy
              </Button>
              <Button
                onClick={handleCreatePermission}
                disabled={!permissionModule || !permissionAction || isCreatingPermission}
              >
                {isCreatingPermission ? "Đang tạo..." : "Tạo Quyền"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Modules List */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách Module & Quyền</CardTitle>
          <CardDescription>
            Quản lý các module và quyền hạn trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!modules || modules.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FolderOpen className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>Chưa có module nào</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {modules.map((module) => (
                <AccordionItem key={module.moduleName} value={module.moduleName}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <FolderOpen className="h-5 w-5 text-primary" />
                        <div className="text-left">
                          <div className="font-semibold font-mono">{module.moduleName}</div>
                          {module.description && (
                            <div className="text-sm text-muted-foreground font-normal">
                              {module.description}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {module.totalPermissions} quyền
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteModule(module.moduleName);
                          }}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-8 space-y-2">
                      {module.permissions.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-2">
                          Chưa có quyền nào trong module này
                        </p>
                      ) : (
                        <div className="grid gap-2">
                          {module.permissions.map((permission) => (
                            <div
                              key={permission.id}
                              className="flex items-center justify-between p-3 border rounded-lg bg-muted/50"
                            >
                              <div>
                                <div className="font-mono font-medium text-sm">
                                  {permission.name}
                                </div>
                                {permission.description && (
                                  <div className="text-sm text-muted-foreground">
                                    {permission.description}
                                  </div>
                                )}
                              </div>
                              <Badge variant="outline">{permission.action}</Badge>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa module</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc muốn xóa module <span className="font-bold">{moduleToDelete}</span>?
              <br />
              <span className="text-destructive">
                Lưu ý: Không thể xóa nếu module còn quyền liên quan.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteModule}
              className="bg-destructive hover:bg-destructive/90"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
