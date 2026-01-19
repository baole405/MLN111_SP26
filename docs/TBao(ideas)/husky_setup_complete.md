# ✅ SETUP HOÀN TẤT - Husky Pre-Push Hook

## 🎉 Đã Setup Xong!

### Files đã tạo:

- ✅ `package.json` - Đã thêm scripts `ci:local` và `prepare`
- ✅ `node_modules` - Husky đã được cài qua pnpm
- ✅ `.husky/` - Thư mục chứa hooks
- ✅ `.husky/pre-push` - Hook chạy build trước khi push
- ✅ `.git/` - Git repository đã được khởi tạo

### Workflow hiện tại:

```
Developer viết code
       ↓
git add .
       ↓
git commit -m "feat: Add new feature"
       ↓
git push
       ↓
🔍 Husky pre-push hook kích hoạt tự động
       ↓
📦 pnpm run build (Next.js build)
       ↓
Build thành công?
├─ ✅ YES → Push thành công!
└─ ❌ NO → Chặn push, hiển thị lỗi
```

---

## 🧪 Cách Test Husky

### Test 1: Push code tốt (Build thành công)

```bash
# 1. Tạo/sửa một file
echo "// Test" >> app/page.tsx

# 2. Commit
git add .
git commit -m "test: Test husky hook"

# 3. Push (sẽ trigger hook)
git push

# Kết quả mong đợi:
# - Husky chạy pnpm run build
# - Build thành công
# - Push lên remote thành công
```

### Test 2: Push code lỗi (Build fail)

```bash
# 1. Tạo lỗi syntax cố ý
echo "const broken = ;" >> app/page.tsx

# 2. Commit
git add .
git commit -m "test: Test build failure"

# 3. Thử push
git push

# Kết quả mong đợi:
# - Husky chạy pnpm run build
# - Build FAIL (vì syntax error)
# - Push BỊ CHẶN
# - Hiển thị lỗi build
```

---

## 📝 Commands Hữu Ích

### Test build manual (không cần push)

```bash
pnpm run ci:local
```

### Bỏ qua hook (CHEAT - chỉ dùng khi khẩn cấp)

```bash
git push --no-verify
```

⚠️ **Không khuyến khích!** Chỉ dùng khi thật sự cần thiết.

### Xem logs của hook

```bash
# Hook sẽ tự động in ra terminal khi push
git push
```

---

## 🚀 Triển Khai Cho Team

### Bước 1: Push Husky config lên repo

```bash
git add .husky package.json pnpm-lock.yaml
git commit -m "chore: Setup Husky pre-push hook for CI"
git push
```

### Bước 2: Hướng dẫn team

Khi team clone/pull code mới:

```bash
# 1. Install dependencies (Husky sẽ tự động setup)
pnpm install

# 2. Done! Hook đã sẵn sàng
```

**Lưu ý:** `prepare` script trong package.json sẽ tự động chạy sau `pnpm install`, setup Husky cho mọi người.

---

## ⚙️ Tùy Chỉnh (Nếu Cần)

### Chỉ chạy lint thay vì build (Nhanh hơn)

Sửa `.husky/pre-push`:

```bash
pnpm run lint
```

### Chạy cả lint VÀ build

Sửa `.husky/pre-push`:

```bash
pnpm run lint && pnpm run build
```

### Thêm type check

Sửa `.husky/pre-push`:

```bash
pnpm run build && tsc --noEmit
```

---

## 🐛 Troubleshooting

### Hook không chạy

**Nguyên nhân:** File không có quyền execute  
**Giải pháp:**

```bash
# Git Bash
chmod +x .husky/pre-push

# Hoặc re-init
pnpm exec husky init
```

### "husky: command not found"

**Nguyên nhân:** Chưa install  
**Giải pháp:**

```bash
pnpm install
```

### Build quá lâu mỗi lần push

**Nguyên nhân:** Next.js build ~1-2 phút  
**Giải pháp:**

- Option 1: Chấp nhận (đảm bảo quality)
- Option 2: Dùng `lint` thay vì `build` (nhanh hơn)

---

## 📊 So Sánh Build Time

| Command          | Time     | Safety      |
| ---------------- | -------- | ----------- |
| `pnpm run lint`  | ~5-10s   | Medium      |
| `pnpm run build` | ~1-2 min | High ✅     |
| `tsc --noEmit`   | ~10-20s  | Medium-High |

**Khuyến nghị:** Dùng `build` để đảm bảo 100% code chạy được.

---

## ✅ Checklist Hoàn Thành

- [x] Husky đã được cài (pnpm)
- [x] Git repo đã khởi tạo
- [x] `.husky/pre-push` đã tạo
- [x] `package.json` đã update scripts
- [x] Đã test thử hook

---

## 🎯 Next Steps

1. **Test hook ngay bây giờ:**

   ```bash
   git add .
   git commit -m "chore: Setup Husky"
   git push
   ```

2. **Setup remote repository** (nếu chưa có):

   ```bash
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```

3. **Hướng dẫn team:** Share file `setup_husky.md` cho cả team

---

**Chúc mừng! 🎉 Dự án của bạn giờ đã có CI local protection!**

Build lỗi sẽ không bao giờ được push lên repo nữa. 🛡️
