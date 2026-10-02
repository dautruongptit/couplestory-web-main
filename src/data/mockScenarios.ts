// ============================================================
// DATA CONTRACT - Cấu trúc dữ liệu chuẩn cho toàn bộ nền tảng
// Mọi template đều đọc từ interface này.
// ============================================================

export interface StoryData {
  id: string;
  slug: string;                    // URL đường dẫn: couplestory.site/{slug}
  template_id: string;             // ID template đang dùng
  status: 'draft' | 'published' | 'password_protected';

  global_config: {
    purpose: string;               // confession | anniversary | apology | wedding | diary
    theme_color: string;
    background_music_url?: string;
    is_music_autoplay?: boolean;
  };

  hero_block: {
    is_enabled: boolean;
    title: string;
    partner_a: { name: string; avatar_url: string; gender: string };
    partner_b: { name: string; avatar_url: string; gender: string };
    banner_images: string[];
    short_quote: string;
  };

  counter_block: {
    is_enabled: boolean;
    mode: 'count_up' | 'count_down';
    target_date: string;
    label_text: string;
  };

  letter_block: {
    is_enabled: boolean;
    heading: string;
    content: string;
    signature: string;
  };

  timeline_block: {
    is_enabled: boolean;
    section_title: string;
    events: Array<{
      id: string;
      date: string;
      title: string;
      description: string;
      media_url: string;
      location?: string;
      is_visible?: boolean;
    }>;
  };

  gallery_block: {
    is_enabled: boolean;
    section_title: string;
    images: Array<{ url: string; caption: string }>;
  };
}

// ============================================================
// USER TEST: Bảo Long & An Nhiên
// Tất cả kịch bản bên dưới đều thuộc cùng 1 tài khoản user test.
// Dữ liệu sự kiện, ngày tháng đồng nhất với nhau.
// ============================================================

const USER_TEST = {
  partner_a: {
    name: 'Bảo Long',
    avatar_url: 'https://api.dicebear.com/7.x/notionists/svg?seed=BaoLong',
    gender: 'male',
  },
  partner_b: {
    name: 'An Nhiên',
    avatar_url: 'https://api.dicebear.com/7.x/notionists/svg?seed=AnNhien',
    gender: 'female',
  },
  // Mốc thời gian chung (dùng lại cho mọi kịch bản)
  first_meet_date: '2023-09-25',       // Ngày đầu gặp mặt
  dating_start_date: '2023-12-24',     // Ngày chính thức yêu (Giáng sinh)
  proposal_date: '2026-09-25',         // Ngày cầu hôn (hôm nay)
  wedding_date: '2027-02-14',          // Ngày cưới dự kiến (Valentine)
};

// Ảnh chung dùng lại xuyên suốt các kịch bản
const SHARED_IMAGES = {
  first_meet: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80',
  first_date: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80',
  dalat_trip: 'https://images.unsplash.com/photo-1543885108-166299f056d6?auto=format&fit=crop&w=600&q=80',
  beach_trip: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80',
  proposal: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80',
  prewedding_studio: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80',
  prewedding_beach: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80',
  cooking: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80',
  grocery: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80',
  couple_sunset: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80',
  couple_romantic: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80',
  couple_apology: 'https://images.unsplash.com/photo-1498687258412-259df95b3558?auto=format&fit=crop&w=1200&q=80',
  wedding_banner: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
  diary_banner: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80',
};

