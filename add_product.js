const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const newProduct = `    {
      id: 'forget-lix',
      category: 'Regedit & Panel',
      plat: 'iOS',
      buyers: '500+ Người mua',
      name: 'Forget Lix 3.5 (iOS)',
      shortDesc: 'Tối ưu trải nghiệm, bứt phá hiệu suất. Fix rung, fix lố, tăng độ nhạy, giảm delay.',
      fullDesc: 'Forget Lix 3.5 - Siêu phẩm hỗ trợ tối ưu cho anh em iOS.\\nKhông cần phần mềm can thiệp.\\nTính năng: Fix rung ổn định aim, fix lố tăng độ nhạy, tăng FPS mượt hơn, giảm delay phản hồi nhanh.',
      priceMin: 150000,
      priceMax: 150000,
      image: 'assets/uploads/products/forget-lix.jpg',
      images: [
        { src: 'assets/uploads/products/forget-lix.jpg', label: 'Forget Lix', title: 'Forget Lix 3.5 - Siêu Phẩm Tối Ưu iOS' }
      ],
      plans: [
        {
          name: 'Forget Lix 3.5 (Giảm từ 350k)',
          price: 150000,
          badge: 'Khuyến mãi 57%',
          action: 'Sở hữu vĩnh viễn tính năng tối ưu FPS, fix rung, tăng độ nhạy hoàn hảo.',
          fix: 'Tương thích mọi thiết bị iOS. Không can thiệp phần mềm, siêu an toàn.',
          pros: 'Cảm giác vuốt mượt mà, định vị mục tiêu siêu chính xác.',
          note: 'Chỉ hỗ trợ iOS.'
        }
      ]
    },
`;

html = html.replace(/var PRODUCTS = \[/, 'var PRODUCTS = [\n' + newProduct);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Added forget-lix to index.html');
