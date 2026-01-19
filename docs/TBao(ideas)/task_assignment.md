# Phân Công Công Việc - MLN111 Interactive Project

## 👥 Team Structure (5 người)

- **2 Content Creators:** Viết nội dung câu hỏi, tình huống, lời tư vấn
- **2 Developers:** Code UI, logic, animation
- **1 Project Manager (Bạn):** Quản lý, điều phối, kiểm tra chất lượng

---

## 📅 Timeline Overview

**Tổng thời gian:** [Điền deadline của bạn - VD: 7 ngày]

### Phase 1: Planning & Content (2-3 ngày)

### Phase 2: Development (3-4 ngày)

### Phase 3: Testing & Polish (1-2 ngày)

---

## 🎯 Phase 1: Planning & Content (Ngày 1-3)

### Content Team (2 người)

#### Content Creator 1

**Nhiệm vụ:**

- [ ] Viết câu hỏi cho Game (15-20 câu)
  - 5 câu dễ
  - 7 câu trung bình
  - 3-5 câu khó
- [ ] Viết lời giải thích cho mỗi câu (2-3 dòng)
- [ ] Tìm/tạo meme hài hước cho câu trả lời sai (5-6 ảnh)

**Deliverable:** File `game_questions.json`

**Thời gian:** 6-8 giờ

#### Content Creator 2

**Nhiệm vụ:**

- [ ] Viết content cho Philosophy Debugger (15-20 vấn đề)
  - 5 vấn đề về Tình cảm
  - 5 vấn đề về Học tập
  - 5 vấn đề về Lập trình/IT
  - 3-5 vấn đề về Lối sống
- [ ] Mỗi vấn đề gồm:
  - Phân tích (quy luật áp dụng)
  - Lời khuyên (100-150 chữ)
  - Action plan (optional)

**Deliverable:** File `debugger_content.json`

**Thời gian:** 8-10 giờ

### Developer Team (2 người)

#### Developer 1

**Nhiệm vụ (Phase 1):**

- [ ] Design mockup cho Interactive Visualizer
  - Sketch UI layout
  - Chọn màu sắc, icon
- [ ] Research animation library (Framer Motion)
- [ ] Tạo component structure

**Deliverable:** Figma/Mockup + Component plan

**Thời gian:** 4-5 giờ

#### Developer 2

**Nhiệm vụ (Phase 1):**

- [ ] Design mockup cho Game Show
  - Layout câu hỏi/đáp án
  - Animation flow
- [ ] Design mockup cho Philosophy Debugger
- [ ] Setup routing cho các trang mới

**Deliverable:** Figma/Mockup + Routing plan

**Thời gian:** 4-5 giờ

### PM (Bạn)

**Nhiệm vụ (Phase 1):**

- [ ] Tổ chức team meeting
- [ ] Review mockup và content outline
- [ ] Tạo checklist chi tiết
- [ ] Setup Git branches
- [ ] Daily check-in với team

**Thời gian:** 2-3 giờ/ngày

---

## 💻 Phase 2: Development (Ngày 4-7)

### Developer 1

**Nhiệm vụ:**

- [ ] Code Interactive Visualizer
  - [ ] Slider component cho nhiệt độ
  - [ ] Animation chuyển trạng thái nước
  - [ ] Server Load simulator
  - [ ] Responsive design
- [ ] Integrate với Framer Motion
- [ ] Test trên mobile

**Deliverable:**

- `components/interactive-visualizer.tsx`
- `app/visualizer/page.tsx`

**Thời gian:** 12-15 giờ

### Developer 2

**Nhiệm vụ:**

- [ ] Code Game Show
  - [ ] Question display component
  - [ ] Timer + Progress bar
  - [ ] Answer feedback (pháo hoa/meme)
  - [ ] Score tracking
- [ ] Code Philosophy Debugger
  - [ ] Category selection
  - [ ] Problem selection
  - [ ] Analysis display (typing effect)
- [ ] Integrate content từ JSON files

**Deliverable:**

- `components/game-show.tsx`
- `components/philosophy-debugger.tsx`
- `app/game/page.tsx`
- `app/debugger/page.tsx`

**Thời gian:** 12-15 giờ

### Content Team

**Nhiệm vụ (Phase 2):**

- [ ] Finalize tất cả content
- [ ] Convert sang JSON format
- [ ] Test đọc content với Dev team
- [ ] Viết script thuyết trình (cho buổi present)

**Thời gian:** 4-6 giờ

### PM (Bạn)

**Nhiệm vụ (Phase 2):**

- [ ] Code review
- [ ] Test features
- [ ] Quản lý Git merge conflicts
- [ ] Update progress tracking
- [ ] Prepare backup plan (nếu không kịp)

**Thời gian:** 3-4 giờ/ngày

---

## ✨ Phase 3: Testing & Polish (Ngày 8-9)

