// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

let myBarChart;
// Các mẫu câu khác nhau 
const monthlyAnalysisSentences = { 
  1: [ 
    "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này. Đây là một con số ấn tượng so với các công ty khác.", 
    "đạt mức <b>{percentage}%</b> tổng số bán hàng tháng này, tạo ra một dấu ấn đáng kể trong thị trường.",
    "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, vượt qua nhiều đối thủ cạnh tranh.", 
    "với <b>{percentage}%</b> tổng số bán hàng tháng này, thể hiện sự hiện diện mạnh mẽ trên thị trường.", 
    "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, một thành tích khá tốt trong ngành.", 
    "đạt <b>{percentage}%</b> tổng số bán hàng tháng này, khẳng định vị thế của mình trong thị trường.",
     "với <b>{percentage}%</b> tổng số bán hàng tháng này, chứng tỏ sức mạnh của hãng trong lĩnh vực ô tô.", 
     "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, một kết quả ổn định so với các công ty khác.", 
     "đạt mức <b>{percentage}%</b> tổng số bán hàng tháng này, thể hiện sự tăng trưởng vững chắc.", 
     "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, vẫn duy trì được thị phần ổn định." 
    ], 
     // Các mẫu câu cho các tháng khác (ví dụ: tháng 2, 3, ...) 
  2: [ 
    "chiếm <b>{percentage}%</b> tổng số bán hàng của tháng này, tạo ra một kỷ lục mới.", 
    "với doanh số chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, đây là một thành tích nổi bật.", 
    "đạt <b>{percentage}%</b> tổng số bán hàng tháng này, công ty này đã khẳng định vị thế của mình.", 
    "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, một con số rất ấn tượng.", 
    "với <b>{percentage}%</b> tổng số bán hàng tháng này, đây là một cột mốc đáng nhớ.", 
    "đạt mức <b>{percentage}%</b> tổng số bán hàng tháng này, công ty này đã vượt qua nhiều đối thủ.",
    "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, thể hiện sự phát triển mạnh mẽ.", 
    "với <b>{percentage}%</b> tổng số bán hàng tháng này, một kết quả rất khả quan.", 
    "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, giữ vững thị phần quan trọng.", 
    "với <b>{percentage}%</b> tổng số bán hàng tháng này, công ty này đã có một tháng rất thành công." 
  ], 
  // Thêm các mẫu câu cho các tháng tiếp theo... 
  3: [ "đạt <b>{percentage}%</b> tổng số bán hàng tháng này, một thành công nổi bật.", "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, tạo ra một dấu ấn quan trọng.", "với <b>{percentage}%</b> tổng số bán hàng tháng này, công ty này đã vượt qua các đối thủ.", "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, khẳng định vị trí của mình.", "đạt mức <b>{percentage}%</b> tổng số bán hàng tháng này, thể hiện sự phát triển bền vững.", "với <b>{percentage}%</b> tổng số bán hàng tháng này, công ty này đã đạt được một cột mốc mới.", "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, một kết quả ấn tượng.", "đạt <b>{percentage}%</b> tổng số bán hàng tháng này, chứng tỏ sức mạnh của mình.", "với <b>{percentage}%</b> tổng số bán hàng tháng này, công ty này đã ghi dấu ấn trên thị trường.", "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, đây là một kết quả rất khả quan." ],
  4: [ "với <b>{percentage}%</b> tổng số bán hàng tháng này, công ty này đã có một tháng bứt phá.", "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, thể hiện sự tăng trưởng mạnh mẽ.", "đạt <b>{percentage}%</b> tổng số bán hàng tháng này, một kết quả rất ấn tượng.", "với <b>{percentage}%</b> tổng số bán hàng tháng này, công ty này đã vượt qua nhiều đối thủ.", "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, tạo ra một cột mốc mới.", "đạt mức <b>{percentage}%</b> tổng số bán hàng tháng này, khẳng định vị thế của mình.", "với <b>{percentage}%</b> tổng số bán hàng tháng này, công ty này đã có một tháng rất thành công.", "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, đây là một kết quả rất khả quan.", "đạt <b>{percentage}%</b> tổng số bán hàng tháng này, thể hiện sự phát triển bền vững.", "với <b>{percentage}%</b> tổng số bán hàng tháng này, công ty này đã ghi dấu ấn quan trọng." ], 
  5: [ "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, tạo ra một kỷ lục mới.", "với doanh số chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, đây là một thành tích nổi bật.", "đạt <b>{percentage}%</b> tổng số bán hàng tháng này, công ty này đã khẳng định vị thế của mình.", "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, một con số rất ấn tượng.", "với <b>{percentage}%</b> tổng số bán hàng tháng này, đây là một cột mốc đáng nhớ.", "đạt mức <b>{percentage}%</b> tổng số bán hàng tháng này, công ty này đã vượt qua nhiều đối thủ.", "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, thể hiện sự phát triển mạnh mẽ.", "với <b>{percentage}%</b> tổng số bán hàng tháng này, một kết quả rất khả quan.", "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, giữ vững thị phần quan trọng.", "với <b>{percentage}%</b> tổng số bán hàng tháng này, công ty này đã có một tháng rất thành công." ], 
  6: [ "đạt <b>{percentage}%</b> tổng số bán hàng tháng này, một thành công nổi bật.", "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, tạo ra một dấu ấn quan trọng.", "với <b>{percentage}%</b> tổng số bán hàng tháng này, công ty này đã vượt qua các đối thủ.", "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, khẳng định vị trí của mình.", "đạt mức <b>{percentage}%</b> tổng số bán hàng tháng này, thể hiện sự phát triển bền vững.", "với <b>{percentage}%</b> tổng số bán hàng tháng này, công ty này đã đạt được một cột mốc mới.", "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, một kết quả ấn tượng.", "đạt <b>{percentage}%</b> tổng số bán hàng tháng này, chứng tỏ sức mạnh của mình.", "với <b>{percentage}%</b> tổng số bán hàng tháng này, công ty này đã ghi dấu ấn trên thị trường.", "chiếm <b>{percentage}%</b> tổng số bán hàng tháng này, đây là một kết quả rất khả quan." ],
  };
  // Hàm tính phần trăm và hiển thị chi tiết 
