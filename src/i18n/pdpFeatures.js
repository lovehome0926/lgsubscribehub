function pack(tagline, features) {
  return {
    tagline,
    features: features.map(([source, title, copy]) => ({ source, title, copy })),
  }
}

function share(ids, entry) {
  return Object.fromEntries(ids.map((id) => [id, entry]))
}

const bmDualcoolAi = pack(
  "Soft Air menukar kepada aliran tidak langsung apabila suhu sesuai dicapai, supaya anda selesa dan tidak terlalu sejuk.",
  [
    ["Gentle breeze adjusted to your needs", "Angin lembut mengikut keperluan", "Soft Air menukar kepada aliran tidak langsung apabila suhu sesuai dicapai, supaya anda selesa dan tidak terlalu sejuk."],
    ["Customized sleep mode based on your routine", "Mod tidur mengikut rutin anda", "Sleep Timer+ belajar suhu dan aliran udara kegemaran anda untuk malam yang lebih lena."],
    ["Proactive energy savings in your hands", "Penjimatan tenaga dalam kawalan anda", "Biarkan penyaman udara hidup semasa mengedar udara; unit masuk mod jimat tenaga apabila tingkap terbuka."],
    ["Avoid energy loss even during ventilation", "Elak pembaziran tenaga semasa pengudaraan", "Masih boleh hidup semasa mengedar udara, dengan mod jimat tenaga apabila tingkap terbuka."],
    ["Automatically dries heat exchanger after use", "Keringkan penukar haba secara automatik", "Auto Clean+ beroperasi selepas guna, meniup udara untuk buang kelembapan."],
    ["Keep hard-to-reach areas easy to clean", "Kawasan sukar dicapai mudah dibersihkan", "Mod Freeze Cleaning memudahkan pembersihan dalaman penyaman udara."],
  ],
)

const bmArtcool = pack(
  "Paparan memberitahu anda supaya mudah pantau dan kurangkan penggunaan tenaga.",
  [
    ["Easy-to-Monitor Energy Consumption", "Mudah pantau penggunaan tenaga", "Paparan memberitahu anda supaya mudah pantau dan kurangkan penggunaan tenaga semasa operasi A/C."],
    ["Environment-Friendly Refrigerant", "Penyejuk mesra alam", "Elak pencemaran dengan penyejuk R32 yang lebih cekap tenaga."],
    ["Control 4 Levels of Energy Consumption", "4 tahap penggunaan tenaga", "Kawal penggunaan tenaga dalam 4 tahap mengikut keperluan, sama ada seorang atau sekeluarga."],
    ["Stylish ARTCOOL Design", "Reka bentuk ARTCOOL yang bergaya", "Kaca cermin LG ARTCOOL memantulkan persekitaran dan mengekalkan estetika rumah."],
    ["Faster Cooling, Faster Comfort", "Lebih sejuk, lebih cepat", "Dapatkan keselesaan lebih pantas dengan LG DUAL Inverter Compressor™."],
    ["Verified by TUV", "Disahkan TUV", "Penyaman udara inverter LG menyejuk sehingga 40% lebih pantas berbanding model bukan inverter."],
  ],
)

const bmDualcoolApp = pack(
  "Paparan memberitahu anda supaya mudah pantau dan kurangkan penggunaan tenaga.",
  [
    ["Easy-to-Monitor Energy Consumption", "Mudah pantau penggunaan tenaga", "Paparan memberitahu anda supaya mudah pantau dan kurangkan penggunaan tenaga semasa operasi A/C."],
    ["Environment-Friendly Refrigerant", "Penyejuk mesra alam", "Elak pencemaran dengan penyejuk R32 yang lebih cekap tenaga."],
    ["Control 4 Levels of Energy Consumption", "4 tahap penggunaan tenaga", "Kawal penggunaan tenaga dalam 4 tahap mengikut keperluan, sama ada seorang atau sekeluarga."],
    ["Proactive energy savings in your hands.", "Penjimatan tenaga dalam kawalan anda", "Tetapkan tempoh guna dan had tenaga dalam aplikasi ThinQ™ yang mudah."],
    ["Keep the inside of your machine squeaky clean", "Dalam mesin kekal bersih", "Mod Freeze Cleaning memudahkan pembersihan ruang dalaman yang sukar dicapai."],
    ["Easy-to-see LED display", "Paparan LED mudah dibaca", "Maklumat jelas sepintas lalu dengan paparan LED yang kemas."],
  ],
)

const bmDualcoolClassic = pack(
  "Paparan memberitahu anda supaya mudah pantau dan kurangkan penggunaan tenaga.",
  [
    ["Easy-to-Monitor Energy Consumption", "Mudah pantau penggunaan tenaga", "Paparan memberitahu anda supaya mudah pantau dan kurangkan penggunaan tenaga semasa operasi A/C."],
    ["Environment-Friendly Refrigerant", "Penyejuk mesra alam", "Elak pencemaran dengan penyejuk R32 yang lebih cekap tenaga."],
    ["Control 4 Levels of Energy Consumption", "4 tahap penggunaan tenaga", "Kawal penggunaan tenaga dalam 4 tahap mengikut keperluan, sama ada seorang atau sekeluarga."],
    ["Faster Cooling, Faster Comfort", "Lebih sejuk, lebih cepat", "Dapatkan keselesaan lebih pantas dengan LG DUAL Inverter Compressor™."],
    ["Save on Energy Bills and the Planet", "Jimat bil, jaga alam", "Kurangkan penggunaan tenaga dan bil elektrik dengan penyejukan yang lebih cekap."],
    ["Verified by TUV", "Disahkan TUV", "Penyaman udara inverter LG menjimatkan sehingga 70% lebih tenaga berbanding model bukan inverter."],
  ],
)

const bmFront = pack(
  "Selesaikan semua keperluan dobi dan mudahkan rutin dengan mencuci lebih banyak pakaian sekali gus.",
  [
    ["Your spacious laundry solution​", "Penyelesaian dobi yang luas", "Selesaikan semua keperluan dobi dan mudahkan rutin dengan mencuci lebih banyak pakaian sekali gus."],
    ["Take the guesswork out of washing and let AI DD™", "Biarkan AI DD™ pilih basuhan", "Mesin guna AI untuk pilih kitaran, mengurangkan kerosakan fabrik supaya pakaian lebih tahan lama."],
    ["Get Fresh Laundry in just 39 minutes", "Dobi segar dalam 39 minit", "TurboWash™ 360⁰ menyembur air empat arah untuk basuhan mendalam tanpa merosakkan fabrik."],
    ["Experience Reduced Noise and Vibrations", "Kurang hingar dan getaran", "Penderia getaran membantu proses dobi yang lebih senyap."],
    ["Prioritize your health and tackle allergens", "Jaga kesihatan, tangani alergen", "Kitaran Allergy Care LG buang alergen, hama debu dan bakteria."],
    ["Link your washing machine and smartphone", "Sambung mesin ke telefon", "Kawalan mesin, pilih kitaran dan mula basuh dari jauh melalui aplikasi LG ThinQ™."],
  ],
)

const cnDualcoolAi = pack(
  "Soft Air 在达到合适温度后改为间接送风，舒适且不会过冷。",
  [
    ["Gentle breeze adjusted to your needs", "按需要调节的柔风", "Soft Air 在达到合适温度后改为间接送风，舒适且不会过冷。"],
    ["Customized sleep mode based on your routine", "按作息定制的睡眠模式", "Sleep Timer+ 学习您的温度与气流偏好，为您量身打造安稳夜晚。"],
    ["Proactive energy savings in your hands", "节能主动掌握", "开窗换气时仍可运行，机组进入节能模式。"],
    ["Avoid energy loss even during ventilation", "换气时也减少能耗", "室内循环空气时仍可开机，开窗时进入节能模式。"],
    ["Automatically dries heat exchanger after use", "使用后自动干燥换热器", "Auto Clean+ 在使用后启动，吹风去除湿气。"],
    ["Keep hard-to-reach areas easy to clean", "难清洁区域也简单", "Freeze Cleaning 模式让空调内部清洁更轻松。"],
  ],
)

const cnArtcool = pack(
  "屏幕随时提示，方便您监测并降低能耗。",
  [
    ["Easy-to-Monitor Energy Consumption", "能耗一目了然", "屏幕随时提示，方便您监测并降低空调运行能耗。"],
    ["Environment-Friendly Refrigerant", "环保冷媒", "使用能效更好的 R32 冷媒，减少环境污染。"],
    ["Control 4 Levels of Energy Consumption", "4 档能耗控制", "按一人或全家需求，分 4 档控制用电。"],
    ["Stylish ARTCOOL Design", "ARTCOOL 时尚外观", "LG ARTCOOL 镜面玻璃映出周围环境，融入家居美感。"],
    ["Faster Cooling, Faster Comfort", "更快制冷，更快舒适", "搭载 LG DUAL Inverter Compressor™，更快达到舒适温度。"],
    ["Verified by TUV", "TUV 验证", "LG 变频空调制冷速度可比非变频机型快约 40%。"],
  ],
)

