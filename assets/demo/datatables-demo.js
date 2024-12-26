$(document).ready(function() {
  const apiUrl = 'https://car-management-1.onrender.com/car';

  // Hàm lấy dữ liệu từ API và điền vào bảng
  function loadTableData() {
      $.ajax({
          url: apiUrl,
          method: 'GET',
          success: function(data) {
              // Xóa dữ liệu cũ
              $('#datatablesSimple').DataTable().clear().draw();
              
              // Thêm dữ liệu mới
              data.forEach(item => {
                  $('#datatablesSimple').DataTable().row.add([
                      item.company,
                      item.name,
                      item.version,
                      item.engineType,
                      item.price || 'N/A',
                      '<button class="edit-btn">Sửa</button> <button class="delete-btn">Xóa</button>'
                  ]).draw(false);
              });

              // Thêm sự kiện click cho các nút sửa và xóa
              $('.edit-btn').on('click', function() {
                  const row = $(this).closest('tr');
                  const rowData = $('#datatablesSimple').DataTable().row(row).data();
                  editRow(rowData);
              });

              $('.delete-btn').on('click', function() { 
                const id = $(this).data('id'); 
                deleteRow(id); });
          },
          error: function(error) {
              console.error('Lỗi khi lấy dữ liệu từ API:', error);
          }
      });
  }

  // Hàm chỉnh sửa hàng
  function editRow(rowData) {
      alert('Chỉnh sửa hàng: ' + JSON.stringify(rowData));
      // Thêm mã để chỉnh sửa hàng ở đây
  }

  // Hàm xóa hàng
  function deleteRow(id) {
    if (confirm('Bạn có chắc chắn muốn xóa hàng này?')) { 
        $.ajax({ url: `http://localhost:8080/car/${id}`, 
        // // Đổi 'delete-url' thành URL cụ thể của bạn 
        method: 'DELETE', success: function() { 
            alert('Hàng đã được xóa thành công.'); 
            loadTableData(); 
        }, error: function(error) { 
            console.error('Lỗi khi xóa dữ liệu:', error); 
        } 
    }); 
    }
  }

  $('#addNewBtn').on('click', function() { 
    $.ajax({ url: 'http://localhost:8080/car/crawdata', 
    // // Đổi 'your-url' thành URL cụ thể của bạn 
    method: 'GET', success: function(response) { 
        alert('Dữ liệu lấy được: ' + JSON.stringify(response)); 
        // Thêm mã để xử lý dữ liệu nhận được từ API ở đây
        }, error: function(error) { 
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
