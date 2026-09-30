const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newNovaX = `    {
      id: 'proxy-ios-novax',
      category: 'Proxy iOS',
      plat: 'Android & iOS',
      buyers: '200+ Người mua',
      name: 'NovaX (Android & iOS)',
      shortDesc: 'Aimdrag, Aim cổ, Aimbody, Aim Magic, ESP Ghim đầu nhẹ tâm.',
      fullDesc: 'NovaX - Công nghệ kéo tâm cao cấp nhất nay đã chính thức hỗ trợ Android & iOS.\\nTính năng: Aimdrag, Aim cổ, Aimbody, Aim Magic (đạn ma thuật), ESP Aimcheck định vị ghim đầu, kéo tâm cực nhẹ và mượt mà.',
      priceMin: 20000,
      priceMax: 200000,
      image: 'assets/uploads/products/novax.jpg',
      images: [
        { src: 'assets/uploads/products/novax.jpg', label: 'NovaX', title: 'NovaX - Kéo Tâm Chuẩn Android & iOS' }
      ],
      plans: [
        {
          name: 'Key 1 Ngày',
          price: 20000,
          action: 'Aimdrag, Aim cổ, Aimbody, Aim Magic (đạn ma thuật), ESP Aimcheck R8.',
          fix: 'Khắc phục tâm bị nặng, vuốt khó lên đầu trên điện thoại.',
          pros: 'Kéo tâm cực nhẹ, mượt mà chuẩn như tuyển thủ.',
          note: 'Hỗ trợ mọi máy Android và iOS.'
        },
        {
          name: 'Key 7 Ngày',
          price: 50000,
          badge: 'Tiết kiệm',
          action: 'Trải nghiệm 7 ngày công nghệ kéo tâm đỉnh cao nhất.',
          fix: 'Khắc phục trễ lệnh cảm ứng, đạn ôm đầu tự nhiên không lộ liễu.',
          pros: 'Tiết kiệm hơn so với mua lẻ theo từng ngày.',
          note: 'Hỗ trợ Android và iOS.'
        },
        {
          name: 'Key 30 Ngày',
          price: 100000,
          badge: 'Phổ biến',
          action: 'Gói tháng trọn vẹn, cấu hình riêng biệt tốc độ cao không lag giật.',
          fix: 'Chống giật lag ping, giữ tâm ổn định suốt cả mùa rank.',
          pros: 'Lựa chọn số 1 của cộng đồng game thủ.',
          note: 'Hỗ trợ Android và iOS.'
        },
        {
          name: 'Key Vĩnh Viễn',
          price: 200000,
          action: 'Sử dụng trọn đời phiên bản NovaX, không lo hết hạn key.',
          fix: 'Cập nhật trọn đời, bảo vệ tài khoản an toàn 100%.',
          pros: 'Gói trọn đời kinh tế nhất, dùng thoải mái không giới hạn thời gian.',
          note: 'Hỗ trợ Android và iOS, bảo hành trọn đời.'
        }
      ]
    }`;

// Replace the block exactly by using regex that stops at the next product `id: 'proxy-ios-delta'`
html = html.replace(/\{\s*id:\s*'proxy-ios-novax'[\s\S]*?(?=\s*\{\s*id:\s*'proxy-ios-delta')/, newNovaX + ",\n");

// Rename category filter from 'Proxy iOS' to 'Proxy & NovaX' in the button text
html = html.replace(/>Proxy iOS<\/button>/, '>Proxy & NovaX</button>');

fs.writeFileSync('index.html', html, 'utf8');

console.log('Done replacement');