const cnDualcoolApp = pack(
  "屏幕随时提示，方便您监测并降低能耗。",
  [
    ["Easy-to-Monitor Energy Consumption", "能耗一目了然", "屏幕随时提示，方便您监测并降低空调运行能耗。"],
    ["Environment-Friendly Refrigerant", "环保冷媒", "使用能效更好的 R32 冷媒，减少环境污染。"],
    ["Control 4 Levels of Energy Consumption", "4 档能耗控制", "按一人或全家需求，分 4 档控制用电。"],
    ["Proactive energy savings in your hands.", "节能主动掌握", "在易用的 ThinQ™ 应用中设定使用时段与能耗上限。"],
    ["Keep the inside of your machine squeaky clean", "内部清洁更轻松", "Freeze Cleaning 模式方便清洁难以触及的内部空间。"],
    ["Easy-to-see LED display", "LED 显示清晰易读", "简洁 LED 屏让关键信息一目了然。"],
  ],
)

const cnDualcoolClassic = pack(
  "屏幕随时提示，方便您监测并降低能耗。",
  [
    ["Easy-to-Monitor Energy Consumption", "能耗一目了然", "屏幕随时提示，方便您监测并降低空调运行能耗。"],
    ["Environment-Friendly Refrigerant", "环保冷媒", "使用能效更好的 R32 冷媒，减少环境污染。"],
    ["Control 4 Levels of Energy Consumption", "4 档能耗控制", "按一人或全家需求，分 4 档控制用电。"],
    ["Faster Cooling, Faster Comfort", "更快制冷，更快舒适", "搭载 LG DUAL Inverter Compressor™，更快达到舒适温度。"],
    ["Save on Energy Bills and the Planet", "省电费，也更环保", "更高效制冷，降低用电与电费。"],
    ["Verified by TUV", "TUV 验证", "LG 变频空调可比非变频机型节省约 70% 能源。"],
  ],
)

const cnFront = pack(
  "一次洗更多衣服，简化日常洗衣。",
  [
    ["Your spacious laundry solution​", "宽敞的洗衣方案", "一次洗更多衣服，简化日常洗衣。"],
    ["Take the guesswork out of washing and let AI DD™", "交给 AI DD™ 选择洗程", "AI 选择合适洗程，减少衣物损伤，穿着更长久。"],
    ["Get Fresh Laundry in just 39 minutes", "39 分钟洗净清新", "TurboWash™ 360⁰ 四向喷水，深层清洁且呵护面料。"],
    ["Experience Reduced Noise and Vibrations", "更低噪音与震动", "震动传感器让洗衣过程更安静。"],
    ["Prioritize your health and tackle allergens", "呵护健康，应对过敏原", "LG Allergy Care 洗程去除过敏原、尘螨与细菌。"],
    ["Link your washing machine and smartphone", "洗衣机连上手机", "用 LG ThinQ™ 应用远程控制、选程，出门也能启动。"],
  ],
)

