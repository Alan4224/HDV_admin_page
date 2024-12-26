// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
// Các mẫu câu phân tích
const analysisSentences = [ 
  "chiếm tỷ lệ cao nhất với <b>{percentage}%</b> tổng số xe bán ra. Điều này cho thấy {fuelType} vẫn là loại nhiên liệu phổ biến nhất trên thị trường.", 
  "chiếm một phần nhỏ hơn, với <b>{percentage}%</b> tổng số xe được bán ra. {fuelType} vẫn giữ được thị phần nhất định trong ngành.", 
  "mặc dù có sự tăng trưởng nhưng vẫn chiếm tỷ lệ nhỏ với <b>{percentage}%</b> tổng số xe bán ra. Điều này cho thấy nhu cầu về xe {fuelType} vẫn đang phát triển.", 
  "đóng góp một phần tương đối nhỏ với <b>{percentage}%</b> tổng số xe bán ra, cho thấy sự kết hợp giữa xăng và điện cũng đang dần được ưa chuộng.",
  "có doanh số thấp nhất với <b>{percentage}%</b> tổng số xe bán ra. Đây là một con số khá nhỏ so với các loại nhiên liệu khác."
];
// Hàm tính phần trăm và hiển thị chi tiết
function calculateAndDisplayFuelDetails(data, hiddenIndices) { 
  const totalSales = data.reduce((acc, item) => acc + item.totalSale, 0); 
  const fuelDetailsList = document.getElementById('fuelDetailsList'); 
  fuelDetailsList.innerHTML = ''; 
  // Xóa nội dung cũ 
  data.forEach((item, index) => { 
    if (!hiddenIndices.includes(index)) {
      const percentage = ((item.totalSale / totalSales) * 100).toFixed(2); 
      const listItem = document.createElement('li'); 
      const analysisSentence = analysisSentences[index % analysisSentences.length]
      .replace('{percentage}', percentage)
      .replace('{fuelType}',item.fuelType.toLowerCase()); 
      listItem.innerHTML = `
      <b>${item.fuelType}</b>: bán được <b>${item.totalSale}</b> xe, ${analysisSentence}`; 
      fuelDetailsList.appendChild(listItem); 
    }
  }); 
    const visibleData = data.filter((item, index) => !hiddenIndices.includes(index));
    const highestSaleItem = visibleData.reduce((max, item) => max.totalSale > item.totalSale ? max : item); 
    const lowestSaleItem = visibleData.reduce((min, item) => min.totalSale < item.totalSale ? min : item); 
    const summaryItem = document.createElement('li'); 
    summaryItem.innerHTML = ` 
    <b>Nhìn chung:</b> Tổng số xe bán được là ${totalSales}. <br> 
    <b>${highestSaleItem.fuelType}</b> dẫn đầu với <b>${highestSaleItem.totalSale}</b> xe, 
    chiếm tỷ lệ <b>cao nhất</b>. <br> 
    Ngược lại, <b>${lowestSaleItem.fuelType}</b> có doanh số <b>thấp nhất</b> là <b>${lowestSaleItem.totalSale}</b> xe. `; 
    fuelDetailsList.appendChild(summaryItem); 
}
// URL của API
const apiUrl = 'https://car-management-1.onrender.com/sale/salefuel';

// Gửi yêu cầu tới API và vẽ biểu đồ
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const labels = data.map(item => item.fuelType);
    const values = data.map(item => item.totalSale);

    // Vẽ biểu đồ tròn
    const ctx1 = document.getElementById("fuelTypePieChart").getContext("2d");
    const fuelTypePieChart = new Chart(ctx1, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: [
            '#007bff',
            '#dc3545',
            '#ffc107',
            '#28a745',
            '#17a2b8'
          ],
        }],
      },
      options: { 
        responsive: true, 
        legend: { 
          onClick: function(e, legendItem) { 
            const index = legendItem.index; 
            const chart = this.chart; 
            const hiddenIndices = chart.getDatasetMeta(0).data 
            .map((d, i) => d.hidden ? i : null) 
            .filter(d => d !== null); 
            // Toggle visibility 
            const meta = chart.getDatasetMeta(0); 
            meta.data[index].hidden = !meta.data[index].hidden; 
            // Thêm hoặc xóa chỉ mục vào hoặc khỏi hiddenIndices 
            if (hiddenIndices.includes(index)) { 
              hiddenIndices.splice(hiddenIndices.indexOf(index), 1); 
            } else { 
              hiddenIndices.push(index); 
            }
            // Cập nhật danh sách chi tiết 
            calculateAndDisplayFuelDetails(data, hiddenIndices); 
            chart.update(); 
          }
        } 
      }
    });
    // Tính phần trăm và hiển thị chi tiết 
    calculateAndDisplayFuelDetails(data,[]);
  })
  .catch(error => {
    console.error('Lỗi khi lấy dữ liệu từ API:', error);
  });