export const mockScenarios: Record<string, StoryData> = {

  // ==============================
  // 💌 KỊCH BẢN 1: TỎ TÌNH
  // Bảo Long tạo trang để tỏ tình An Nhiên
  // Chỉ bật: Hero + Letter (tập trung vào lời tỏ tình)
  // ==============================
  'to-tinh': {
    id: 'story_001',
    slug: 'bao-long-to-tinh',
    template_id: 'dynamic_v1',
    status: 'published',
    global_config: {
      purpose: 'confession',
      theme_color: '#ff4d8d',
      background_music_url: 'https://example.com/perfect-ed-sheeran.mp3',
      is_music_autoplay: true,
    },
    hero_block: {
      is_enabled: true,
      title: 'Will You Be Mine?',
      partner_a: USER_TEST.partner_a,
      partner_b: USER_TEST.partner_b,
      banner_images: [SHARED_IMAGES.couple_sunset],
      short_quote: 'Kể từ ngày 25/09/2023 gặp em tại quán cafe, thế giới của anh đã thay đổi hoàn toàn...',
    },
    counter_block: {
      is_enabled: false,
      mode: 'count_up',
      target_date: '',
      label_text: '',
    },
    letter_block: {
      is_enabled: true,
      heading: 'Gửi An Nhiên,',
      content: 'Anh đã giấu kín tâm tư này từ buổi chiều mưa 25/09 năm ấy. Mỗi lần thấy em cười, tim anh lại trễ một nhịp. 3 tháng qua anh cứ quanh quẩn bên em, giờ anh muốn nói thật: Cho anh cơ hội được nắm tay em đi chung trên đoạn đường sắp tới nhé?',
      signature: 'Bảo Long — Người luôn dõi theo em',
    },
    timeline_block: {
      is_enabled: false,
      section_title: '',
      events: [],
    },
    gallery_block: {
      is_enabled: false,
      section_title: '',
      images: [],
    },
  },

  // ==============================
  // 🎉 KỊCH BẢN 2: KỶ NIỆM 1 NĂM YÊU
  // Bật: Hero + Counter (đếm ngày) + Timeline + Gallery
  // ==============================
  'ky-niem': {
    id: 'story_002',
    slug: 'bao-long-an-nhien-1year',
    template_id: 'dynamic_v1',
    status: 'published',
    global_config: {
      purpose: 'anniversary',
      theme_color: '#ff7b54',
      background_music_url: 'https://example.com/a-thousand-years.mp3',
      is_music_autoplay: true,
    },
    hero_block: {
      is_enabled: true,
      title: 'Happy 1st Anniversary',
      partner_a: USER_TEST.partner_a,
      partner_b: USER_TEST.partner_b,
      banner_images: [SHARED_IMAGES.first_date],
      short_quote: 'Một năm trôi qua nhanh như một chớp mắt, nhưng yêu thương thì cứ dài thêm mãi.',
    },
    counter_block: {
      is_enabled: true,
      mode: 'count_up',
      target_date: USER_TEST.dating_start_date + 'T00:00:00Z', // 24/12/2023
      label_text: 'Chúng mình đã chung đôi được',
    },
    letter_block: {
      is_enabled: false,
      heading: '',
      content: '',
      signature: '',
    },
    timeline_block: {
      is_enabled: true,
      section_title: 'Hành trình 365 ngày qua',
      events: [
        {
          id: 'evt_01',
          date: '25/09/2023',
          title: 'Lần đầu gặp mặt',
          description: 'Buổi chiều mưa, Bảo Long gặp An Nhiên tại quán cafe quen. Trời mưa to, anh nhường em chiếc ô.',
          media_url: SHARED_IMAGES.first_meet,
        },
        {
          id: 'evt_02',
          date: '24/12/2023',
          title: 'Chính thức yêu nhau 💕',
          description: 'Đêm Giáng sinh, dưới tuyết giả ở Landmark 81, Long cầm tay Nhiên nói: "Làm người yêu anh nhé?"',
          media_url: SHARED_IMAGES.dalat_trip,
        },
        {
          id: 'evt_03',
          date: '14/02/2024',
          title: 'Valentine đầu tiên',
          description: 'Long đặt lẩu bò tại nhà và trang trí nến lung linh. Nhiên khóc vì cảm động.',
          media_url: SHARED_IMAGES.cooking,
        },
        {
          id: 'evt_04',
          date: '06/2024',
          title: 'Chuyến đi Vũng Tàu',
          description: 'Chuyến road trip đầu tiên của hai đứa. Nắng, gió biển và nụ cười không dứt.',
          media_url: SHARED_IMAGES.beach_trip,
        },
      ],
    },
    gallery_block: {
      is_enabled: true,
      section_title: 'Khoảnh khắc đáng nhớ',
      images: [
        { url: SHARED_IMAGES.beach_trip, caption: 'Chuyến đi Vũng Tàu' },
        { url: SHARED_IMAGES.couple_romantic, caption: 'Lần đầu nắm tay' },
        { url: SHARED_IMAGES.dalat_trip, caption: 'Đêm Giáng sinh' },
        { url: SHARED_IMAGES.cooking, caption: 'Valentine tại nhà' },
      ],
    },
  },

  // ==============================
  // 🥺 KỊCH BẢN 3: XIN LỖI / LÀM HÒA
  // Bảo Long lỡ quên ngày kỷ niệm 1 năm, xin lỗi An Nhiên
  // Bật: Hero + Letter + Gallery (1 ảnh dễ thương)
  // ==============================
  'xin-loi': {
    id: 'story_003',
    slug: 'bao-long-xin-loi',
    template_id: 'dynamic_v1',
    status: 'published',
    global_config: {
      purpose: 'apology',
      theme_color: '#6b7280',
      background_music_url: 'https://example.com/sorry-justin-bieber.mp3',
      is_music_autoplay: true,
    },
    hero_block: {
      is_enabled: true,
      title: 'Anh Xin Lỗi Em',
      partner_a: USER_TEST.partner_a,
      partner_b: USER_TEST.partner_b,
      banner_images: [SHARED_IMAGES.couple_apology],
      short_quote: 'Đừng giận anh nữa nhé, nhà bao việc mà cứ hờn dỗi 🥺',
    },
    counter_block: {
      is_enabled: false,
      mode: 'count_up',
      target_date: '',
      label_text: '',
    },
    letter_block: {
      is_enabled: true,
      heading: 'An Nhiên à...',
      content: 'Hôm qua anh lỡ quên ngày kỷ niệm 1 năm 24/12 của mình. Anh biết với em ngày đó quan trọng lắm. Anh xin lỗi nha! Chiều nay đi ăn lẩu thái bù nhé? Anh hứa từ nay sẽ đặt lịch nhắc hết tất cả các ngày quan trọng. Yêu em!',
      signature: 'Bảo Long — Người chịu phạt 🫡',
    },
    timeline_block: {
      is_enabled: false,
      section_title: '',
      events: [],
    },
    gallery_block: {
      is_enabled: true,
      section_title: 'Đền em chiếc ảnh xinh',
      images: [
        { url: SHARED_IMAGES.couple_romantic, caption: 'Nụ cười cứu rỗi thế giới của anh' },
      ],
    },
  },

  // ==============================
  // 💍 KỊCH BẢN 4: ĐÁM CƯỚI / SAVE THE DATE
  // Bảo Long cầu hôn An Nhiên, đếm ngược ngày cưới Valentine 2027
  // Bật: Hero + Counter (đếm ngược) + Letter (thư mời) + Timeline + Gallery
  // ==============================
  'dam-cuoi': {
    id: 'story_004',
    slug: 'bao-long-an-nhien-wedding',
    template_id: 'dynamic_v1',
    status: 'published',
    global_config: {
      purpose: 'wedding',
      theme_color: '#c5a880',
      background_music_url: 'https://example.com/canon-in-d.mp3',
      is_music_autoplay: true,
    },
    hero_block: {
      is_enabled: true,
      title: 'Save The Date',
      partner_a: USER_TEST.partner_a,
      partner_b: USER_TEST.partner_b,
      banner_images: [SHARED_IMAGES.wedding_banner],
      short_quote: 'Từ buổi chiều mưa năm ấy đến ngày chung một nhà — chúng tôi sắp cưới!',
    },
    counter_block: {
      is_enabled: true,
      mode: 'count_down',
      target_date: USER_TEST.wedding_date + 'T10:00:00Z', // 14/02/2027
      label_text: 'Chỉ còn đợi đến ngày chung đôi',
    },
    letter_block: {
      is_enabled: true,
      heading: 'Thân mời bạn bè và người thân...',
      content: 'Trân trọng kính mời những người thân yêu nhất đến dự buổi tiệc nhỏ chung vui cùng hai vợ chồng vào ngày 14/02/2027. Sự hiện diện của bạn là lời chúc phúc tuyệt vời nhất dành cho Bảo Long & An Nhiên.',
      signature: 'Bảo Long & An Nhiên',
    },
    timeline_block: {
      is_enabled: true,
      section_title: 'Hành trình từ Yêu đến Cưới',
      events: [
        {
          id: 'evt_01',
          date: '25/09/2023',
          title: 'Gặp nhau lần đầu',
          description: 'Buổi chiều mưa, nhường nhau chiếc ô tại quán cafe.',
          media_url: SHARED_IMAGES.first_meet,
        },
        {
          id: 'evt_02',
          date: '24/12/2023',
          title: 'Chính thức yêu nhau',
          description: 'Đêm Giáng sinh, dưới tuyết giả ở Landmark 81.',
          media_url: SHARED_IMAGES.dalat_trip,
        },
        {
          id: 'evt_03',
          date: '25/09/2026',
          title: 'Cầu hôn — She said YES! 💍',
          description: 'Tròn 3 năm gặp nhau, Long quỳ gối cầu hôn Nhiên tại nơi hai người đã gặp nhau lần đầu.',
          media_url: SHARED_IMAGES.proposal,
        },
        {
          id: 'evt_04',
          date: '14/02/2027',
          title: 'Ngày trọng đại 💒',
          description: 'Valentine 2027 — Chung một nhà, chung một đời.',
          media_url: SHARED_IMAGES.wedding_banner,
        },
      ],
    },
    gallery_block: {
      is_enabled: true,
      section_title: 'Pre-Wedding Album',
      images: [
        { url: SHARED_IMAGES.prewedding_studio, caption: 'Studio — Áo dài truyền thống' },
        { url: SHARED_IMAGES.prewedding_beach, caption: 'Biển Phú Quốc' },
        { url: SHARED_IMAGES.proposal, caption: 'Khoảnh khắc cầu hôn' },
      ],
    },
  },

  // ==============================
  // 📖 KỊCH BẢN 5: NHẬT KÝ TÌNH YÊU HÀNG NGÀY
  // Bảo Long & An Nhiên ghi lại cuộc sống thường nhật
  // Bật: Hero + Timeline (dạng nhật ký)
  // ==============================
  'nhat-ky': {
    id: 'story_005',
    slug: 'bao-long-an-nhien-diary',
    template_id: 'dynamic_v1',
    status: 'published',
    global_config: {
      purpose: 'diary',
      theme_color: '#818cf8',
      background_music_url: undefined,
      is_music_autoplay: false,
    },
    hero_block: {
      is_enabled: true,
      title: 'Our Daily Vibes ✨',
      partner_a: USER_TEST.partner_a,
      partner_b: USER_TEST.partner_b,
      banner_images: [SHARED_IMAGES.diary_banner],
      short_quote: 'Ghi lại mọi khoảnh khắc hâm dở của hai đứa — Bảo Long & An Nhiên.',
    },
    counter_block: {
      is_enabled: false,
      mode: 'count_up',
      target_date: '',
      label_text: '',
    },
    letter_block: {
      is_enabled: false,
      heading: '',
      content: '',
      signature: '',
    },
    timeline_block: {
      is_enabled: true,
      section_title: 'Nhật ký gần đây',
      events: [
        {
          id: 'evt_01',
          date: '25/09/2026',
          title: 'Long nấu cơm 🍳',
          description: 'Trời mưa to, tự nhiên Long lôi tạp dề ra nấu bún bò Huế. Nhiên chấm 7/10 vì hơi mặn.',
          media_url: SHARED_IMAGES.cooking,
        },
        {
          id: 'evt_02',
          date: '24/09/2026',
          title: 'Đi siêu thị cuối tuần',
          description: 'Mua quá trời đồ ăn vặt. Nhiên giấu 3 hộp kem vào giỏ mà tưởng Long không thấy.',
          media_url: SHARED_IMAGES.grocery,
        },
        {
          id: 'evt_03',
          date: '22/09/2026',
          title: 'Xem phim tại nhà',
          description: 'Marathon La La Land lần thứ 5. Long ngủ gục, Nhiên vẽ bậy lên mặt.',
          media_url: SHARED_IMAGES.couple_romantic,
        },
      ],
    },
    gallery_block: {
      is_enabled: false,
      section_title: '',
      images: [],
    },
  },
};
