import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const HomePage = () => {
  // save danh sách nhiệm vụ từ backend về - Buffer = dữ liệu thô, cần chờ xử lý.
  const [taskBuffer, setTaskBuffer] = useState([]);

  const [activeTaskCount, setActiveTaskCount] = useState(0); // state để lưu giá trị activeCount
  const [completeTaskCount, setCompleteTaskCount] = useState(0); // state để lưu giá trị completeCount

  const [filter, setFilter] = useState("all"); // state để lưu filter hiện tại

  useEffect(() => {
    fetchTasks();
  }, []);

  // logic
  const fetchTasks = async () => {
    try {
      // const res = await fetch("http://localhost:5001/api/tasks"); // Thay vì dùng fetch() để call apo thì cài thư viên axios để call api dễ dàng hơn, có cú pháp ngắn gọn, tự động parse json và hỗ trợ nhiều tính năng khác như là setHeader...
      // const data = await res.json();
      const res = await axios.get("http://localhost:5001/api/tasks");
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất tasks:", error);
      toast.error("Lỗi xảy ra khi truy xuất tasks");
    }
  };

  // biến lưu danh sách nhiệm vụ đã lọc
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active"; // chỉ giữa lại nhưng task có trạng thái 'active'
      case "completed":
        return task.status === "complete"; // chỉ giữa lại nhưng task có trạng thái 'complete'
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* Teal Corner Cool Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle 600px at 0% 200px, #a7f3d0, transparent),
        radial-gradient(circle 600px at 100% 200px, #a7f3d0, transparent)
      `,
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Đầu Trang */}
          <Header />

          {/* Tạo nhiệm vụ */}
          <AddTask />

          {/*Thống kê bộ lọc */}
          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />

          {/* Danh sách nhiệm vụ */}
          <TaskList filteredTasks={filteredTasks} filter={filter} />

          {/* Phân trang và lọc theo Date */}
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <TaskListPagination />
            <DateTimeFilter />
          </div>

          {/* Chân trang */}
          <Footer
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
