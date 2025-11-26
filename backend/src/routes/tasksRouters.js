import express from "express";
import { createTask, deleteTask, getAllTasks, updateTask } from "../controllers/tasksControllers.js";

const router = express.Router();

// GET : Lấy dữ liệu(Read) -> dùng khi client muốn đọc thông tin từ server
router.get("/", getAllTasks)

// POST : Tạo dữ liệu mới(Create) -> dùng khi client gửi dữ liệu để thêm vào server
router.post("/", createTask)

// PUT : Cập nhật dữ liệu(Update) -> dùng khi muốn thay đổi toàn bộ thông tin của một resource(đối tượng mà api quản lý(có thể là user, product, order, task…))
router.put("/:id", updateTask)

// DELETE : Xóa dữ liệu(Delete) -> dùng khi muốn xóa một resource khỏi server 
router.delete("/:id", deleteTask)

{/*
    ==> bộ tứ endpoint ở phía trên được gọi là CRUD endpoint:
    Create : POST
    Read : GET
    Update : PUT/PATCH
    Delete : DELETE
*/}

export default router;