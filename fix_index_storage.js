const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /function lookupOrderCode\(manualCode\) \{[\s\S]*?resultBox\.innerHTML = '<div[\s\S]*?\} else \{[\s\S]*?<\/div>';\n    \}\n  \}/;
const newLookup = unction lookupOrderCode(manualCode) {
    var code = manualCode || (document.getElementById('checkOrderInput') ? document.getElementById('checkOrderInput').value.trim().toUpperCase() : '');
    var resultBox = document.getElementById('lookupResult');
    if (!resultBox) return;
  
    if (!code) {
      toast('❌', 'Vui lòng nhập mã đơn cần kiểm tra!');
      return;
    }
    
    resultBox.style.display = 'block';
    resultBox.innerHTML = '<div style="text-align:center;padding:20px;color:#38bdf8;"><i class="fa-solid fa-spinner fa-spin"></i> Đang tìm kiếm đơn hàng...</div>';

    var _ut = localStorage.getItem('daiphu_user_token');
    var _hd = {};
    if (_ut) _hd['x-user-token'] = _ut;
    fetch('/api/orders?id=' + encodeURIComponent(code), { headers: _hd })
    .then(function(res) { return res.json(); })
    .then(function(data) {
        if (data && data.success && data.order) {
            displayOrderResult(data.order);
        } else {
            resultBox.innerHTML = '<div style="text-align:center;padding:15px;color:#f87171;"><i class="fa-solid fa-circle-exclamation"></i> Không tìm thấy đơn hàng: ' + escapeHTML(code) + '</div>';
        }
    })
    .catch(function(err) {
        resultBox.innerHTML = '<div style="text-align:center;padding:15px;color:#f87171;">Lỗi kết nối máy chủ!</div>';
    });

    function displayOrderResult(o) {
      var statusBadge = '';
      if (o.status === 'approved') {
        statusBadge = '<span style="background:rgba(34,197,94,0.2);color:#4ade80;border:1px solid rgba(34,197,94,0.4);padding:4px 10px;border-radius:6px;font-size:11.5px;font-weight:800;">✅ ĐÃ THANH TOÁN (HOÀN THÀNH)</span>';
      } else if (o.status === 'rejected') {
        statusBadge = '<span style="background:rgba(239,68,68,0.2);color:#f87171;border:1px solid rgba(239,68,68,0.4);padding:4px 10px;border-radius:6px;font-size:11.5px;font-weight:800;">❌ CHƯA KHỚP TIỀN</span>';
      } else {
        statusBadge = '<span style="background:rgba(56,189,248,0.2);color:#38bdf8;border:1px solid rgba(56,189,248,0.4);padding:4px 10px;border-radius:6px;font-size:11.5px;font-weight:800;">⏳ ĐANG CHỜ DUYỆT</span>';
      }
  
      var cleanId = escapeHTML(o.id || '');
      var codeDisplayHtml = '';
      if (o.status === 'approved') {
        codeDisplayHtml = '<strong style="color:#00f0ff;font-family:monospace;font-size:15px;">MÃ Đơn: ' + cleanId + '</strong>';
      } else {
        codeDisplayHtml = '<strong style="color:#fbbf24;font-size:13px;display:inline-flex;align-items:center;gap:6px;"><i class="fa-solid fa-lock"></i> MÃ Đơn: <i>(Cấp sau khi duyệt thanh toán)</i></strong>';
      }
  
      var cleanProd = escapeHTML(o.productName || o.product || o.planName || o.plan || 'Sản phẩm');
      var cleanPlan = escapeHTML(o.planName || o.plan || 'Gói');
      var cleanUser = escapeHTML(o.user || 'Khách');
      var cleanPhone = escapeHTML(o.phone || '');
      var cleanTime = escapeHTML(o.time || '');
      var cleanTxId = (o.status === 'approved' && o.txId) ? '<div style="color:#34d399;font-weight:700;">💳 Giao dịch MBBank: ' + escapeHTML(o.txId) + '</div>' : '';
  
      resultBox.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:8px;flex-wrap:wrap;gap:8px;">'
        + codeDisplayHtml
        + statusBadge
      + '</div>'
      + '<div style="display:flex;flex-direction:column;gap:6px;font-size:12.5px;color:#cbd5e1;">'
        + '<div>🎮 <b>Sản phẩm đã chọn:</b> <span style="color:#fff;font-weight:700;">' + cleanProd + '</span> (' + cleanPlan + ')</div>'
        + '<div>💵 <b>Số tiền:</b> <span style="color:#10b981;font-weight:800;">' + formatVND(o.price || o.amount || 0) + '</span></div>'
        + '<div>👤 <b>Tài khoản mua:</b> <span style="color:#fff;">' + cleanUser + '</span>' + (cleanPhone ? ' • SĐT/Zalo: <span style="color:#f59e0b;">' + cleanPhone + '</span>' : '') + '</div>'
        + '<div>🕒 <b>Thời gian:</b> ' + cleanTime + '</div>'
        + cleanTxId
        + (o.status !== 'approved' ? '<div style="margin-top:6px;padding:8px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:6px;color:#fbbf24;font-size:11.5px;"><i class="fa-solid fa-circle-info"></i> Nội dung chuyển khoản là <b>Tên tài khoản (Username)</b> của bạn. Sau khi MBBank xác nhận tiền vào, hệ thống sẽ tự động duyệt đơn và cấp mã đơn chính thức!</div>' : '')
      + '</div>';
    }
  };

