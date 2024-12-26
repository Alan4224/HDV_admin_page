// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
// Các mẫu câu phân tích
const analysisSentences = [ 
  "Đây là phân khúc có doanh số <b>cao nhất</b> với <b>{totalSale}</b> xe bán ra, chiếm <b>{percentage}%</b> tổng xe bán được. Điều này cho thấy xe trong tầm giá {priceRange} rất phổ biến và được nhiều người tiêu dùng lựa chọn.", 
  "Phân khúc này có doanh số <b>{totalSale}</b> xe, chiếm <b>{percentage}%</b> tổng xe bán được, cho thấy sự phổ biến và ưa chuộng của các mẫu xe giá rẻ và trung bình.", 
  "Phân khúc này có doanh số khá lớn với <b>{totalSale}</b> xe bán ra, chiếm <b>{percentage}%</b> tổng xe bán được, thể hiện sự ưa chuộng của người tiêu dùng đối với các mẫu xe trong tầm giá {priceRange}.", 
  "Phân khúc này có doanh số <b>{totalSale}</b> xe, chiếm <b>{percentage}%</b> tổng xe bán được, cho thấy một lượng người tiêu dùng tương đối nhỏ nhưng sẵn lòng chi trả cao cho xe hơi sang trọng.", 
  "Có <b>{totalSale}</b> xe bán ra trong phân khúc này, chiếm <b>{percentage}%</b> tổng xe bán được, nhưng vẫn đáng kể đối với xe hạng sang.", 
  "Có <b>{totalSale}</b> xe bán ra trong phân khúc này, chiếm <b>{percentage}%</b> tổng xe bán được, điều này cho thấy sự lựa chọn hạn chế của người tiêu dùng đối với các mẫu xe giá rẻ.", 
  "Mức giá này có doanh số thấp nhất với chỉ <b>{totalSale}</b> xe bán ra, chiếm <b>{percentage}%</b> tổng xe bán được. Điều này cho thấy xe trong phân khúc giá {priceRange} không phổ biến trên thị trường."
];
// Hàm tính phần trăm và hiển thị chi tiết
function calculateAndDisplayPriceDetails(data, hiddenIndices) { 
  const totalSales = data.reduce((acc, item) => acc + item.totalSale, 0); 
  const fuelDetailsList = document.getElementById('priceDetailsList'); 
  fuelDetailsList.innerHTML = ''; 
  // Xóa nội dung cũ 
  data.forEach((item, index) => { 
    if (!hiddenIndices.includes(index)) {
      const percentage = ((item.totalSale / totalSales) * 100).toFixed(2); 
      const listItem = document.createElement('li'); 
      const analysisSentence = analysisSentences[index % analysisSentences.length]
      .replace('{percentage}', percentage)
      .replace('{priceRange}', item.priceRange.toLowerCase()) 
      .replace('{totalSale}', item.totalSale);
      listItem.innerHTML = `
      <b>${item.priceRange}</b>: ${analysisSentence}`; 
      fuelDetailsList.appendChild(listItem); 
    }
  }); 
    const visibleData = data.filter((item, index) => !hiddenIndices.includes(index));
    const highestSaleItem = visibleData.reduce((max, item) => max.totalSale > item.totalSale ? max : item); 
    const lowestSaleItem = visibleData.reduce((min, item) => min.totalSale < item.totalSale ? min : item); 
    const summaryItem = document.createElement('li'); 
    summaryItem.innerHTML = ` 
    <b>Nhìn chung:</b> Tổng số xe bán được là <b>${totalSales}</b>. <br> 
    <b>${highestSaleItem.priceRange}</b> dẫn đầu với <b>${highestSaleItem.totalSale}</b> xe, 
    chiếm tỷ lệ <b>cao nhất</b>. <br> 
    Ngược lại, <b>${lowestSaleItem.priceRange}</b> có doanh số <b>thấp nhất</b> là <b>${lowestSaleItem.totalSale}</b> xe. `; 
    fuelDetailsList.appendChild(summaryItem); 
}
// URL của API
const apiUrl = 'https://car-management-1.onrender.com/sale/pricerange';

// Gửi yêu cầu tới API và vẽ biểu đồ
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const labels = data.map(item => item.priceRange);
    const values = data.map(item => item.totalSale);

    // Vẽ biểu đồ tròn
    const ctx2 = document.getElementById("priceRangePieChart").getContext("2d");
    const priceRangePieChart = new Chart(ctx2, {
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
            '#17a2b8',
            '#6f42c1',
            '#e83e8c'
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
            calculateAndDisplayPriceDetails(data, hiddenIndices); 
            chart.update(); 
          }
        } 
      }
    });
    calculateAndDisplayPriceDetails(data,[]);
  })
  .catch(error => {
    console.error('Lỗi khi lấy dữ liệu từ API:', error);
  });

