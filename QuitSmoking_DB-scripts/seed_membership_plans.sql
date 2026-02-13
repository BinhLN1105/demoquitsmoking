-- truy cập vào database quitsmoking
use quitsmoking;

-- =============================================
-- Seed Data: Membership Plans
-- Bảng: membership_plans
-- =============================================

INSERT INTO membership_plans (id, plan_name, price, duration_days, description, created_at, updated_at, is_active, plan_type)
VALUES
('FREE_TRIAL_PLAN', 'Gói Trải Nghiệm', 0.00, 30, 'Gói dùng thử miễn phí 30 ngày. Trải nghiệm các tính năng cơ bản của hệ thống hỗ trợ cai thuốc lá.', NOW(), NOW(), true, 'THIRTY_DAYS_TRIAL'),

('PLAN30DAYS', 'Gói 30 Ngày', 99000.00, 30, 'Gói thành viên 30 ngày. Truy cập đầy đủ các tính năng hỗ trợ cai thuốc lá, bao gồm tư vấn coach và cộng đồng.', NOW(), NOW(), true, 'THIRTY_DAYS'),

('PLAN60DAYS', 'Gói 60 Ngày', 179000.00, 60, 'Gói thành viên 60 ngày. Truy cập đầy đủ tính năng với thời gian dài hơn, tiết kiệm hơn so với gói 30 ngày.', NOW(), NOW(), true, 'SIXTY_DAYS'),

('PLAN90DAYS', 'Gói 90 Ngày', 249000.00, 90, 'Gói thành viên 90 ngày. Gói VIP với thời gian dài nhất, tiết kiệm nhất và ưu tiên hỗ trợ từ coach.', NOW(), NOW(), true, 'NINETY_DAYS');

-- =============================================
-- Seed Data: Achievements
-- Bảng: achievements
-- =============================================

INSERT INTO achievements (id, name, description, icon_url, criteria_type, criteria_value, badge_color, created_at)
VALUES
(UUID(), 'Ngày Đầu Tiên', 'Chúc mừng bạn đã hoàn thành ngày đầu tiên không hút thuốc!', '🌟', 'DAYS_SMOKE_FREE', 1, 'BRONZE', NOW()),
(UUID(), 'Một Tuần Kiên Cường', 'Bạn đã không hút thuốc được 7 ngày liên tiếp. Tuyệt vời!', '🏅', 'DAYS_SMOKE_FREE', 7, 'SILVER', NOW()),
(UUID(), 'Hai Tuần Vững Vàng', 'Hai tuần không hút thuốc! Cơ thể bạn đang hồi phục rõ rệt.', '💪', 'DAYS_SMOKE_FREE', 14, 'SILVER', NOW()),
(UUID(), 'Một Tháng Chiến Thắng', '30 ngày không hút thuốc! Bạn là người chiến thắng!', '🏆', 'DAYS_SMOKE_FREE', 30, 'GOLD', NOW()),
(UUID(), 'Hai Tháng Bền Bỉ', '60 ngày không hút thuốc! Sức khỏe của bạn đang cải thiện đáng kể.', '⭐', 'DAYS_SMOKE_FREE', 60, 'GOLD', NOW()),
(UUID(), 'Ba Tháng Phi Thường', '90 ngày không hút thuốc! Bạn là nguồn cảm hứng cho mọi người!', '👑', 'DAYS_SMOKE_FREE', 90, 'PLATINUM', NOW()),
(UUID(), 'Tiết Kiệm 100K', 'Bạn đã tiết kiệm được 100,000 VNĐ nhờ không hút thuốc!', '💰', 'MONEY_SAVED', 100000, 'BRONZE', NOW()),
(UUID(), 'Tiết Kiệm 500K', 'Nửa triệu đồng tiết kiệm được! Hãy tự thưởng cho mình.', '💎', 'MONEY_SAVED', 500000, 'SILVER', NOW()),
(UUID(), 'Tiết Kiệm 1 Triệu', 'Một triệu đồng tiết kiệm! Số tiền này có thể làm được rất nhiều điều.', '🤑', 'MONEY_SAVED', 1000000, 'GOLD', NOW()),
(UUID(), 'Tránh 100 Điếu Thuốc', 'Bạn đã tránh được 100 điếu thuốc. Phổi của bạn cảm ơn bạn!', '🫁', 'CIGARETTES_AVOIDED', 100, 'SILVER', NOW());

-- =============================================
-- Seed Data: Community Posts
-- Bảng: community_posts
-- Lưu ý: user_id tham chiếu đến bảng users
-- =============================================

-- Lấy user_id của admin và coach đã tạo bởi DataInitializer
SET @admin_id = (SELECT id FROM users WHERE username = 'admin' LIMIT 1);
SET @coach_id = (SELECT id FROM users WHERE username = 'coach' LIMIT 1);

