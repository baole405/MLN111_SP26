# Setup Husky với PNPM - CI Local cho MLN111 Project

## 🎯 Mục Đích

Ngăn developers push code lỗi lên repository bằng cách:

1. Chạy `pnpm run build` trước khi push
2. Nếu build fail → Không cho push
3. Đảm bảo code trên repo luôn deployable

## 📋 Hướng Dẫn Setup

### Bước 1: Cài đặt Husky (với PNPM)

```bash
cd d:\FPT Doc\ses8\mln\MLN111\project\MLN111_SP26\Project

# Cài Husky bằng pnpm
pnpm add -D husky

# Khởi tạo Husky
pnpm exec husky init
```

### Bước 2: Scripts trong package.json

File `package.json` đã được update:

```json
{
  "scripts": {
    "build": "next build",
    "dev": "next dev",
    "lint": "eslint .",
    "start": "next start",
    "ci:local": "pnpm run build", // ← Dùng pnpm
    "prepare": "husky"
  }
}
```

### Bước 3: Tạo Pre-Push Hook

Tạo file `.husky/pre-push` (sẽ tạo tự động sau bước 5):

**File: `.husky/pre-push`**

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running pre-push checks..."
echo "📦 Testing build with pnpm..."

# Chạy build để test
pnpm run ci:local

# Nếu build fail, hook sẽ return error và ngăn push
```

### Bước 4: Chạy Prepare (Tự Động Setup Husky)

```bash
# Lệnh này sẽ tạo thư mục .husky và setup hooks
pnpm run prepare
```

### Bước 5: Tôi Sẽ Tạo Pre-Push Hook Cho Bạn

Các file cần thiết sẽ được tạo tự động.

## 🛠️ Cấu Trúc Thư Mục Sau Khi Setup

```
Project/
├── .husky/
│   ├── _/
│   ├── pre-commit (optional)
│   └── pre-push (bắt buộc)
├── package.json (đã update)
├── pnpm-lock.yaml (đã có sẵn)
└── ... (các file khác)
```

## ⚠️ Lưu Ý Khi Dùng PNPM

### 1. Tất Cả Commands Dùng PNPM

```bash
# ✅ ĐÚNG
pnpm install
pnpm run dev
pnpm run build

# ❌ SAI
npm install
npm run dev
```

### 2. Husky với PNPM

Husky tương thích tốt với pnpm. Không cần config gì thêm.

### 3. Team Cần Có PNPM

Đảm bảo cả team cài pnpm:

```bash
npm install -g pnpm
```

## 🚀 Workflow Sau Khi Setup

```
Developer viết code
       ↓
git add .
       ↓
git commit -m "..."
       ↓
git push
       ↓
🔍 Husky pre-push hook kích hoạt
       ↓
📦 pnpm run build
       ↓
   ✅ Build thành công?
   ├─ YES → Push lên remote ✅
   └─ NO  → Chặn push, hiện lỗi ❌
```

## 🎯 Commands Hữu Ích

```bash
# Test build manually
pnpm run ci:local

# Skip hook (khẩn cấp only)
git push --no-verify

# Re-install husky nếu lỗi
pnpm install
pnpm run prepare
```

## 🐛 Troubleshooting

### Lỗi: "pnpm: command not found"

**Giải pháp:**

```bash
npm install -g pnpm
```

### Lỗi: "husky: command not found"

**Giải pháp:**

```bash
pnpm install
pnpm run prepare
```

### Hook không chạy

**Giải pháp:**

```bash
# Kiểm tra .husky/pre-push có tồn tại không
ls -la .husky/

# Nếu không có, tạo lại:
pnpm exec husky init
```

## 📊 Vercel Deployment

Vercel tự động detect pnpm qua `pnpm-lock.yaml`. Không cần config gì thêm! ✅

## ⏱️ Build Time

Next.js build với pnpm:

- Development: ~30-60s
- Production build: ~1-2 phút

Team cần kiên nhẫn đợi build xong trước khi push được.

---

**Ready để setup? Check terminal để xem pnpm install đã xong chưa!**
