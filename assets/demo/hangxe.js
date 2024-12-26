$(document).ready(function() {
    const apiUrl = 'https://car-management-1.onrender.com/hang-xe/getAll';

    // Hàm lấy dữ liệu từ API và điền vào bảng
    function loadTableData() {
        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function(data) {
                console.log('Dữ liệu nhận được từ API:', data); // Log dữ liệu API

                // Xóa dữ liệu cũ
                $('#datatablesSimple').DataTable().clear().draw();

                // Thêm dữ liệu mới
                data.forEach(item => {
                    $('#datatablesSimple').DataTable().row.add([
                        `<img src="${item.img}" alt="${item.name}" width="100">`,
                        item.name,
                        item.description,
                        item.count,
                        `<button class="edit-btn" data-id="${item.id}">Sửa</button> <button class="delete-btn" data-id="${item.id}">Xóa</button>`
                    ]).draw(false);
                });

                // Gán sự kiện click cho các nút sửa và xóa bằng delegation
                $('#datatablesSimple').off('click', '.edit-btn').on('click', '.edit-btn', function() {
                    const id = $(this).data('id');
                    editRow(id);
                });

                $('#datatablesSimple').off('click', '.delete-btn').on('click', '.delete-btn', function() {
                    const id = $(this).data('id');
                    deleteRow(id);
                });
            },
            error: function(error) {
                console.error('Lỗi khi lấy dữ liệu từ API:', error);
            }
        });
    }

    // Hàm chỉnh sửa hàng
    function editRow(id) {
        alert('Chỉnh sửa hàng: ' + id);
        // Thêm mã để chỉnh sửa hàng ở đây
    }

    // Hàm xóa hàng
    function deleteRow(id) {
        if (confirm('Bạn có chắc chắn muốn xóa hàng này?')) {
            $.ajax({
                url: `https://car-management-1.onrender.com/hang-xe/${id}`, // Đổi 'delete-url' thành URL cụ thể của bạn
                method: 'DELETE',
                success: function() {
                    alert('Hàng đã được xóa thành công.');
                    loadTableData();
                },
                error: function(error) {
                    console.error('Lỗi khi xóa dữ liệu:', error);
                }
            });
        } else {
            console.log('Hủy xóa hàng'); // Log khi người dùng hủy
        }
    }

    // Bắt sự kiện click cho nút Thêm
    $('#addNewBtn').on('click', function() {
        $.ajax({
            url: 'https://car-management-1.onrender.com/hang-xe/craw', // Đổi 'your-url' thành URL cụ thể của bạn
            method: 'GET',
            success: function(response) {
                alert('Dữ liệu lấy được: ' + JSON.stringify(response));
                // Thêm mã để xử lý dữ liệu nhận được từ API ở đây
            },
            error: function(error) {
                console.error('Lỗi khi lấy dữ liệu từ API:', error);
            }
        });
    });

    // Khởi tạo DataTable
    $('#datatablesSimple').DataTable({
        columnDefs: [
            { targets: -1, orderable: false }
        ]
    });

    // Load dữ liệu vào bảng
    loadTableData();
});
