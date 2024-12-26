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
                      item.price || 'N/A'
                  ]).draw(false);
              });
          },
          error: function(error) {
              console.error('Lỗi khi lấy dữ liệu từ API:', error);
          }
      });
  }

  // Khởi tạo DataTable
  $('#datatablesSimple').DataTable({
      columnDefs: [
          { targets: -1, orderable: false }
      ]
  });

  // Load dữ liệu vào bảng
  loadTableData();
});