html = html.replace(regex, newLookup);

// Also remove getOrders/saveOrder/deleteOrder/clearOrders logic referencing daiphu_orders entirely!
// Wait, loadOrdersHistory reads from getOrders()! Let's modify loadOrdersHistory to just fetch from API.
const histRegex = /function loadOrdersHistory\(\) \{[\s\S]*?historyWrap\.innerHTML = html;\n  \}/;
const newHist = unction loadOrdersHistory() {
    var historyWrap = document.getElementById('historyWrap');
    if (!historyWrap) return;
    
    var user = getCurrentUser();
    if (!user) {
      historyWrap.innerHTML = '<div style="text-align:center;color:var(--muted);padding:30px;">Bạn chưa đăng nhập.</div>';
      return;
    }
    
    historyWrap.innerHTML = '<div style="text-align:center;padding:20px;color:#38bdf8;"><i class="fa-solid fa-spinner fa-spin"></i> Đang tải lịch sử đơn...</div>';
    
    var _ut = localStorage.getItem('daiphu_user_token');
    var _hd = {};
    if (_ut) _hd['x-user-token'] = _ut;

    fetch('/api/orders?user=' + encodeURIComponent(user.username), { headers: _hd })
    .then(function(res) { return res.json(); })
    .then(function(data) {
        if(data && data.success && data.orders) {
            renderOrdersList(data.orders);
        } else {
            historyWrap.innerHTML = '<div style="text-align:center;color:var(--muted);padding:30px;">Chưa có đơn hàng nào được duyệt.</div>';
        }
    })
    .catch(function(err) {
        historyWrap.innerHTML = '<div style="text-align:center;color:#f87171;padding:30px;">Lỗi tải dữ liệu.</div>';
    });

    function renderOrdersList(list) {
      if (list.length === 0) {
        historyWrap.innerHTML = '<div style="text-align:center;color:var(--muted);padding:30px;">Chưa có đơn hàng nào được duyệt.</div>';
        return;
      }
  
      var html = '<div class="history-grid">';
      list.forEach(function(o) {
        var cleanId = escapeHTML(o.id || '');
        var cleanProd = escapeHTML(o.productName || o.product || o.planName || o.plan || 'Sản phẩm');
        var cleanPlan = escapeHTML(o.planName || o.plan || 'Gói');
        var cleanTime = escapeHTML(o.time || '');
        var cleanTxId = escapeHTML(o.txId || 'N/A');
  
        html += '<div class="history-card" onclick="openPaidModalFromHistory(\'' + cleanId + '\')">'
          + '<div class="history-card-top">'
            + '<span class="history-badge"><i class="fa-solid fa-check"></i> ĐÃ MUA</span>'
            + '<span class="history-id">MÃ Đơn: ' + cleanId + '</span>'
          + '</div>'
          + '<div class="history-card-title">' + cleanProd + '</div>'
          + '<div class="history-card-plan">' + cleanPlan + '</div>'
          + '<div class="history-card-info"><span><i class="fa-solid fa-clock"></i> ' + cleanTime + '</span><span><i class="fa-solid fa-money-check-dollar"></i> ' + formatVND(o.price || o.amount || 0) + '</span></div>'
          + '<div class="history-card-tx">Ref: ' + cleanTxId + '</div>'
        + '</div>';
      });
      html += '</div>';
      historyWrap.innerHTML = html;
    }
  };

html = html.replace(histRegex, newHist);

// Remove the old storage functions
html = html.replace(/function getOrders\(\) \{[\s\S]*?return \[\];\n\s*\}\n  \}/, "");
html = html.replace(/function saveOrder\(order\) \{[\s\S]*?\} catch\(e\) \{\}\n\s*\}/, "");
html = html.replace(/function deleteOrder\(id\) \{[\s\S]*?\} catch\(e\) \{\}\n\s*\}/, "");

fs.writeFileSync('index.html', html);