INSERT INTO community_posts (id, user_id, title, content, post_type, achievement_id, likes_count, comments_count, is_featured, created_at, updated_at)
VALUES
(UUID(), @admin_id, 'Chào mừng đến với Cộng Đồng QuitSmoking!',
 'Xin chào tất cả mọi người! Đây là nơi chúng ta cùng nhau chia sẻ, động viên và hỗ trợ nhau trên hành trình cai thuốc lá. Hãy thoải mái đặt câu hỏi, chia sẻ kinh nghiệm và câu chuyện của bạn. Mỗi ngày không hút thuốc là một chiến thắng! 💪',
 'MOTIVATION', NULL, 5, 0, true, NOW(), NOW()),

(UUID(), @coach_id, '5 Mẹo Giúp Bạn Vượt Qua Cơn Thèm Thuốc',
 '1. Uống nhiều nước - Giúp giảm cảm giác thèm thuốc\n2. Tập thể dục nhẹ - Đi bộ 15 phút khi thèm thuốc\n3. Nhai kẹo cao su - Giữ miệng bận rộn\n4. Hít thở sâu - 4 giây hít vào, 7 giây giữ, 8 giây thở ra\n5. Gọi điện cho bạn bè - Nói chuyện giúp bạn quên đi cơn thèm\n\nHãy thử và chia sẻ mẹo nào hiệu quả với bạn nhé!',
 'ADVICE', NULL, 12, 0, true, NOW(), NOW()),

(UUID(), @coach_id, 'Lợi Ích Sức Khỏe Sau Khi Bỏ Thuốc Lá',
 '⏰ Sau 20 phút: Nhịp tim và huyết áp trở lại bình thường\n⏰ Sau 12 giờ: Nồng độ CO trong máu giảm về mức bình thường\n⏰ Sau 2-12 tuần: Tuần hoàn máu cải thiện, chức năng phổi tăng\n⏰ Sau 1-9 tháng: Ho và khó thở giảm\n⏰ Sau 1 năm: Nguy cơ bệnh tim mạch giảm 50%\n⏰ Sau 5 năm: Nguy cơ đột quỵ giảm về mức người không hút thuốc\n\nMỗi ngày không hút thuốc, cơ thể bạn đang tự chữa lành! 🌱',
 'MOTIVATION', NULL, 18, 0, true, NOW(), NOW()),

(UUID(), @admin_id, 'Hướng dẫn sử dụng tính năng Kế Hoạch Cai Thuốc',
 'Chào các bạn! Để tận dụng tốt nhất ứng dụng, hãy:\n\n1. Vào mục "Kế hoạch" để tạo kế hoạch cai thuốc cá nhân\n2. Cập nhật trạng thái hút thuốc hàng ngày\n3. Theo dõi tiến trình và huy hiệu của bạn\n4. Tham gia cộng đồng để nhận sự hỗ trợ\n5. Liên hệ coach nếu cần tư vấn chuyên sâu\n\nChúc các bạn thành công! 🎯',
 'ADVICE', NULL, 8, 0, false, NOW(), NOW()),

(UUID(), @coach_id, 'Câu Hỏi Thường Gặp Khi Bắt Đầu Cai Thuốc',
 'Q: Tôi nên cai thuốc đột ngột hay giảm dần?\nA: Cả hai cách đều hiệu quả. Tuy nhiên, nghiên cứu cho thấy cai đột ngột có tỷ lệ thành công cao hơn. Hãy chọn cách phù hợp với bạn.\n\nQ: Tôi hay buồn chán sau khi bỏ thuốc, phải làm sao?\nA: Đây là triệu chứng bình thường. Hãy thử tìm hoạt động mới như tập gym, đọc sách, hoặc học nấu ăn.\n\nQ: Bao lâu thì hết thèm thuốc?\nA: Cơn thèm mạnh nhất trong 2-3 tuần đầu, sau đó giảm dần. Sau 3 tháng, hầu hết người đã quen với cuộc sống không thuốc lá.',
 'QUESTION', NULL, 15, 0, true, NOW(), NOW()),

(UUID(), @admin_id, 'Mình đã cai thuốc được 1 tháng rồi!',
 'Hôm nay mình chính thức hoàn thành 30 ngày không hút thuốc! 🎉\n\nNhững thay đổi mình cảm nhận được:\n- Hơi thở dễ chịu hơn hẳn\n- Không còn ho vào buổi sáng\n- Tiết kiệm được gần 500,000 VNĐ\n- Ngủ ngon hơn\n- Da mặt sáng hơn\n\nCảm ơn cộng đồng đã luôn động viên mình. Nếu mình làm được, bạn cũng sẽ làm được! 💪🔥',
 'ACHIEVEMENT_SHARE', NULL, 25, 0, true, NOW(), NOW());