function calculateAndDisplayDetails(data, month) { 
  const top10Data = data.slice(0, 10);
  const totalSales = data.reduce((acc, item) => acc + item.totalsale, 0); 
  const detailsList = document.getElementById('detailsList'); 
  detailsList.innerHTML = ''; 
  // Xóa nội dung cũ 

  const analysisSentences = monthlyAnalysisSentences[12/month] || monthlyAnalysisSentences[1];
  top10Data.forEach((item, index) => { 
    const percentage = ((item.totalsale / totalSales) * 100).toFixed(2); 
    const listItem = document.createElement('li'); 
    const analysisSentence = analysisSentences[index % analysisSentences.length].replace('{percentage}', percentage); 
    listItem.innerHTML = `<b>${item.company}</b> bán được <b>${item.totalsale}</b> xe: ${analysisSentence}`; 
    detailsList.appendChild(listItem); }); 

    const highestSaleItem = top10Data.reduce((max, item) => max.totalsale > item.totalsale ? max : item); 
    const lowestSaleItem = top10Data.reduce((min, item) => min.totalsale < item.totalsale ? min : item); 
    const summaryItem = document.createElement('li'); 
    summaryItem.innerHTML = ` 
    <b>Nhìn chung:</b> Tổng số bán hàng tháng này là <b>${totalSales}</b>. 
    <br> <b>${highestSaleItem.company}</b> dẫn đầu với <b>${highestSaleItem.totalsale}</b>, 
    chiếm tỷ lệ <b>cao nhất</b>. <br> Ngược lại, <b>${lowestSaleItem.company}</b> 
    có doanh số <b>thấp nhất</b> là <b>${lowestSaleItem.totalsale}</b>. `; 
    detailsList.appendChild(summaryItem); 
}
// Hàm lấy dữ liệu từ API và vẽ biểu đồ
function drawBarChart(month) {
  // URL của API, thêm tham số tháng
  const apiUrl = `https://car-management-1.onrender.com/sale/topmonth?month=${month}`;

  // Gửi yêu cầu tới API và vẽ biểu đồ
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const top10Data = data.slice(0, 10);
      const labels = top10Data.map(item => item.company);
      const values = top10Data.map(item => item.totalsale);

      const ctx = document.getElementById("myBarChart").getContext("2d");

      // Xóa biểu đồ cũ nếu tồn tại
      if (myBarChart) {
        myBarChart.destroy();
      }

      // Vẽ biểu đồ cột mới
      myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: "Total Sales",
            backgroundColor: "rgba(2,117,216,1)",
            borderColor: "rgba(2,117,216,1)",
            data: values,
          }],
        },
        options: {
          scales: {
            xAxes: [{
              time: {
                unit: 'month'
              },
              gridLines: {
                display: false
              },
              ticks: {
                maxTicksLimit: 10
              }
            }],
            yAxes: [{
              ticks: {
                min: 0,
                max: Math.max(...values) + 5000,  // Điều chỉnh trục y để phù hợp với dữ liệu
                maxTicksLimit: 5
              },
              gridLines: {
                display: true
              }
            }],
          },
          legend: {
            display: false
          }
        }
      });
      // Tính phần trăm và hiển thị chi tiết 
      calculateAndDisplayDetails(data,month);
    })
    .catch(error => {
      console.error('Lỗi khi lấy dữ liệu từ API:', error);
    });
}
const currentMonth = new Date().getMonth() + 1;
drawBarChart(currentMonth);

// Lắng nghe sự kiện thay đổi của list box và cập nhật biểu đồ
document.getElementById('monthSelector').value = currentMonth;
document.getElementById('monthSelector').addEventListener('change', function() {
  const month = this.value;
  drawBarChart(month);
});


