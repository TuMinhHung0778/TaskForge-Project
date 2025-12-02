import Task from "../models/Task.js";

// GET -> trả về danh sách việc cần làm
export const getAllTasks = async (request, response) => {
    try {
        // const tasks = await Task.find().sort({ createdAt: -1 });
        // const activeCount = await Task.countDocuments({ status: "active" }); // đếm số lượng nhiệm vụ có status = "active"
        // const deleteCount = await Task.countDocuments({ status: "delete" });

        // use aggregation pipline
        const result = await Task.aggregate([
            {
                $facet: {
                    tasks: [{ $sort: { createdAt: -1 } }],
                    activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
                    completeCount: [{ $match: { status: "complete" } }, { $count: "count" }],
                },
            },
        ]);

        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0; // kiểm tra xem item đầu tiên của mảng activeCount có phải undefined không? || nếu là mảng rổng thì giá trị default = 0
        const completeCount = result[0].completeCount[0]?.count || 0;

        response.status(200).json({ tasks, activeCount, completeCount });
    } catch (error) {
        console.error("Lỗi khi gọi getAllTasks", error);
        response.status(500).json({ message: "Lỗi hệ thống" });
    }
}

// POST
export const createTask = async (req, res) => {
    // res.status(201).json({ message: "Nhiem vu moi da duoc them vao thanh cong" });
    try {
        const { title } = req.body; // tức là mình đang lấy cái title mà client gửi lên từ req.body
        // nhưng mà để đọc được req.body thì cần phải qua server.js và thêm middleware là app.use(express.json())
        // trong lập trình web sẽ gặp 1 khái niệm rất quan trọng đó là middleware - middleware giống như 1 trạm kiểm soát mà mọi request đều phải đi qua trước khi tới router
        // ví dụ khi viết app.use(express.json()) - dòng này nghĩa là : ê server! giờ tất cả request đi qua phải ghé vô trạm kiểm soát app.use(express.json()) này trước, nhiệm vụ của nó là kiểm tra dữ liệu gửi lên từ client có phải là json không? Nếu có thì chyển từ dạng json -> object để 1 hồi nữa xử lí cho tiện.
        // nếu không có middleware này thì ở mỗi router bạn phải tự viết code để parse json thủ công và lặp đi lặp lại

        const task = new Task({ title });
        const newTask = await task.save(); // lện này sẽ lưu taks mới xuống database

        res.status(201).json(newTask);
    } catch (error) {
        console.error("Lỗi khi gọi createTask", error);
        response.status(500).json({ message: "Lỗi hệ thống" });
    }
}

// PUT
export const updateTask = async (req, res) => {
    try {
        const { title, status, completedAt } = req.body; // lấy những field có thể update từ schema
        // tạo biến updatedTask để lấy nhiệm vụ sau khi updated
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, // lấy id từ url
            {
                title,
                status,
                completedAt
            },
            { new: true } // sau khi updated xong trả về giá trị sau khi updated, nếu ko có dòng này sẽ trả về value trước khi updated
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Nhiệm vụ không tồn tại!" })
        }

        res.status(200).json(updatedTask)
    } catch (error) {
        console.log("Lỗi khi gọi updatedTask", error);
        res.status(500).json({ message: "Lỗi hệ thống!" })
    }
}

// DELETE
export const deleteTask = async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id);

        if (!deleteTask) {
            res.status(404).json({ message: "Nhiệm vụ không tồn tại!" })
        }

        res.status(200).json(deleteTask)
    } catch (error) {
        console.log("Lỗi khi gọi deleteTask", error);
        res.status(500).json({ message: "Lỗi hệ thống!" })
    }
}