# 🚭 QuitSmoking - Ứng Dụng Hỗ Trợ Cai Thuốc Lá

Ứng dụng web hỗ trợ người dùng cai thuốc lá với các tính năng theo dõi tiến trình, tư vấn AI, cộng đồng hỗ trợ và quản lý kế hoạch cai thuốc.

---

## 📋 Mục Lục

- [Tính Năng Chính](#-tính-năng-chính)
- [Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)
- [Cấu Trúc Project](#-cấu-trúc-project)
- [Yêu Cầu Hệ Thống](#-yêu-cầu-hệ-thống)
- [Cài Đặt & Chạy](#-cài-đặt--chạy)
- [Cấu Hình Biến Môi Trường](#-cấu-hình-biến-môi-trường)
- [Seed Data](#-seed-data)
- [Tài Khoản Demo](#-tài-khoản-demo)
- [API Endpoints](#-api-endpoints)
- [Deploy](#-deploy)

---

## ✨ Tính Năng Chính

### 👤 Quản Lý Người Dùng
- Đăng ký / Đăng nhập bằng email & mật khẩu
- Đăng nhập bằng **Google OAuth 2.0**
- Quản lý hồ sơ cá nhân, avatar
- Hệ thống phân quyền: `GUEST`, `MEMBER`, `COACH`, `ADMIN`

### 📊 Theo Dõi Tiến Trình
- Ghi nhận tình trạng hút thuốc hàng ngày
- Dashboard trực quan với biểu đồ (Chart.js)
- Theo dõi số ngày không hút thuốc, tiền tiết kiệm, số điếu thuốc tránh được
- Chia sẻ dashboard tiến trình

### 📋 Kế Hoạch Cai Thuốc
- Tạo kế hoạch cai thuốc cá nhân hóa
- Theo dõi tiến bộ từng ngày
- Nhận thông báo nhắc nhở

### 🏆 Thành Tích & Huy Hiệu
- Hệ thống huy hiệu đa dạng (Bronze, Silver, Gold, Platinum)
- Tiêu chí: số ngày smoke-free, tiền tiết kiệm, số điếu tránh được
- Chia sẻ thành tích lên cộng đồng

### 💬 Cộng Đồng
- Đăng bài viết (Chia sẻ thành tích, Động lực, Câu hỏi, Lời khuyên)
- Bình luận, tương tác
- Bài viết nổi bật (featured posts)

### 🤖 AI Chatbox
- Tư vấn cai thuốc lá bằng AI
- Hỗ trợ trả lời câu hỏi về sức khỏe và cai thuốc
- Giao diện chat thời gian thực

### 💎 Gói Thành Viên (Membership)
- Gói Trải Nghiệm miễn phí (30 ngày)
- Gói 30 / 60 / 90 ngày có phí
- Nâng cấp và quản lý gói thành viên

### 👨‍⚕️ Tư Vấn Coach
- Hệ thống chat 1-1 với Coach qua WebSocket
- Mã hóa tin nhắn end-to-end
- Coach quản lý và tư vấn cho nhiều người dùng

### 📧 Email & Thông Báo
- Gửi OTP qua email (quên mật khẩu)
- Thông báo nâng cấp gói thành viên
- Hệ thống notification trong app

### ⚙️ Quản Trị (Admin)
- Quản lý người dùng
- Xem feedback từ người dùng
- Dashboard tổng quan hệ thống

---

## 🛠 Công Nghệ Sử Dụng

### Backend
| Công nghệ | Phiên bản |
|---|---|
| Java | 21 |
| Spring Boot | 3.5.0 |
| Spring Security | 6.x |
| Spring Data JPA | 3.x |
| Hibernate ORM | 6.6.15 |
| MySQL Connector | 8.3.0 |
| JWT (jjwt) | 0.11.5 |
| Lombok | 1.18.30 |
| Google OAuth | 2.4.0 |
| Google Vertex AI | 1.24.0 |
| WebSocket (STOMP) | Spring Boot Starter |
| Spring Mail | Spring Boot Starter |

### Frontend
| Công nghệ | Phiên bản |
|---|---|
| React | 19.1.0 |
| Vite | 6.3.5 |
| Tailwind CSS | 4.1.8 |
| React Router DOM | 6.21.0 |
| Axios | 1.9.0 |
| Chart.js + react-chartjs-2 | 4.5.0 / 5.3.0 |
| Framer Motion | 12.23.0 |
| SockJS + STOMP.js | 1.6.1 / 7.1.1 |
| React Markdown | 10.1.0 |
| Google OAuth (React) | 0.12.2 |
| Lucide React Icons | 0.525.0 |
| Font Awesome | 6.7.2 |

### Database & Hosting
| Dịch vụ | Chi tiết |
|---|---|
| Database | MySQL 8.0 (Aiven Cloud) |
| Backend Hosting | Render |
| Frontend Hosting | Render |

---

## 📁 Cấu Trúc Project

```
project_java_deploy/
├── QuitSmoking_BE/                 # Backend (Spring Boot)
│   └── quitsmoking/
│       └── src/main/java/com/quitsmoking/
│           ├── config/             # Security, JWT, WebSocket, CORS config
│           ├── controllers/        # 19 REST API controllers
│           ├── dto/                # Request/Response DTOs
│           ├── exceptions/         # Custom exceptions
│           ├── model/              # 29 JPA entities
│           ├── reponsitories/      # 17 JPA repositories
│           ├── scheduling/         # Scheduled tasks
│           └── services/           # 26 business services
│
├── QuitSmoking_FE/                 # Frontend (React + Vite)
│   └── src/
│       ├── auth/                   # Login, Register, OAuth callback
│       ├── components/
│       │   ├── AiChatBox/          # AI Chatbox (Gemini)
│       │   ├── achievements/       # Huy hiệu & thành tích
│       │   ├── admin/              # Admin dashboard
│       │   ├── coach/              # Coach management
│       │   ├── community/          # Cộng đồng, bài viết, bình luận
│       │   ├── dashboard/          # Dashboard tiến trình
│       │   ├── feedback/           # Đánh giá & phản hồi
│       │   ├── membership/         # Gói thành viên
│       │   ├── plan/               # Kế hoạch cai thuốc
│       │   ├── profile/            # Hồ sơ cá nhân
│       │   ├── progress/           # Tiến trình cai thuốc
│       │   └── settings/           # Cài đặt
│       ├── config/                 # API config
│       ├── context/                # React context
│       ├── hooks/                  # Custom hooks
│       └── services/               # API services, WebSocket
│
└── QuitSmoking_DB-scripts/         # SQL seed data scripts
```

---

## 💻 Yêu Cầu Hệ Thống

- **Java** >= 21
- **Maven** >= 3.8
- **Node.js** >= 18
- **npm** >= 9
- **MySQL** >= 8.0

---

## 🚀 Cài Đặt & Chạy

### 1. Clone Repository

```bash
git clone https://github.com/BinhLN1105/demoquitsmoking.git
cd demoquitsmoking
```

### 2. Cấu Hình Backend

```bash
cd QuitSmoking_BE/quitsmoking/src/main/resources
```

Tạo file `.env` (xem mục [Cấu Hình Biến Môi Trường](#-cấu-hình-biến-môi-trường))

### 3. Chạy Backend

```bash
cd QuitSmoking_BE/quitsmoking
mvn spring-boot:run
```

Backend sẽ chạy tại: `http://localhost:10000`

### 4. Cấu Hình Frontend

```bash
cd QuitSmoking_FE
```

Tạo file `.env` hoặc `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:10000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 5. Chạy Frontend

```bash
cd QuitSmoking_FE
npm install
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

---

## 🔐 Cấu Hình Biến Môi Trường

### Backend (`QuitSmoking_BE/quitsmoking/src/main/resources/.env`)

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_model

# Database (MySQL)
DB_URL=jdbc:mysql://your_host:port/quitsmoking
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password

# JWT
JWT_SECRET=yourVeryLongAndSecureSecretKeyHere
JWT_EXPIRATION=86400000

# Email (Gmail SMTP)
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password

# Encryption
ENCRYPTION_SECRET=YourEncryptionSecretKey

# Frontend URL (cho CORS)
FRONTEND_URL=http://localhost:5173
```

### Frontend (`QuitSmoking_FE/.env`)

```env
VITE_API_BASE_URL=http://localhost:10000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 🗃 Seed Data

Chạy file SQL trong thư mục `QuitSmoking_DB-scripts/` để khởi tạo dữ liệu mẫu:

```bash
mysql -u your_username -p quitsmoking < QuitSmoking_DB-scripts/seed_membership_plans.sql
```

Dữ liệu bao gồm:
- **4 Gói Membership**: Trải Nghiệm (miễn phí), 30 ngày, 60 ngày, 90 ngày
- **10 Achievements**: Huy hiệu theo ngày smoke-free, tiền tiết kiệm, số điếu tránh
- **6 Community Posts**: Bài viết mẫu từ admin & coach

> **Lưu ý:** Tài khoản Admin và Coach được tự động tạo khi backend khởi động lần đầu (bởi `DataInitializer.java`).

---

## 🔑 Tài Khoản Demo

| Vai trò | Username | Password |
|---------|----------|----------|
| Admin | `admin` | `123123123` |
| Coach | `coach` | `123123123` |

> Các tài khoản này được tự động tạo khi backend khởi động nếu chưa tồn tại.

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/auth/register` | Đăng ký tài khoản |
| POST | `/api/auth/login` | Đăng nhập |
| POST | `/api/auth/google` | Đăng nhập Google OAuth |
| POST | `/api/auth/forgot-password` | Quên mật khẩu (gửi OTP) |
| POST | `/api/auth/reset-password` | Đặt lại mật khẩu |

### User
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/user/profile` | Lấy profile người dùng |
| PUT | `/api/user/profile` | Cập nhật profile |

### Quit Plan
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/quit-plans` | Lấy kế hoạch cai thuốc |
| POST | `/api/quit-plans` | Tạo kế hoạch mới |

### Smoking Status
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/smoking-status/user/{id}` | Lấy tình trạng hút thuốc |
| POST | `/api/smoking-status` | Ghi nhận tình trạng |

### Community
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/community/posts` | Lấy danh sách bài viết |
| POST | `/api/community/posts` | Tạo bài viết mới |
| DELETE | `/api/community/posts/{id}` | Xóa bài viết |
| GET | `/api/community/comments/post/{id}` | Lấy bình luận |
| POST | `/api/community/comments` | Tạo bình luận |

### Membership
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/membership/free-trial` | Đăng ký gói miễn phí |
| GET | `/api/membership/current` | Lấy gói hiện tại |

### AI Chat
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/ai/chat` | Gửi tin nhắn cho AI |

### Feedback
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/feedback/my-feedback` | Lấy feedback của user |
| POST | `/api/feedback` | Gửi feedback |

### WebSocket
| Endpoint | Mô tả |
|----------|-------|
| `/ws` | WebSocket endpoint (SockJS) |
| `/topic/messages` | Nhận tin nhắn chat |
| `/topic/notifications` | Nhận thông báo |
| `/topic/user-status` | Trạng thái online/offline |

---

## 🌐 Deploy

### Backend (Render)
1. Tạo Web Service trên [Render](https://render.com)
2. Chọn Docker hoặc Native Environment
3. Build command: `cd QuitSmoking_BE/quitsmoking && mvn clean package -DskipTests`
4. Start command: `java -jar QuitSmoking_BE/quitsmoking/target/quit-smoking-0.0.1-SNAPSHOT.jar`
5. Cấu hình Environment Variables tương ứng

### Frontend (Render)
1. Tạo Static Site trên [Render](https://render.com)
2. Build command: `cd QuitSmoking_FE && npm install && npm run build`
3. Publish directory: `QuitSmoking_FE/dist`
4. Cấu hình Environment Variables:
   - `VITE_API_BASE_URL` = URL backend trên Render
   - `VITE_GOOGLE_CLIENT_ID` = Google Client ID

### Database (MySQL)

---

## 📄 License

Project này được phát triển cho mục đích học tập và nghiên cứu.

---

## 👥 Tác Giả

- **BinhLN1105** - [GitHub](https://github.com/BinhLN1105)
- **My Team** 
