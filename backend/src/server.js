import express from "express";
import taskRoute from './routes/tasksRouters.js';
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors"
// Load env from the src folder where the .env is located
dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();


// middlewares
app.use(express.json()); // để đọc được req.body từ const {title} - đây là 1 middleware, trạm express.json
{/*ngoài express.json thì có thể gắn thêm nhiêu middleware khác, một số loại middleware phổ biến có thể kể đến như là :
     -logger middleware : để in ra thông tin request mỗi lần có ai gọi API
     - auth middleware: để kiểm tra tokken đảm bảo chỉ user hợp lệ mới được đi tiếp
     - hoặc là 1 custom middleware nào đó để xử lý logic mà dự án của bạn cần
     --> NÓI DỄ HIỂU THÌ MIDDLEWARE GIỐNG NHƯ 1 TRẠM KIỂM SOÁT REQUEST ĐI QUA TỪNG TRẠM ĐƯỢC XỬ LÝ THÊM 1 LỚP CHO ĐẾN KHI CUÔI CÙNG TỚI ROUTER CHÍNH
 */}

app.use(cors({ origin: "http://localhost:5173" }))


app.use("/api/tasks", taskRoute);

// để đảm bảo khi connect với db xong thì server mới thực sự chạy ở cổng 5001
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server bắt đầu trên cổng ${PORT}`);
    });
});


