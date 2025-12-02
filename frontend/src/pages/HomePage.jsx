import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";

const HomePage = () => {
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
      {/* Your Content Here */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Đầu Trang */}
          <Header />

          {/* Tạo nhiệm vụ */}
          <AddTask />

          {/*Thống kê bộ lọc */}
          <StatsAndFilters />

          {/* Danh sách nhiệm vụ */}
          <TaskList />

          {/* Phân trang và lọc theo Date */}
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <TaskListPagination />
            <DateTimeFilter />
          </div>

          {/* Chân trang */}
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