const FEATURES = {
  bm: {
    "atom-u-undersink-water-purifier-wu525bs": pack(
      "Produk ini mensterilkan bahagian dalam paip secara automatik selama 10 minit setiap jam untuk kebersihan lebih baik.",
      [
        ["Cleaning round the clock", "Pembersihan sepanjang masa", "Produk ini mensterilkan bahagian dalam paip secara automatik selama 10 minit setiap jam untuk kebersihan lebih baik."],
        ["Clean, strictly filtered water", "Air tertapis dengan ketat", "Kurangkan logam berat dan norovirus dengan sistem tapisan berbilang peringkat yang menghasilkan air berkualiti tinggi."],
        ["WQA-certified All Puri Filter system", "Sistem All Puri Filter diperakui WQA", "Tapisan mikroplastik sehingga 99.8%, diperakui Water Quality Association (WQA)."],
        ["Dispense as much as you want", "Agih sebanyak yang anda mahu", "Agih jumlah tepat yang diperlukan dengan satu sentuhan."],
        ["With preset temperatures, Easy access to hot and cold water", "Suhu praset, mudah dapat air panas dan sejuk", "Akses air sejuk dan suhu panas praset 40℃, 75℃ dan 85℃ dengan satu butang."],
        ["Filter replacement notifications", "Notis tukar penapis", "Lampu smart clean memberitahu bila tiba masa tukar penapis."],
      ],
    ),
    "puricare-tankless-water-purifier-wd518an": pack(
      "Pilih warna dan gaya yang sesuai. Nikmati fungsi pintar yang belajar keutamaan anda.",
      [
        ["Designed for your home", "Direka untuk rumah anda", "Pilih pelbagai warna dan gaya yang sesuai dengan anda."],
        ["Experience convenience", "Rasai kemudahan", "Nikmati fungsi pintar yang belajar keutamaan anda."],
        ["Hygiene built-in", "Kebersihan terbina dalam", "Rasa air tulen dan ketenangan minda."],
        ["LG ThinQ™ connection", "Sambungan LG ThinQ™", "Pantau dan kawal produk dari aplikasi LG ThinQ™."],
        ["A Style for everyone", "Gaya untuk semua", "Lihat rangkaian warna dan gaya untuk pelengkap ruang dan cita rasa anda."],
        ["Flexible installation", "Pemasangan fleksibel", "Muat di bilik besar atau kecil; susun atur dispenser boleh disesuaikan bila-bila masa."],
      ],
    ),
    "puricare-tankless-water-purifier-wd516an": pack(
      "Tekan butang pensterilan dalaman dan paip di bahagian atas produk lebih 3 saat.",
      [
        ["high-temperature sterilization", "Pensterilan suhu tinggi", "Tekan butang pensterilan dalaman dan paip di bahagian atas produk lebih 3 saat."],
        ["Easy Filter Replacement", "Mudah tukar penapis", "Ganti penapis yang dihantar mengikut jadual dengan mudah."],
        ["Just twist and pull to quickly replace the filter", "Pusing dan tarik untuk tukar penapis", "Pusing dan tarik untuk ganti dengan penapis baharu."],
        ["A new filter is shipped to your doorstep every six months", "Penapis baharu dihantar setiap enam bulan", "Perkhidmatan langganan yang menghantar penapis baharu ke rumah setiap enam bulan."],
        ["Automatic high-temperature sterilization of water pipes and outlet", "Pensterilan suhu tinggi automatik", "Pensterilan automatik suhu tinggi tanpa kos panggilan servis yang tinggi."],
        ["UV sterilization for pure water to the last drop", "Pensterilan UV hingga titisan terakhir", "Bahagian dalam paip kekal segar dengan pensterilan UV automatik setiap jam, atau bila-bila anda mahu."],
      ],
    ),
    "puricare-360-double-booster-as10gdby0": pack(
      "Diperakui British Allergy Foundation untuk mengurangkan bahan pencetus alahan melalui penapis debu.",
      [
        ["Certified by BAF", "Diperakui BAF", "Diperakui British Allergy Foundation untuk mengurangkan bahan pencetus alahan melalui penapis debu."],
        ["Purify the Air All Around You", "Tulenkan udara di sekeliling anda", "LG PuriCare™ menulenkan udara 360˚ di setiap arah, di mana sahaja anda letakkannya."],
        ["Fresh air spreads faster and farther", "Udara segar lebih jauh dan pantas", "Hantar udara tertapis lebih jauh dan 24% lebih pantas berbanding model tanpa Clean Boost."],
        ["Breathe freely, live joyfully with pets", "Bernafas lega bersama haiwan peliharaan", "Ciri Pet Care LG tangani bau dan bulu haiwan dengan cekap."],
        ["Better air. Less pet hair", "Udara lebih baik. Kurang bulu", "Pet Mode sasar bulu di paras rendah, menangkap 35% lebih banyak."],
        ["Comfort in every breath with Allergy Care", "Selasa setiap nafas dengan Allergy Care", "UVnano dan Ionizer gabung untuk hapuskan 99.9% bakteria dan meneutralkan bahan berbahaya di udara."],
      ],
    ),
    "puricare-360-single-booster-as65gdby0": pack(
      "Diperakui British Allergy Foundation untuk mengurangkan bahan pencetus alahan melalui penapis debu.",
      [
        ["Certified by BAF", "Diperakui BAF", "Diperakui British Allergy Foundation untuk mengurangkan bahan pencetus alahan melalui penapis debu."],
        ["Purify the air all around you", "Tulenkan udara di sekeliling anda", "LG PuriCare™ menulenkan udara 360˚ di setiap arah, di mana sahaja anda letakkannya."],
        ["Fresh air spreads faster and farther", "Udara segar lebih jauh dan pantas", "Hantar udara tertapis lebih jauh dan 24% lebih pantas berbanding model tanpa Clean Boost."],
        ["Breathe freely, live joyfully with pets", "Bernafas lega bersama haiwan peliharaan", "Ciri Pet Care LG tangani bau dan bulu haiwan dengan cekap."],
        ["Better air. Less pet hair", "Udara lebih baik. Kurang bulu", "Pet Mode sasar bulu di paras rendah, menangkap 35% lebih banyak."],
        ["Comfort in every breath with Allergy Care", "Selasa setiap nafas dengan Allergy Care", "UVnano dan Ionizer gabung untuk hapuskan 99.9% bakteria dan meneutralkan bahan berbahaya di udara."],
      ],
    ),
    "puricare-360-hit-pet-version-as60ghbto": pack(
      "Pet Mode sasar bulu di paras rendah dengan aliran tepat, menangkap 35% lebih banyak untuk rumah yang lebih bersih.",
      [
        ["Better air. Less pet hair", "Udara lebih baik. Kurang bulu", "Pet Mode sasar bulu di paras rendah dengan aliran tepat, menangkap 35% lebih banyak. Pra-penapis mudah diganti."],
        ["Minimize pet odor. Maximize fresh air", "Kurangkan bau haiwan. Maksimumkan udara segar", "Penapis fotokatalitik dibantu cahaya merawat 55% lebih bau haiwan."],
        ["Give your air a deep clean", "Bersihkan udara secara mendalam", "Allergy Care kurangkan bakteria, virus, debu ultra-halus, alergen dan gas berbahaya."],
        ["Clean air with Multi-Filtration System", "Udara bersih dengan Multi-Filtration", "Sistem berbilang tapisan menangkap dan buang 99.9% zarah berbahaya — bakteria, virus, debu, alergen dan bau."],
        ["Certified by BAF", "Diperakui BAF", "BAF memperakui salutan penapis untuk buang alergen seperti hama debu, kulat dan jamur di udara."],
        ["Tested by FITI 1)", "Diuji FITI", "Antibakteria 99.9% — Staphylococcus aureus / Klebsiella pneumoniae / Escherichia coli."],
      ],
    ),
    "puricare-aerobooster-pet-version-as55ggsyo": pack(
      "Aliran udara 76.9% lebih kuat berbanding model standard, menangkap bulu dan bau haiwan supaya rumah kekal segar.",
      [
        ["Air quality enhanced for pet-friendly living", "Kualiti udara untuk rumah berhaiwan", "Aliran 76.9% lebih kuat berbanding model standard, menangkap bulu dan bau haiwan."],
        ["Pet-friendly air with light-powered freshness", "Udara mesra haiwan dengan kesegaran cahaya", "Penapis haiwan fotokatalitik."],
        ["Clean air with a multi-filtration system", "Udara bersih dengan tapisan berbilang", "Penapis HEPA kurangkan debu, zarah ultra-halus, kuman, virus, bau, jamur dan bakteria."],
        ["Clean fans for clean air", "Kipas bersih, udara bersih", "Cahaya UVnano buang 99.998% bakteria berbahaya pada permukaan bilah kipas."],
        ["Leaves your space free from bacteria", "Ruang lebih bebas bakteria", "Ionizer meneutralkan bahan berbahaya untuk persekitaran yang lebih sihat."],
        ["Lighting to match your mood", "Pencahayaan ikut mood", "Sesuaikan lampu mengikut suasana anda."],
      ],
    ),
    "puricare-aeromini-as30ggw10": pack(
      "Penapis Aero H buang 99.999% debu ultra-halus hingga 0.01 µm, serta 99.8% bakteria, 98.5% virus dan 99.9% jamur di udara.",
      [
        ["Multi-filtration for fresh air", "Tapisan berbilang untuk udara segar", "Penapis Aero H buang 99.999% debu ultra-halus hingga 0.01 µm, serta 99.8% bakteria, 98.5% virus dan 99.9% jamur di udara."],
        ["Contemporary design to complement your space", "Reka bentuk kontemporari", "Siluet ramping dan minimal, meresap semula jadi ke dalam mana-mana ruang."],
        ["Compact in size, light on space", "Kompak, jimat ruang", "21% kurang lantai dan 30% lebih rendah berbanding model 360˚ Hit konvensional."],
        ["Purifying your space in every direction", "Tulenkan ruang setiap arah", "Penulenan 360° untuk bilik bermain, bilik tidur atau pejabat rumah."],
        ["Quiet comfort, even in motion", "Senyap walaupun beroperasi", "Hanya 26dB, cukup senyap untuk belajar atau berehat."],
        ["Smart living begins with LG ThinQ™", "Hidup pintar dengan LG ThinQ™", "Pantau kualiti udara masa nyata dan kawal penulen dari aplikasi LG ThinQ™."],
      ],
    ),
    "puricare-aerocat-tower-as25gcbzo": pack(
      "Cahaya UVnano hapuskan lebih 99.99% bakteria dan virus berbahaya pada bilah kipas.",
      [
        ["Care for hidden areas", "Jaga kawasan tersembunyi", "Cahaya UVnano hapuskan lebih 99.99% bakteria dan virus berbahaya pada bilah kipas."],
        ["Easily replaceable for clean, fresh air", "Mudah diganti untuk udara segar", "Tangkap zarah besar seperti bulu dan debu; mudah dicuci atau diganti."],
        ["Sensing warmth mode", "Mod kehangatan berpengesan", "Hanya memanas apabila kucing duduk, dalam tempoh pemasa yang ditetapkan."],
        ["A warm, inviting space for your cat", "Ruang hangat untuk kucing", "Ruang selesa dengan 2 tetapan haba untuk keselesaan kucing anda."],
        ["Air purification system for pet-friendly homes", "Penulenan udara untuk rumah berhaiwan", "Kurangkan bulu kucing, alergen dan bau."],
        ["Strong when needed, silent for your cat", "Kuat bila perlu, senyap untuk kucing", "Penulenan berkuasa, operasi senyap apabila kucing menggunakannya."],
      ],
    ),
    "lg-styler-steam-clothing-care-s3wf": pack(
      "Dalam 20 minit, LG Styler™ kurangkan bau dan kedut, menjaga fabrik seperti dijemur matahari.",
      [
        ["Shakes Off Wrinkles & Odours as Fast as 20 Minutes", "Buang kedut dan bau dalam 20 minit", "Dalam 20 minit, LG Styler™ kurangkan bau dan kedut, menjaga fabrik seperti dijemur matahari."],
        ["Eliminates 99.9% Viruses, Bacteria, and Allergens", "Hapuskan 99.9% virus, bakteria dan alergen", "Kitaran Sanitize berkuasa TrueSteam™ bantu kurangkan alergen, bakteria dan virus pada pakaian, cadar, sukan dan mainan lembut."],
        ["Keep Your Precious Items Dry And Clean At All Times", "Barang berharga kekal kering dan bersih", "Keringkan fabrik halus seperti lingerie dan sweater lebih pantas daripada jemur udara dengan sistem suhu rendah."],
        ["Smart Custom Cycles for Your Fashion Pieces", "Kitaran pintar untuk fabrik istimewa", "Jaga barang yang tidak sesuai dalam mesin basuh dan pengering biasa."],
        ["Smoothens Wrinkles & Get Crisp Crease in Your Pants", "Licinkan kedut, kekalkan lipatan seluar", "Kekalkan lipatan seluar yang kemas sambil kurangkan kedut dengan cepat."],
        ["Easily Monitor And Control Your LG Styler™ At Your Fingertips", "Pantau dan kawal LG Styler™ di hujung jari", "ThinQ™ dengan Wi-Fi membolehkan kawalan jauh dan muat turun kitaran tambahan."],
      ],
    ),
    "lg-massage-recliner-mh21rry": pack(
      "Bangku menjadi penahan kaki dan meja mini dengan storan apabila dibalik. Definisi semula relaks dengan LG Massage Recliner.",
      [
        ["Footrest and mini-table in one", "Penahan kaki dan meja mini", "Bangku menyatu sebagai penahan kaki dan menjadi meja mini dengan storan apabila dibalik."],
        ["Ergonomic comfort designed for your body", "Keselesaan ergonomik", "Sistem Body-Fit (rangka S&L)."],
        ["Redesign your relaxation", "Definisi semula relaks", "Nikmati relaks baharu dengan LG Massage Recliner."],
        ["Helps you unwind after a long day with brainwave sounds​", "Relaks selepas hari panjang dengan bunyi gelombang otak", "Bunyi gelombang otak bantu kurangkan stres, digabung senaman pernafasan dan urutan yang lepaskan ketegangan otot."],
        ["Brainwave sounds that help you relax for better rest", "Bunyi gelombang otak untuk rehat lebih baik", "Bunyi relaks ditambah urutan badan ringan membantu anda lebih mudah tidur."],
        ["Cozy up to warmth and comfort", "Hangat dan selesa", "Kehangatan lembut di punggung bawah meningkatkan keselesaan semasa urutan."],
      ],
    ),
    ...share(["dualcool-ai-s3-q120agzb", "dualcool-ai-s3-q2412gzc"], bmDualcoolAi),
    ...share(["artcool-mirror-s3-q12jarpa", "artcool-mirror-s3-q24k2rpa"], bmArtcool),
    ...share(["dualcool-s3-q09jaypp", "dualcool-s3-q18kaypa"], bmDualcoolApp),
    ...share(["dualcool-s3-q12jaypp", "dualcool-s3-q24klypa"], bmDualcoolClassic),
    ...share(["front-loader-washing-machine-fx1412s5gr", "front-loader-washing-machine-f2520snekr"], bmFront),
    "washer-dryer-f2515rntkar": pack(
      "Jimat ruang, beri lebih tempat untuk keluarga dengan mesin basuh dan pengering seunit LG.",
      [
        ["Washer and Dryer in One", "Mesin basuh dan pengering seunit", "Jimat ruang, beri lebih tempat untuk keluarga dengan mesin basuh dan pengering seunit LG."],
        ["Fit your washer into your life", "Muat dalam kehidupan anda", "Kedalaman hanya 645mm, jimat 125mm ruang tanpa kompromi saiz basuhan."],
        ["Level up your laundry", "Tingkatkan dobi anda", "Teknologi LG membolehkan reka bentuk padat dengan dram lebih besar tetapi lebih nipis."],
        ["Take the guesswork out of washing and let AI DD™", "Biarkan AI DD™ pilih basuhan", "Mesin guna AI untuk pilih kitaran, mengurangkan kerosakan fabrik."],
        ["Get Fresh Laundry in just 39 minutes", "Dobi segar dalam 39 minit", "TurboWash™ 360 menyembur air empat arah untuk basuhan mendalam dalam masa singkat."],
        ["Experience Reduced Noise and Vibrations", "Kurang hingar dan getaran", "Penderia getaran membantu proses dobi yang lebih senyap."],
      ],
    ),
    "lg-washtower-wt2520nhegr": pack(
      "Gayakan ruang anda dengan LG Objet WashTower™. Ruang dobi nampak lebih bergaya.",
      [
        ["Built for Performance, Styled By You", "Prestasi dibina, gaya daripada anda", "Gayakan ruang anda dengan LG Objet WashTower™."],
        ["Laundry Room", "Bilik dobi", "LG Objet WashTower™ menjadikan ruang dobi lebih bergaya."],
        ["Easy Reach Control Panel", "Panel kawalan mudah dicapai", "Panel di tengah memberi akses mudah kepada kawalan mesin basuh dan pengering."],
        ["AI DD™", "AI DD™", "Teknologi Auto Sense AI DD™ pilih corak paling sesuai untuk jaga pakaian."],
        ["Smart Pairing™", "Smart Pairing™", "Pakaian yang sudah dibasuh dikeringkan pada kitaran optimum."],
        ["Get It All Done and Then Some", "Siapkan semuanya, dan lebih", "Dobi dibersihkan teliti dalam beberapa minit tanpa kompromi perlindungan fabrik."],
      ],
    ),
    "lg-washtower-wt1410nhb": pack(
      "LG WashTower™ ialah mesin basuh dan pengering bersepadu: pantas, mudah, pintar dan bergaya.",
      [
        ["Integrated, Intelligent Laundry Solution", "Penyelesaian dobi bersepadu yang pintar", "LG WashTower™ ialah mesin basuh dan pengering bersepadu: pantas, mudah, pintar dan bergaya."],
        ["A Tower of Laundry Innovation", "Menara inovasi dobi", "Teknologi pintar mengenal pasti kitaran basuh dan kering yang optimum."],
        ["Take Control with Center Control", "Kawal dengan panel tengah", "Panel seunit dalam jangkauan — intuitif dan mudah."],
        ["AI DD™", "AI DD™", "Teknologi Auto Sense AI DD™ pilih corak paling sesuai untuk jaga pakaian."],
        ["Smart Paring™", "Smart Pairing™", "Pakaian yang sudah dibasuh dikeringkan pada kitaran optimum."],
        ["Get It All Done and Then Some", "Siapkan semuanya, dan lebih", "Dobi dibersihkan teliti dalam 30 minit tanpa kompromi perlindungan fabrik."],
      ],
    ),
    "lg-top-loader-tv2520sv9kr": pack(
      "Gerakan dioptimumkan secara automatik mengikut berat dan jenis fabrik setiap muatan.",
      [
        ["Intelligent Care of 24% More Fabric Protection", "Perlindungan fabrik 24% lebih pintar", "Gerakan dioptimumkan secara automatik mengikut berat dan jenis fabrik setiap muatan."],
        ["Quiet Operator", "Operasi senyap", "Mengimbangi getaran dan kelajuan putaran dengan 4 peredam menegak, 2 mendatar dan 1 penderia getaran."],
        ["A Powerful Clean in 39 Minutes", "Basuhan berkuasa dalam 39 minit", "TurboWash LG berikan pakaian bersih dan segar dalam 39 minit."],
        ["Same Size on the Outside, Bigger Capacity in the Inside", "Saiz sama, kapasiti lebih besar", "Maksimumkan ruang dalaman untuk tab yang lebih besar."],
        ["A Larger Lint Filter Keeps the Tub and Your Clothes Cleaner", "Penapis habuk lebih besar", "Penapis habuk lebih besar menjaga dobi dan dram lebih bersih."],
        ["Enjoy Fresher Fabrics for Longer", "Fabrik lebih wangi lebih lama", "Pelembut meresap ke dalam fabrik semasa basuhan."],
      ],
    ),
    "lg-top-loader-tx2522at9gr": pack(
      "Basuh dengan gelombang Pulsator Dynamic yang lebih kuat dan pantas dari sisi ke sisi.",
      [
        ["Power motion", "Gerakan berkuasa", "Basuh dengan gelombang Pulsator Dynamic yang lebih kuat dan pantas dari sisi ke sisi."],
        ["Wash cycles tailored to your laundry habits", "Kitaran ikut tabiat dobi", "Pengoptimuman kitaran memilih kitaran kerap secara automatik untuk jimat masa."],
        ["Control your laundry anytime, anywhere", "Kawal dobi bila-bila masa", "Aplikasi ThinQ membolehkan sambungan jauh ke mesin basuh."],
        ["AI-enhanced washing powered by AI DD™", "Basuhan AI dengan AI DD™", "AI Wash optimumkan gerakan mengikut jenis dobi."],
        ["An optimal way to wash", "Cara basuh yang optimum", "Motor LG Inverter Direct Drive™ dengan enam kitaran untuk basuhan teliti."],
        ["A powerful yet gentle clean in 30 min", "Bersih berkuasa tetapi lembut dalam 30 minit", "TurboWash™ LG berikan basuhan berkuasa tetapi lembut dalam masa lebih singkat."],
      ],
    ),
    "lg-dual-inverter-heat-pump-dryer-rx10vhp3kr": pack(
      "Dengan AI DUAL Inverter dan algoritma pintar, penggunaan tenaga dikurangkan dengan ketara.",
      [
        ["Experience a new standard of laundry in energy class A+++-10%", "Standard baharu kelas tenaga A+++-10%", "Dengan AI DUAL Inverter dan algoritma pintar, penggunaan tenaga dikurangkan dengan ketara."],
        ["Cycles tailored to usage habits", "Kitaran ikut tabiat guna", "Kitaran kerap disimpan bersama 13 kitaran lalai, disesuaikan dengan tabiat pengeringan."],
        ["No manual cleaning required for the condenser", "Kondenser tanpa cuci manual", "Mencuci kondenser secara automatik supaya anda ada lebih masa untuk tugasan lain."],
        ["Wash and dry in sync", "Basuh dan kering seiring", "Smart Pairing membenarkan mesin basuh beritahu pengering pilih kitaran sepadan."],
        ["Control your laundry anytime, anywhere", "Kawal dobi bila-bila masa", "Aplikasi LG ThinQ™ menyambung anda dengan pengering."],
        ["AI-enhanced optimal drying", "Pengeringan optimum berbantu AI", "AI Dry optimumkan pengeringan mengikut jenis fabrik dan saiz muatan."],
      ],
    ),
    "instaview-french-door-gv-k25ffger": pack(
      "Aksen perak pada rak dan laci memberi rasa premium dan elegan di dalam peti.",
      [
        ["Kitchen refined, with premium design", "Dapur lebih halus, reka bentuk premium", "Reka bentuk Premium Flat Mirror."],
        ["Metallic trim for a stylish look", "Trim metalik yang bergaya", "Aksen perak pada rak dan laci memberi rasa premium dan elegan."],
        ["Fresh food with fresh saving", "Makanan segar, jimat tenaga", "LG Smart Inverter Compressor™ jimat tenaga dengan menyesuaikan kelajuan motor."],
        ["Temperature set by food type", "Suhu mengikut jenis makanan", "Simpan makanan pada tetapan suhu sesuai untuk daging, ikan dan sayur."],
        ["Reduces bacteria3) and odors, increases freshness", "Kurangkan bakteria dan bau, tingkatkan kesegaran", "Hygiene Fresh⁺™ nyahbau dan kurangkan sehingga 99.999% bakteria."],
        ["Keep your cool from anywhere with LG ThinQ®", "Kawal dari mana-mana dengan LG ThinQ®", "LG ThinQ® beri penyelesaian pintar untuk peralatan rumah."],
      ],
    ),
    "side-by-side-refrigerator-gc-j257sqnw": pack(
      "Door-in-Door™ memudahkan anda ambil makanan kegemaran dengan butang buka tersembunyi.",
      [
        ["Quick & Easy Access to Your Favorites", "Akses cepat ke kegemaran anda", "Door-in-Door™ memudahkan anda ambil makanan kegemaran dengan butang buka tersembunyi."],
        ["Seals in Farm Freshness Longer", "Kekalkan kesegaran lebih lama", "LinearCooling™ kurangkan turun naik suhu, mengunci rasa segar sehingga 7 hari."],
        ["Delivers Freshness Evenly & Faster", "Kesegaran rata dan lebih pantas", "Minuman lebih sejuk dan makanan lebih segar dengan DoorCooling+™."],
        ["Refresh Your Dispenser Nozzle Every Day", "Segarkan nosel dispenser setiap hari", "Cahaya UV kurangkan *99.99% bakteria pada nosel air secara automatik."],
        ["Enhance Your Décor with an UltraSleek Door", "Pintu UltraSleek tingkatkan dekor", "Pintu UltraSleek terus memperindah dapur."],
        ["Smart Inverter Compressor", "Smart Inverter Compressor", "Teknologi Smart Inverter Compressor tingkatkan kecekapan tenaga dan bantu anda jimat lebih."],
      ],
    ),
    "top-freezer-refrigerator-gn-f452pqak": pack(
      "LinearCooling™ kurangkan turun naik suhu, mengunci rasa segar sehingga 7 hari.",
      [
        ["Seals in Farm Freshness Longer", "Kekalkan kesegaran lebih lama", "LinearCooling™ kurangkan turun naik suhu, mengunci rasa segar sehingga 7 hari."],
        ["Delivers Freshness Evenly & Faster", "Kesegaran rata dan lebih pantas", "Makanan kekal segar dan minuman sejuk di mana-mana rak dengan penyejukan rata yang lebih pantas."],
        ["Minimize Bacteria and Odors, Maximize Freshness", "Kurangkan bakteria dan bau", "Hygiene Fresh nyahbau dan buang sehingga 99.99% bakteria."],
        ["Save Defrosting Time", "Jimat masa nyahbeku", "Laci khas mengekalkan daging dan ikan tanpa beku dan nyahbeku berulang."],
        ["The Smarter Way to Cool", "Cara menyejuk yang lebih pintar", "Smart Fresh Air belajar corak penggunaan untuk optimumkan penyejukan."],
        ["Step 1. Smart Fresh Air Algorithm", "Langkah 1. Algoritma Smart Fresh Air", "Smart Fresh Air analisis corak penggunaan selama 3 minggu untuk optimumkan prestasi."],
      ],
    ),
    "side-by-side-refrigerator-gc-b257kljr": pack(
      "Garisan bersih dan engsel tersembunyi menjadikan peti ini sentuhan chic untuk dapur anda.",
      [
        ["A touch of sophistication", "Sentuhan canggih", "Garisan bersih dan engsel tersembunyi menjadikan peti ini sentuhan chic untuk dapur anda."],
        ["Seals in farm freshness longer", "Kekalkan kesegaran lebih lama", "Sistem Multi-Air-Flow mengelilingi makanan dengan udara sejuk dari pelbagai sudut."],
        ["Flexible freshness", "Kesegaran fleksibel", "Susun makanan pada suhu optimum dengan memisahkannya ke kawasan storan."],
        ["Durable and energy-saving", "Tahan lasak dan jimat tenaga", "LG Smart Inverter Compressor™ periksa keperluan penyejukan dalaman secara pintar."],
        ["Energy efficient & durable", "Cekap tenaga dan tahan lasak", "LG Smart Inverter Compressor™ bantu jimat lebih dengan ketenangan 10 tahun."],
      ],
    ),
    "quadwash-steam-dishwasher-dfc335hm": pack(
      "TrueSteam™ membilas pinggan dan longgarkan makanan yang melekat.",
      [
        ["Save time with steam pre-wash", "Jimat masa dengan pra-basuh stim", "TrueSteam™ membilas pinggan dan longgarkan makanan yang melekat."],
        ["Cleaning power in the right places", "Kuasa cuci di tempat yang betul", "Tetapkan keamatan air rak atas dan bawah berasingan — basuh kaca dengan lembut dan periuk dengan teliti dalam satu muatan."],
        ["More cleaning options at your fingertips", "Lebih banyak pilihan cuci", "Muat turun praset kitaran baharu dari aplikasi LG ThinQ™."],
        ["Safe and hygienic", "Selamat dan bersih", "TrueSteam™ cuci pinggan dengan stim tulen untuk keluarga anda."],
        ["Powerful and gentle cleaning", "Cuci berkuasa dan lembut", "QuadWash™ guna empat lengan berbilang arah; Dual Zone Wash benarkan tekanan berbeza setiap rak."],
        ["Flexible loading options", "Pemuatan fleksibel", "EasyRack™ Plus dengan rak atas boleh laras ketinggian dan rak bawah dengan gigi boleh lipat."],
      ],
    ),
    "lg-oled-ai-4k-tv": pack(
      "Dengan Gallery Mode, TV terus jimat tenaga sambil memaparkan karya seni pilihan anda.",
      [
        ["Switch from TV to artwork seamlessly", "Tukar dari TV ke karya seni dengan lancar", "Gallery Mode membolehkan TV jimat tenaga sambil memaparkan karya seni dan menambah gaya pada ruang anda."],
        ["Optimal brightness in any light", "Kecerahan optimum dalam sebarang cahaya", "Kawalan kecerahan menyesuaikan output skrin mengikut cahaya persekitaran."],
        ["Responsive to your presence", "Responsif kepada kehadiran anda", "Pengesanan gerakan menukar mod mengikut sama ada anda berhampiran."],
        ["4K upscaling refines every frame for stunning visual quality", "Peningkatan 4K perhalusi setiap bingkai", "AI Super Upscaling perhalusi kualiti imej sehingga 4K; Dynamic Tone Mapping Pro seimbangkan kecerahan dan perincian."],
        ["Hear voices clearly in every scene with AI Object Remastering Pro", "Dengar suara jelas dengan AI Object Remastering Pro", "Tidak perlu laras volume untuk dengar suara dengan jelas."],
        ["Immersive and room-filling sound with Virtual 11.1.2 Ch", "Bunyi immersif Virtual 11.1.2 Ch", "AI Sound hasilkan audio berbilang dimensi yang mengelilingi anda."],
      ],
    ),
    "lg-qned-evo-ai-mini-led": pack(
      "AI Super Upscaling perhalusi kualiti imej sehingga 4K; Dynamic Tone Mapping Pro seimbangkan kecerahan dan perincian setiap objek.",
      [
        ["4K upscaling refines every frame for stunning visual quality", "Peningkatan 4K perhalusi setiap bingkai", "AI Super Upscaling perhalusi kualiti imej sehingga 4K; Dynamic Tone Mapping Pro seimbangkan kecerahan dan perincian."],
        ["Hear voices clearly in every scene with AI Object Remastering Pro", "Dengar suara jelas dengan AI Object Remastering Pro", "Tidak perlu laras volume untuk dengar suara dengan jelas."],
        ["Immersive and room-filling sound with Virtual 11.1.2 Ch", "Bunyi immersif Virtual 11.1.2 Ch", "AI Sound hasilkan audio berbilang dimensi yang mengelilingi anda."],
        ["Upgrade every frame to HDR quality", "Naik taraf setiap bingkai ke kualiti HDR", "AI optimumkan warna, kecerahan dan kontras, menaikkan SDR ke tahap HDR."],
        ["Advanced Multi AI search with Google Gemini and Microsoft Copilot", "Carian Multi AI dengan Google Gemini dan Microsoft Copilot", "Sebut apa yang dicari, kemudian pilih model AI yang sesuai."],
        ["Knowing the problem before you ask", "Tahu masalah sebelum anda tanya", "Apabila TV menunjukkan tanda masalah, sistem beri panduan langkah demi langkah di skrin."],
      ],
    ),
    "lg-nano-4k-uhd-ai-tv": pack(
      "4K Super Upscaling tingkatkan kejelasan visual; Dynamic Tone Mapping laras kecerahan dan kontras setiap bingkai.",
      [
        ["4K upscaling refines every frame for enhanced visual quality", "Peningkatan 4K untuk visual lebih jelas", "4K Super Upscaling hasilkan 4K yang semula jadi; Dynamic Tone Mapping laras kecerahan dan kontras."],
        ["Immersive, surround sound with Virtual 9.1.2 Ch", "Bunyi surround Virtual 9.1.2 Ch", "AI Sound analisis dan tingkatkan audio untuk pengalaman seperti surround tanpa speaker tambahan."],
        ["Advanced Multi AI search with Google Gemini and Microsoft Copilot", "Carian Multi AI dengan Google Gemini dan Microsoft Copilot", "Sebut apa yang dicari, kemudian pilih model AI yang sesuai."],
        ["Knowing the problem before you ask", "Tahu masalah sebelum anda tanya", "Apabila TV menunjukkan tanda masalah, sistem beri panduan langkah demi langkah di skrin."],
        ["Making your picture, your way", "Gambar mengikut cara anda", "Algoritma maju belajar keutamaan anda."],
        ["Making your sound, your way", "Bunyi mengikut cara anda", "TV menyesuaikan bunyi kepada keutamaan pendengaran anda."],
      ],
    ),
  },
  cn: {
    "atom-u-undersink-water-purifier-wu525bs": pack(
      "产品每小时自动对水龙头内部杀菌 10 分钟，提升卫生。",
      [
        ["Cleaning round the clock", "全天候清洁", "产品每小时自动对水龙头内部杀菌 10 分钟，提升卫生。"],
        ["Clean, strictly filtered water", "严格过滤的洁净水", "内置多级过滤，减少重金属与诺如病毒，出水品质更高。"],
        ["WQA-certified All Puri Filter system", "WQA 认证 All Puri Filter", "微塑料过滤高达 99.8%，获 Water Quality Association（WQA）认证。"],
        ["Dispense as much as you want", "按需取水", "一键取用所需水量，方便省心。"],
        ["With preset temperatures, Easy access to hot and cold water", "预设温度，冷热即取", "一键取用冷水，以及 40℃、75℃、85℃ 预设热水。"],
        ["Filter replacement notifications", "滤芯更换提醒", "智能清洁指示灯会在该换滤芯时提醒您。"],
      ],
    ),
    "puricare-tankless-water-purifier-wd518an": pack(
      "多种颜色与风格可选。智能功能会学习您的使用偏好。",
      [
        ["Designed for your home", "为家而设计", "多种颜色与风格，按喜好选择。"],
        ["Experience convenience", "尽享便利", "智能功能会学习您的使用偏好。"],
        ["Hygiene built-in", "卫生内置于设计", "喝到纯净水，更安心。"],
        ["LG ThinQ™ connection", "LG ThinQ™ 连接", "用 LG ThinQ™ 应用监测并控制产品。"],
        ["A Style for everyone", "总有一款适合你", "浏览全部颜色与风格，找到最衬空间与品味的那一款。"],
        ["Flexible installation", "安装更灵活", "大小空间都适合；出水布局可按需要调整。"],
      ],
    ),
    "puricare-tankless-water-purifier-wd516an": pack(
      "长按机身顶部内部杀菌与出水口杀菌按钮 3 秒以上。",
      [
        ["high-temperature sterilization", "高温杀菌", "长按机身顶部内部杀菌与出水口杀菌按钮 3 秒以上。"],
        ["Easy Filter Replacement", "滤芯更换简单", "按周期寄到的滤芯，更换方便。"],
        ["Just twist and pull to quickly replace the filter", "拧转拉开即可换芯", "拧转拉开，换上新滤芯。"],
        ["A new filter is shipped to your doorstep every six months", "每六个月寄送新滤芯", "订阅服务每六个月把新滤芯寄到家。"],
        ["Automatic high-temperature sterilization of water pipes and outlet", "水管与出水口高温自动杀菌", "高温自动杀菌，不必额外支付上门服务费。"],
        ["UV sterilization for pure water to the last drop", "UV 杀菌至最后一滴", "出水口内部每小时自动 UV 杀菌，也可随时手动启动。"],
      ],
    ),
    "puricare-360-double-booster-as10gdby0": pack(
      "经英国过敏基金会认证，可通过滤尘减少致敏物质。",
      [
        ["Certified by BAF", "BAF 认证", "经英国过敏基金会认证，可通过滤尘减少致敏物质。"],
        ["Purify the Air All Around You", "净化四周空气", "LG PuriCare™ 360˚ 全向净化，放在哪里都能覆盖。"],
        ["Fresh air spreads faster and farther", "新鲜空气传得更远更快", "相比无 Clean Boost 机型，洁净空气传送更远，速度快约 24%。"],
        ["Breathe freely, live joyfully with pets", "与宠物同住也能畅快呼吸", "LG Pet Care 有效应对宠物气味与毛发。"],
        ["Better air. Less pet hair", "空气更好，毛发更少", "Pet Mode 针对低处毛发，多捕捉 35%。"],
        ["Comfort in every breath with Allergy Care", "Allergy Care，每一口都安心", "UVnano 与离子发生器结合，去除 99.9% 细菌并中和有害物质。"],
      ],
    ),
    "puricare-360-single-booster-as65gdby0": pack(
      "经英国过敏基金会认证，可通过滤尘减少致敏物质。",
      [
        ["Certified by BAF", "BAF 认证", "经英国过敏基金会认证，可通过滤尘减少致敏物质。"],
        ["Purify the air all around you", "净化四周空气", "LG PuriCare™ 360˚ 全向净化，放在哪里都能覆盖。"],
        ["Fresh air spreads faster and farther", "新鲜空气传得更远更快", "相比无 Clean Boost 机型，洁净空气传送更远，速度快约 24%。"],
        ["Breathe freely, live joyfully with pets", "与宠物同住也能畅快呼吸", "LG Pet Care 有效应对宠物气味与毛发。"],
        ["Better air. Less pet hair", "空气更好，毛发更少", "Pet Mode 针对低处毛发，多捕捉 35%。"],
        ["Comfort in every breath with Allergy Care", "Allergy Care，每一口都安心", "UVnano 与离子发生器结合，去除 99.9% 细菌并中和有害物质。"],
      ],
    ),
    "puricare-360-hit-pet-version-as60ghbto": pack(
      "Pet Mode 以精准气流针对低处毛发，多捕捉 35%，家更清新。",
      [
        ["Better air. Less pet hair", "空气更好，毛发更少", "Pet Mode 以精准气流针对低处毛发，多捕捉 35%。预过滤网更换方便。"],
        ["Minimize pet odor. Maximize fresh air", "减少宠物味，增加新鲜空气", "光催化滤网在光照加持下，可多应对 55% 宠物气味。"],
        ["Give your air a deep clean", "给空气做一次深清洁", "Allergy Care 减少细菌、病毒、超细粉尘、过敏原及有害气体。"],
        ["Clean air with Multi-Filtration System", "多重过滤洁净空气", "多重过滤捕捉并去除 99.9% 有害微粒——细菌、病毒、灰尘、过敏原与气味。"],
        ["Certified by BAF", "BAF 认证", "BAF 认证滤网涂层可去除空气中尘螨、真菌与霉菌等过敏原。"],
        ["Tested by FITI 1)", "FITI 测试", "抗菌 99.9% — 金黄色葡萄球菌 / 肺炎克雷伯菌 / 大肠杆菌。"],
      ],
    ),
    "puricare-aerobooster-pet-version-as55ggsyo": pack(
      "气流比标准机型强 76.9%，捕捉宠物毛发与气味，保持家居清新。",
      [
        ["Air quality enhanced for pet-friendly living", "更适合有宠物的空气质量", "气流比标准机型强 76.9%，捕捉宠物毛发与气味。"],
        ["Pet-friendly air with light-powered freshness", "光能加持的宠物友好空气", "光催化宠物滤网。"],
        ["Clean air with a multi-filtration system", "多重过滤洁净空气", "HEPA 滤网减少灰尘、超细颗粒、病菌、病毒、气味、霉菌与细菌。"],
        ["Clean fans for clean air", "风扇洁净，空气才洁净", "UVnano 光可去除扇叶表面 99.998% 有害细菌。"],
        ["Leaves your space free from bacteria", "空间更少细菌", "离子发生器中和有害物质，环境更健康。"],
        ["Lighting to match your mood", "灯光随心情", "按心情自定义灯光。"],
      ],
    ),
    "puricare-aeromini-as30ggw10": pack(
      "Aero H 滤网去除 99.999% 小至 0.01 µm 的超细粉尘，以及 99.8% 细菌、98.5% 病毒与 99.9% 空气霉菌。",
      [
        ["Multi-filtration for fresh air", "多重过滤带来新鲜空气", "Aero H 滤网去除 99.999% 小至 0.01 µm 的超细粉尘，以及 99.8% 细菌、98.5% 病毒与 99.9% 空气霉菌。"],
        ["Contemporary design to complement your space", "当代设计融入空间", "纤薄极简，自然融入各类空间。"],
        ["Compact in size, light on space", "体积紧凑，少占地面", "占地少约 21%，高度低约 30%，比传统 360˚ Hit 更易摆放。"],
        ["Purifying your space in every direction", "全方位净化空间", "儿童房、卧室或家庭办公，都能 360° 净化。"],
        ["Quiet comfort, even in motion", "运行也安静", "仅 26dB，学习或静心时也不打扰。"],
        ["Smart living begins with LG ThinQ™", "智能生活从 LG ThinQ™ 开始", "用 LG ThinQ™ 应用实时监测空气质量并控制净化器。"],
      ],
    ),
    "puricare-aerocat-tower-as25gcbzo": pack(
      "UVnano 光可去除扇叶上超过 99.99% 的有害细菌与病毒。",
      [
        ["Care for hidden areas", "照顾隐藏角落", "UVnano 光可去除扇叶上超过 99.99% 的有害细菌与病毒。"],
        ["Easily replaceable for clean, fresh air", "易更换，空气保持清新", "捕捉宠物毛发与灰尘等大颗粒，可清洗或更换以保持性能。"],
        ["Sensing warmth mode", "感应温暖模式", "仅在猫咪坐下时加热，按预设计时提供温暖。"],
        ["A warm, inviting space for your cat", "给猫咪的温暖角落", "两档加热，专为猫咪舒适设计。"],
        ["Air purification system for pet-friendly homes", "适合有宠家庭的净化系统", "减少猫毛、过敏原与气味。"],
        ["Strong when needed, silent for your cat", "需要时强力，猫咪使用时安静", "强力净化，猫咪休息时安静运行。"],
      ],
    ),
    "lg-styler-steam-clothing-care-s3wf": pack(
      "只需 20 分钟，LG Styler™ 即可减少衣物异味与皱褶，呵护面料如同阳光晾晒。",
      [
        ["Shakes Off Wrinkles & Odours as Fast as 20 Minutes", "20 分钟抚平皱褶与异味", "只需 20 分钟，LG Styler™ 即可减少衣物异味与皱褶，呵护面料如同阳光晾晒。"],
        ["Eliminates 99.9% Viruses, Bacteria, and Allergens", "去除 99.9% 病毒、细菌与过敏原", "TrueSteam™ 驱动的 Sanitize 程序，有助于减少衣物、床品、运动装甚至儿童毛绒玩具上的过敏原、细菌与病毒。"],
        ["Keep Your Precious Items Dry And Clean At All Times", "珍爱单品随时干爽洁净", "低温烘干系统比自然晾干更快，温和烘干内衣与毛衣等娇贵面料。"],
        ["Smart Custom Cycles for Your Fashion Pieces", "为时尚单品定制智能程序", "专业护理不适合普通洗衣机与干衣机处理的珍贵衣物。"],
        ["Smoothens Wrinkles & Get Crisp Crease in Your Pants", "抚平皱褶，保持裤线笔挺", "快速减少皱褶，同时保持裤线清晰。"],
        ["Easily Monitor And Control Your LG Styler™ At Your Fingertips", "指尖掌控 LG Styler™", "ThinQ™ Wi-Fi 可远程控制，并下载不同面料的附加程序。"],
      ],
    ),
    "lg-massage-recliner-mh21rry": pack(
      "脚凳可作为脚托，翻转后变成带收纳的迷你桌。用 LG Massage Recliner 重新定义放松。",
      [
        ["Footrest and mini-table in one", "脚托与迷你桌一体", "脚凳与躺椅结合为脚托，翻转后成为带收纳的迷你桌。"],
        ["Ergonomic comfort designed for your body", "按身形设计的人体工学舒适", "Body-Fit 系统（S&L 框架）。"],
        ["Redesign your relaxation", "重新定义放松", "用 LG Massage Recliner 享受新的放松方式。"],
        ["Helps you unwind after a long day with brainwave sounds​", "脑波音助你结束漫长一天", "脑波音帮助减压，配合冥想呼吸与按摩放松肌肉。"],
        ["Brainwave sounds that help you relax for better rest", "脑波音帮助更好休息", "脑波放松音配合轻柔全身按摩，有助更容易入睡。"],
        ["Cozy up to warmth and comfort", "温暖舒适相伴", "腰部柔和温热，按摩时更放松。"],
      ],
    ),
    ...share(["dualcool-ai-s3-q120agzb", "dualcool-ai-s3-q2412gzc"], cnDualcoolAi),
    ...share(["artcool-mirror-s3-q12jarpa", "artcool-mirror-s3-q24k2rpa"], cnArtcool),
    ...share(["dualcool-s3-q09jaypp", "dualcool-s3-q18kaypa"], cnDualcoolApp),
    ...share(["dualcool-s3-q12jaypp", "dualcool-s3-q24klypa"], cnDualcoolClassic),
    ...share(["front-loader-washing-machine-fx1412s5gr", "front-loader-washing-machine-f2520snekr"], cnFront),
    "washer-dryer-f2515rntkar": pack(
      "洗烘一体，节省空间，把房间留给家人。",
      [
        ["Washer and Dryer in One", "洗衣烘干一体", "LG 洗烘一体机节省空间，把房间留给家人。"],
        ["Fit your washer into your life", "更好地融入生活", "机身深仅 645mm，多省 125mm 空间，洗涤容量不打折。"],
        ["Level up your laundry", "洗衣体验升级", "先进技术实现紧凑机身，更大更薄的内筒带来更多洗涤空间。"],
        ["Take the guesswork out of washing and let AI DD™", "交给 AI DD™ 选择洗程", "AI 选择合适洗程，减少衣物损伤。"],
        ["Get Fresh Laundry in just 39 minutes", "39 分钟洗净清新", "TurboWash™ 360 四向喷水，短时间深层清洁。"],
        ["Experience Reduced Noise and Vibrations", "更低噪音与震动", "震动传感器让洗衣过程更安静。"],
      ],
    ),
    "lg-washtower-wt2520nhegr": pack(
      "用 LG Objet WashTower™ 让洗衣空间更有风格。",
      [
        ["Built for Performance, Styled By You", "性能到位，风格由你", "用 LG Objet WashTower™ 装点空间。"],
        ["Laundry Room", "洗衣空间", "LG Objet WashTower™ 让洗衣区更有设计感。"],
        ["Easy Reach Control Panel", "触手可及的控制面板", "中央面板同时控制洗衣与烘干，位置更顺手。"],
        ["AI DD™", "AI DD™", "Auto Sense AI DD™ 识别最适合的运动方式，呵护衣物。"],
        ["Smart Pairing™", "Smart Pairing™", "洗完的衣服按最佳烘干程序继续烘干。"],
        ["Get It All Done and Then Some", "一次完成更多", "数分钟彻底洗净，同时保护面料。"],
      ],
    ),
    "lg-washtower-wt1410nhb": pack(
      "LG WashTower™ 是一体式洗烘方案：快、易、智能、有型。",
      [
        ["Integrated, Intelligent Laundry Solution", "一体智能洗衣方案", "LG WashTower™ 是一体式洗烘方案：快、易、智能、有型。"],
        ["A Tower of Laundry Innovation", "洗衣创新之塔", "内置智能识别最佳洗烘程序。"],
        ["Take Control with Center Control", "中央控制更顺手", "一体控制面板就在触手可及处。"],
        ["AI DD™", "AI DD™", "Auto Sense AI DD™ 识别最适合的运动方式，呵护衣物。"],
        ["Smart Paring™", "Smart Pairing™", "洗完的衣服按最佳烘干程序继续烘干。"],
        ["Get It All Done and Then Some", "一次完成更多", "30 分钟彻底洗净，同时保护面料。"],
      ],
    ),
    "lg-top-loader-tv2520sv9kr": pack(
      "按每筒衣物的重量与面料类型自动优化运动。",
      [
        ["Intelligent Care of 24% More Fabric Protection", "面料保护提升 24% 的智能呵护", "按每筒衣物的重量与面料类型自动优化运动。"],
        ["Quiet Operator", "安静运行", "4 个垂直减震、2 个水平减震与 1 个震动传感器平衡震动与转速。"],
        ["A Powerful Clean in 39 Minutes", "39 分钟强力洗净", "LG TurboWash 让衣物 39 分钟洁净清新。"],
        ["Same Size on the Outside, Bigger Capacity in the Inside", "外观同尺寸，内部更大容量", "最大化内部空间，获得更大内桶。"],
        ["A Larger Lint Filter Keeps the Tub and Your Clothes Cleaner", "更大绒屑网，桶与衣更干净", "更大绒屑网在灰尘脱离衣物时保持洗衣与内筒更洁净。"],
        ["Enjoy Fresher Fabrics for Longer", "面料清香更持久", "柔顺剂在洗涤过程中深入纤维。"],
      ],
    ),
    "lg-top-loader-tx2522at9gr": pack(
      "Pulsator Dynamic 左右强力波轮，洗涤更彻底。",
      [
        ["Power motion", "强力波轮", "Pulsator Dynamic 左右强力波轮，洗涤更彻底。"],
        ["Wash cycles tailored to your laundry habits", "按洗衣习惯优化程序", "自动选择常用程序，节省洗衣时间。"],
        ["Control your laundry anytime, anywhere", "随时随地掌控洗衣", "ThinQ 应用可远程连接洗衣机。"],
        ["AI-enhanced washing powered by AI DD™", "AI DD™ 智能洗涤", "AI Wash 按衣物类型优化洗涤运动。"],
        ["An optimal way to wash", "更优洗涤方式", "LG Inverter Direct Drive™ 电机配合六种程序，洗净更彻底。"],
        ["A powerful yet gentle clean in 30 min", "30 分钟强力且温和洗净", "LG TurboWash™ 强力而温和，用更短时间完成更多。"],
      ],
    ),
    "lg-dual-inverter-heat-pump-dryer-rx10vhp3kr": pack(
      "凭借 AI DUAL Inverter 与智能算法，显著降低能耗。",
      [
        ["Experience a new standard of laundry in energy class A+++-10%", "能效等级 A+++-10% 的新标准", "凭借 AI DUAL Inverter 与智能算法，显著降低能耗。"],
        ["Cycles tailored to usage habits", "按使用习惯定制程序", "常用程序会与 13 个默认程序一起保存，贴合个人烘干习惯。"],
        ["No manual cleaning required for the condenser", "冷凝器无需手动清洁", "自动清洗冷凝器，把时间留给别的事。"],
        ["Wash and dry in sync", "洗烘同步", "Smart Pairing 让洗衣机通知干衣机选择匹配程序。"],
        ["Control your laundry anytime, anywhere", "随时随地掌控洗衣", "LG ThinQ™ 应用连接干衣机。"],
        ["AI-enhanced optimal drying", "AI 优化烘干", "AI Dry 按面料类型与负载量优化烘干，更省时省电。"],
      ],
    ),
    "instaview-french-door-gv-k25ffger": pack(
      "层架与抽屉的银色点缀，让内部更有高级感。",
      [
        ["Kitchen refined, with premium design", "精致厨房，高端设计", "Premium Flat Mirror 外观。"],
        ["Metallic trim for a stylish look", "金属饰条更有型", "层架与抽屉的银色点缀，内部更显高级。"],
        ["Fresh food with fresh saving", "食物保鲜，用电更省", "LG Smart Inverter Compressor™ 按需调节电机转速以节省能源。"],
        ["Temperature set by food type", "按食物类型设定温度", "肉类、鱼类与蔬菜可按合适温度存放。"],
        ["Reduces bacteria3) and odors, increases freshness", "减少细菌与异味，提升新鲜度", "Hygiene Fresh⁺™ 除味，并减少高达 99.999% 细菌。"],
        ["Keep your cool from anywhere with LG ThinQ®", "随时用 LG ThinQ® 掌控", "LG ThinQ® 为家电提供智能方案，家居更便利。"],
      ],
    ),
    "side-by-side-refrigerator-gc-j257sqnw": pack(
      "Door-in-Door™ 隐藏按键，方便取用常吃的食物。",
      [
        ["Quick & Easy Access to Your Favorites", "常吃的食物更快拿到", "Door-in-Door™ 隐藏按键，方便取用常吃的食物。"],
        ["Seals in Farm Freshness Longer", "更长久锁住新鲜", "LinearCooling™ 减少温度波动，锁住新鲜风味长达 7 天。"],
        ["Delivers Freshness Evenly & Faster", "更均匀、更快的新鲜", "DoorCooling+™ 让饮料更冰、食物更新鲜。"],
        ["Refresh Your Dispenser Nozzle Every Day", "出水口每天保持洁净", "UV 光自动减少出水口 *99.99% 细菌。"],
        ["Enhance Your Décor with an UltraSleek Door", "UltraSleek 门板提升装修感", "UltraSleek 门板立刻提升厨房气质。"],
        ["Smart Inverter Compressor", "Smart Inverter Compressor", "Smart Inverter Compressor 技术进一步提升能效，帮您更省电。"],
      ],
    ),
    "top-freezer-refrigerator-gn-f452pqak": pack(
      "LinearCooling™ 减少温度波动，锁住新鲜风味长达 7 天。",
      [
        ["Seals in Farm Freshness Longer", "更长久锁住新鲜", "LinearCooling™ 减少温度波动，锁住新鲜风味长达 7 天。"],
        ["Delivers Freshness Evenly & Faster", "更均匀、更快的新鲜", "各层食物保持新鲜，饮料更快变冰。"],
        ["Minimize Bacteria and Odors, Maximize Freshness", "减少细菌与异味", "Hygiene Fresh 除味，并去除高达 99.99% 细菌。"],
        ["Save Defrosting Time", "节省解冻时间", "专用抽屉更好保存肉类与鱼类，减少结霜与反复解冻。"],
        ["The Smarter Way to Cool", "更聪明的制冷方式", "Smart Fresh Air 学习使用习惯，高峰时段也能优化制冷。"],
        ["Step 1. Smart Fresh Air Algorithm", "步骤 1. Smart Fresh Air 算法", "Smart Fresh Air 分析约 3 周的使用习惯以优化制冷。"],
      ],
    ),
    "side-by-side-refrigerator-gc-b257kljr": pack(
      "利落线条与隐藏铰链，为厨房增添一份利落气质。",
      [
        ["A touch of sophistication", "一份精致感", "利落线条与隐藏铰链，为厨房增添一份利落气质。"],
        ["Seals in farm freshness longer", "更长久锁住新鲜", "Multi-Air-Flow 从多角度包围食物，保持更鲜更冷。"],
        ["Flexible freshness", "灵活保鲜", "按最佳温度分区存放各类食物。"],
        ["Durable and energy-saving", "耐用又节能", "LG Smart Inverter Compressor™ 智能检测箱内制冷需求。"],
        ["Energy efficient & durable", "高效节能且耐用", "LG Smart Inverter Compressor™ 进一步提升能效，并带来 10 年安心。"],
      ],
    ),
    "quadwash-steam-dishwasher-dfc335hm": pack(
      "TrueSteam™ 预洗冲散、松动顽固残渣。",
      [
        ["Save time with steam pre-wash", "蒸汽预洗更省时", "TrueSteam™ 预洗冲散、松动顽固残渣。"],
        ["Cleaning power in the right places", "清洗力度用在对的地方", "上、下碗篮可分别设定水压，一杯轻柔洗杯、强力刷锅同机完成。"],
        ["More cleaning options at your fingertips", "更多清洗选项随手可得", "从 LG ThinQ™ 应用下载新的洗涤预设。"],
        ["Safe and hygienic", "安全卫生", "TrueSteam™ 以纯蒸汽清洁餐具，全家更安心。"],
        ["Powerful and gentle cleaning", "强力且温和", "QuadWash™ 四臂多向喷洗；Dual Zone Wash 可为每个碗篮选择不同水压。"],
        ["Flexible loading options", "灵活装载", "EasyRack™ Plus 上篮可调高度，下篮齿条可折叠。"],
      ],
    ),
    "lg-oled-ai-4k-tv": pack(
      "开启 Gallery Mode 后，电视在展示所选画作时仍可继续节能，为空间增添格调。",
      [
        ["Switch from TV to artwork seamlessly", "电视与画作无缝切换", "开启 Gallery Mode 后，展示画作时仍可节能，为空间增添格调。"],
        ["Optimal brightness in any light", "任何光线下都舒适", "亮度控制按环境光自动调节屏幕输出。"],
        ["Responsive to your presence", "感应你是否在场", "动作侦测让电视按您是否靠近智能切换模式。"],
        ["4K upscaling refines every frame for stunning visual quality", "4K 超分让每一帧更精细", "AI Super Upscaling 将画质提升至 4K；Dynamic Tone Mapping Pro 平衡每帧亮度与细节。"],
        ["Hear voices clearly in every scene with AI Object Remastering Pro", "AI Object Remastering Pro 让对白更清晰", "不必反复调音量也能听清人声。"],
        ["Immersive and room-filling sound with Virtual 11.1.2 Ch", "Virtual 11.1.2 声道环绕沉浸", "AI Sound 打造环绕般的多维声音。"],
      ],
    ),
    "lg-qned-evo-ai-mini-led": pack(
      "AI Super Upscaling 将画质提升至 4K；Dynamic Tone Mapping Pro 平衡每帧每个对象的亮度与细节。",
      [
        ["4K upscaling refines every frame for stunning visual quality", "4K 超分让每一帧更精细", "AI Super Upscaling 将画质提升至 4K；Dynamic Tone Mapping Pro 平衡每帧亮度与细节。"],
        ["Hear voices clearly in every scene with AI Object Remastering Pro", "AI Object Remastering Pro 让对白更清晰", "不必反复调音量也能听清人声。"],
        ["Immersive and room-filling sound with Virtual 11.1.2 Ch", "Virtual 11.1.2 声道环绕沉浸", "AI Sound 打造环绕般的多维声音。"],
        ["Upgrade every frame to HDR quality", "将每一帧提升到 HDR 画质", "AI 自动优化色彩、亮度与对比度，把 SDR 提升到更接近 HDR 的效果。"],
        ["Advanced Multi AI search with Google Gemini and Microsoft Copilot", "Google Gemini 与 Microsoft Copilot 多 AI 搜索", "说出要找的内容，再选择最适合的 AI 模型。"],
        ["Knowing the problem before you ask", "在你提问前就发现问题", "电视出现异常时，系统会检测问题并在屏幕上逐步指导处理或联系支持。"],
      ],
    ),
    "lg-nano-4k-uhd-ai-tv": pack(
      "4K Super Upscaling 提升画面清晰度；Dynamic Tone Mapping 为每一帧调节亮度与对比。",
      [
        ["4K upscaling refines every frame for enhanced visual quality", "4K 超分提升画面", "4K Super Upscaling 呈现更自然的 4K；Dynamic Tone Mapping 调节每帧亮度与对比。"],
        ["Immersive, surround sound with Virtual 9.1.2 Ch", "Virtual 9.1.2 声道沉浸环绕", "AI Sound 分析并提升音频，即使没有外接音箱也能接近环绕体验。"],
        ["Advanced Multi AI search with Google Gemini and Microsoft Copilot", "Google Gemini 与 Microsoft Copilot 多 AI 搜索", "说出要找的内容，再选择最适合的 AI 模型。"],
        ["Knowing the problem before you ask", "在你提问前就发现问题", "电视出现异常时，系统会检测问题并在屏幕上逐步指导处理或联系支持。"],
        ["Making your picture, your way", "画面按你的方式", "进阶算法学习你的偏好。"],
        ["Making your sound, your way", "声音按你的方式", "电视按听力偏好调节并优化整体音质。"],
      ],
    ),
  },
}

function mapItems(items, overlay, byIndex) {
  if (!items?.length || !overlay?.features?.length) return items
  const bySource = new Map(overlay.features.map((item) => [item.source, item]))
  return items.map((item, index) => {
    const hit = bySource.get(item.title) || (byIndex ? overlay.features[index] : null)
    if (!hit) return item
    return { ...item, title: hit.title, copy: hit.copy || item.copy, iconTitle: item.title }
  })
}

export function localizePdp(lang, productId, { tagline, quickFeatures, stories } = {}) {
  const overlay = FEATURES[lang]?.[productId]
  if (!overlay) return { tagline, quickFeatures, stories }
  return {
    tagline: overlay.tagline || tagline,
    quickFeatures: mapItems(quickFeatures, overlay, true),
    stories: mapItems(stories, overlay, false),
  }
}

export default FEATURES
