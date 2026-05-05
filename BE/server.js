const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Cho phép Frontend gọi API
app.use(express.json()); // Đọc data dạng JSON từ Frontend gửi lên

// ==========================================
// CÁC API CỦA ỨNG DỤNG
// ==========================================

// API Mẫu 1: Kiểm tra server sống hay chết
app.get('/', (req, res) => {
  res.send('Backend Ký túc xá đang chạy!');
});

// API Mẫu 2: Lấy danh sách toàn bộ PHÒNG
app.get('/api/phong', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Phong');
    // Trả dữ liệu về cho Frontend dạng JSON
    res.json(result.rows); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Lỗi Server');
  }
});

// ==========================================
// KHỞI ĐỘNG SERVER
// ==========================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});