### Cả Team

**Nhiệm vụ chung:**

- [ ] **Testing toàn diện**
  - [ ] Test trên Chrome, Firefox, Edge
  - [ ] Test trên mobile (iOS, Android)
  - [ ] Test tất cả features
  - [ ] Tìm và fix bugs
- [ ] **Polish UI/UX**
  - [ ] Smooth animations
  - [ ] Consistent colors
  - [ ] Responsive design
- [ ] **Content review**
  - [ ] Kiểm tra chính tả
  - [ ] Kiểm tra logic
  - [ ] Đảm bảo không vi phạm học thuật

### Developer Team

- [ ] Performance optimization
- [ ] Fix responsive issues
- [ ] Add loading states
- [ ] Deploy lên hosting (Vercel/Netlify)

### Content Team

- [ ] Tập dượt script thuyết trình
- [ ] Chuẩn bị slide backup (nếu web lỗi)
- [ ] Viết speaker notes

### PM (Bạn)

- [ ] Final QA check
- [ ] Tổ chức buổi rehearsal
- [ ] Chuẩn bị plan B
- [ ] Confirm deploy URL
- [ ] Viết email báo cáo tiến độ (nếu cần)

---

## 📊 Phân Bổ Workload

| Thành viên        | Tổng giờ | Intensity   |
| ----------------- | -------- | ----------- |
| Content Creator 1 | 12-15h   | Medium      |
| Content Creator 2 | 12-15h   | Medium      |
| Developer 1       | 18-22h   | High        |
| Developer 2       | 18-22h   | High        |
| PM (Bạn)          | 15-18h   | Medium-High |

**Tổng:** ~75-92 giờ cho 5 người = **Trung bình 15-18h/người**

---

## 🎯 Priority Levels

### Must Have (Bắt buộc)

1. ✅ Interactive Visualizer - Quy luật Lượng-Chất
2. ✅ Game Show - Ít nhất 10 câu hỏi

### Should Have (Nên có)

3. ✅ Philosophy Debugger - Ít nhất 10 vấn đề
4. ✅ Responsive design tốt

### Nice to Have (Tốt nếu có)

5. ⭐ Sound effects
6. ⭐ Leaderboard cho game
7. ⭐ Share feature

---

## 📞 Communication Plan

### Daily Standup (Online)

- **Thời gian:** Mỗi tối 9pm
- **Thời lượng:** 10-15 phút
- **Nội dung:**
  - Hôm nay làm được gì?
  - Ngày mai sẽ làm gì?
  - Có vướng mắc gì không?

### Mid-point Review

- **Thời gian:** Giữa Phase 2 (Ngày 5)
- **Nội dung:** Demo features đã hoàn thành

### Final Rehearsal

- **Thời gian:** Ngày cuối Phase 3
- **Nội dung:** Toàn team tập dượt thuyết trình

---

## 🚨 Risk Management

### Risk 1: Không kịp làm hết 3 features

**Mitigation:**

- Ưu tiên Visualizer + Game
- Cắt bỏ Debugger nếu cần

### Risk 2: Code bị bug ngay trước giờ thuyết trình

**Mitigation:**

- Deploy sớm (trước 1 ngày)
- Chuẩn bị video demo backup
- Test kỹ trước

### Risk 3: Content chưa đủ chất lượng

**Mitigation:**

- PM review content sớm
- Có template rõ ràng
- Dự phòng thời gian sửa

### Risk 4: Team member bận đột xuất

**Mitigation:**

- Backup knowledge sharing
- Git commit thường xuyên
- PM có thể cover bất kỳ role nào

---

## 📋 Checklist Trước Buổi Thuyết Trình

- [ ] Web app chạy tốt (local + deployed)
- [ ] Test trên laptop thuyết trình
- [ ] Backup plan: Video demo
- [ ] Script thuyết trình đã tập dượt
- [ ] Slides backup (nếu cần)
- [ ] Đã test internet tại phòng học
- [ ] Chuẩn bị screen recording (nếu muốn)

---

## 🎯 Success Metrics

Dự án thành công khi:

- [ ] Cả 3 features hoạt động tốt (hoặc ít nhất 2)
- [ ] UI đẹp, animation mượt
- [ ] Content chính xác, không sai lệch lý thuyết
- [ ] Cả lớp tham gia và thích thú
- [ ] Cô giáo đánh giá cao

---

## 💬 Template Git Commit Messages

```
feat: Add temperature slider for Quantity-Quality law
fix: Bug in game show answer feedback
content: Add 5 new questions for game
style: Improve responsive design for mobile
docs: Update README with deployment info
```

---

**Lưu ý:** File này là bản phân công ban đầu. PM sẽ update theo tiến độ thực tế.

**Liên hệ PM (Bạn):** [Điền SĐT/Email]

---

**Let's make this project WOW! 🚀**
