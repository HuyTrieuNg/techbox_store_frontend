# Role & Permission Management System

## 📋 Tổng quan

Hệ thống quản lý vai trò và quyền hạn cho ứng dụng TechBox Store. Cho phép admin quản lý các vai trò, gán quyền và kiểm soát truy cập hệ thống.

## 🗂️ Cấu trúc thư mục

```
src/
├── types/
│   └── role.ts                    # Type definitions cho roles & permissions
├── services/
│   └── roleService.ts             # API service calls
├── hooks/
│   └── useRoles.ts                # React Query hooks
├── components/admin/roles/
│   ├── CreateRoleDialog.tsx       # Dialog tạo vai trò mới
│   ├── DeleteRoleDialog.tsx       # Dialog xóa vai trò
│   ├── RoleList.tsx               # Danh sách vai trò
│   ├── PermissionList.tsx         # Danh sách quyền hạn
│   ├── RolePermissionManager.tsx  # Quản lý quyền cho vai trò
│   └── index.ts                   # Export components
└── app/admin/roles/
    └── page.tsx                   # Main roles page
```

## 🎯 Tính năng

### 1. Quản lý Vai trò
- ✅ Xem danh sách tất cả vai trò
- ✅ Tạo vai trò mới
- ✅ Xóa vai trò (soft delete)
- ✅ Bảo vệ vai trò hệ thống (ROLE_ADMIN, ROLE_STAFF, ROLE_CUSTOMER)
- ✅ Hiển thị số lượng quyền của mỗi vai trò

### 2. Quản lý Quyền hạn
- ✅ Xem tất cả quyền hạn theo module
- ✅ Phân loại quyền theo 9 modules:
  - USER (Người dùng)
  - PRODUCT (Sản phẩm)
  - ORDER (Đơn hàng)
  - VOUCHER (Voucher)
  - CAMPAIGN (Chiến dịch)
  - PROMOTION (Khuyến mãi)
  - REVIEW (Đánh giá)
  - INVENTORY (Kho hàng)
  - REPORT (Báo cáo)

### 3. Gán quyền cho Vai trò
- ✅ Dialog quản lý quyền trực quan
- ✅ Tìm kiếm quyền
- ✅ Filter quyền theo module
- ✅ Chọn/bỏ chọn từng quyền
- ✅ Chọn/bỏ chọn toàn bộ module
- ✅ Hiển thị số lượng quyền đã chọn

## 🔧 API Endpoints

Tất cả endpoints sử dụng base URL: `/roles`

### Roles
- `GET /roles` - Lấy tất cả vai trò
- `GET /roles/{roleId}` - Lấy vai trò theo ID
- `GET /roles/name/{name}` - Lấy vai trò theo tên
- `POST /roles` - Tạo vai trò mới
- `DELETE /roles/{roleId}` - Xóa vai trò

### Permissions
- `GET /roles/permissions` - Lấy tất cả quyền
- `GET /roles/permissions/module/{module}` - Lấy quyền theo module
- `GET /roles/permissions/{permissionId}` - Lấy quyền theo ID
- `DELETE /roles/permissions/{permissionId}` - Xóa quyền

### Role-Permission Assignment
- `PUT /roles/{roleId}/permissions` - Gán quyền cho vai trò (thay thế tất cả)
- `POST /roles/{roleId}/permissions/{permissionId}` - Thêm 1 quyền
- `DELETE /roles/{roleId}/permissions/{permissionId}` - Xóa 1 quyền

## 📦 Dependencies

```json
{
  "@tanstack/react-query": "Latest",
  "@radix-ui/react-*": "UI Components",
  "lucide-react": "Icons",
  "date-fns": "Date formatting"
}
```

## 🚀 Sử dụng

### Truy cập trang quản lý
```
/admin/roles
```

### Tạo vai trò mới
1. Click button "Tạo vai trò mới"
2. Nhập tên vai trò (max 50 ký tự)
3. Nhập mô tả (optional, max 255 ký tự)
4. Click "Tạo vai trò"

### Gán quyền cho vai trò
1. Click icon Edit ở vai trò muốn gán quyền
2. Dialog quản lý quyền hiện ra
3. Tìm kiếm hoặc filter quyền theo module
4. Chọn/bỏ chọn quyền
5. Click "Lưu thay đổi"

### Xóa vai trò
1. Click icon Trash ở vai trò muốn xóa
2. Xác nhận xóa
3. Lưu ý: Không thể xóa vai trò hệ thống hoặc vai trò đang được gán

## 🎨 UI Components

### CreateRoleDialog
Dialog tạo vai trò mới với form validation

### DeleteRoleDialog
Alert dialog xác nhận xóa với bảo vệ vai trò hệ thống

### RoleList
Table hiển thị danh sách vai trò với:
- Badge vai trò với màu sắc khác nhau
- Số lượng quyền
- Ngày tạo
- Actions (Edit, Delete)

### PermissionList
Grid hiển thị quyền theo module với:
- Icons cho từng module
- Badge cho action
- Scroll area

### RolePermissionManager
Dialog quản lý quyền với:
- Tabs filter theo module
- Search quyền
- Checkbox chọn quyền/module
- Real-time counter

## 📊 Statistics Dashboard

Hiển thị:
- Tổng số vai trò
- Tổng số quyền
- Số vai trò hệ thống

## 🔐 Permissions Structure

Format: `MODULE:ACTION`

**Actions:**
- READ - Xem/Đọc
- WRITE - Tạo mới
- UPDATE - Cập nhật
- DELETE - Xóa
- READ_ALL - Xem tất cả
- REPORT - Báo cáo
- GENERATE - Tạo

**Example:**
- `USER:READ` - Xem người dùng
- `PRODUCT:WRITE` - Tạo sản phẩm
- `ORDER:UPDATE` - Cập nhật đơn hàng

## 🛡️ Protected Roles

Các vai trò hệ thống được bảo vệ không cho xóa:
- `ROLE_ADMIN`
- `ROLE_STAFF`
- `ROLE_CUSTOMER`

## ⚠️ Error Handling

Tất cả mutations có error handling với toast notifications:
- Success messages khi tạo/xóa/cập nhật thành công
- Error messages khi có lỗi xảy ra
- Validation errors

## 🔄 State Management

Sử dụng React Query để:
- Cache data
- Automatic refetch
- Optimistic updates
- Error retry

## 📱 Responsive Design

- Mobile friendly
- Tablet optimized
- Desktop full features

## 🎯 Next Steps

Có thể mở rộng thêm:
- [ ] Edit role name/description
- [ ] Role duplication
- [ ] Permission templates
- [ ] Audit logs
- [ ] User assignment preview
- [ ] Export/Import roles
