/** Initial CMS content migrated from the previous static site. */

export const seedServices = [
  {
    slug: "custom-software",
    icon: "code2" as const,
    sortOrder: 0,
    cardSubtitle: "Pengembangan Software",
    cardTitle: "Custom Software",
    cardDescription:
      "Sistem ERP, manajemen, dan aplikasi enterprise yang dibangun sesuai kebutuhan bisnis unik Anda.",
    title: "Custom Software Development",
    titleID: "Pengembangan Software Custom",
    tagline: "Enterprise systems built precisely for your business",
    taglineID: "Sistem enterprise yang dibangun sesuai kebutuhan bisnis Anda",
    description:
      "Kami mengembangkan perangkat lunak bisnis yang dirancang khusus sesuai kebutuhan operasional perusahaan Anda. Dari sistem ERP, CRM, manajemen gudang, hingga aplikasi internal — kami membangun solusi yang benar-benar bekerja untuk Anda.",
    descEN:
      "We develop business software specifically designed for your company's operational needs. From ERP, CRM, warehouse management to internal applications — we build solutions that truly work for you.",
    features: [
      "Analisis kebutuhan & dokumentasi spesifikasi",
      "Desain arsitektur sistem & database",
      "Pengembangan full-stack (frontend & backend)",
      "Integrasi dengan sistem yang sudah ada",
      "Testing & quality assurance menyeluruh",
      "Deployment & konfigurasi server",
      "Training tim pengguna",
      "Support & maintenance pasca-launch",
    ],
    processSteps: [
      {
        step: "01",
        title: "Discovery",
        description: "Analisis mendalam kebutuhan bisnis dan proses operasional",
      },
      {
        step: "02",
        title: "Design",
        description: "Perancangan arsitektur sistem dan antarmuka pengguna",
      },
      {
        step: "03",
        title: "Development",
        description: "Coding dan pengembangan fitur secara iteratif",
      },
      {
        step: "04",
        title: "Testing",
        description: "Quality assurance dan user acceptance testing",
      },
      { step: "05", title: "Launch", description: "Deployment, training, dan go-live" },
      {
        step: "06",
        title: "Support",
        description: "Maintenance dan dukungan teknis berkelanjutan",
      },
    ],
    technologies: [
      "React",
      "Node.js / Python",
      "PostgreSQL / MySQL",
      "REST API",
      "Docker",
      "Linux Server",
    ],
    waText: "Paket%20Software%20Custom",
    footerNavLabel: "Custom Software Development",
  },
  {
    slug: "web-platform",
    icon: "globe" as const,
    sortOrder: 1,
    cardSubtitle: "Platform Web",
    cardTitle: "Web & Platform Digital",
    cardDescription:
      "Company profile, marketplace, portal berita, dan platform digital komersial yang cepat dan responsif.",
    title: "Web & Platform Digital",
    titleID: "Platform Web & Digital",
    tagline: "Fast, professional websites and digital platforms",
    taglineID: "Website dan platform digital yang cepat dan profesional",
    description:
      "Kami membangun website company profile, portal digital, marketplace, dan platform web komersial yang cepat, responsif, dan dirancang untuk konversi. Dari desain hingga deployment — kami tangani semuanya.",
    descEN:
      "We build company profile websites, digital portals, marketplaces, and commercial web platforms that are fast, responsive, and designed for conversion. From design to deployment — we handle everything.",
    features: [
      "Desain UI/UX custom dan responsif",
      "Website company profile profesional",
      "Marketplace dan platform e-commerce",
      "Portal berita dan CMS (Content Management System)",
      "Optimasi kecepatan & performa (Core Web Vitals)",
      "SEO on-page & technical SEO",
      "Integrasi payment gateway",
      "Analytics dan reporting dashboard",
    ],
    processSteps: [
      { step: "01", title: "Brief", description: "Pengumpulan kebutuhan dan referensi desain" },
      { step: "02", title: "Wireframe", description: "Pembuatan wireframe dan prototype interaktif" },
      { step: "03", title: "Design", description: "Desain visual hi-fidelity final" },
      { step: "04", title: "Development", description: "Coding frontend dan backend" },
      { step: "05", title: "Testing", description: "Uji lintas browser dan perangkat" },
      { step: "06", title: "Launch", description: "Go-live dan optimasi performa" },
    ],
    technologies: ["React / Next.js", "Node.js", "MongoDB / PostgreSQL", "Tailwind CSS", "Nginx", "CDN"],
    waText: "Paket%20Platform%20Digital",
    footerNavLabel: "Web & Platform Digital",
  },
  {
    slug: "mobile-app",
    icon: "smartphone" as const,
    sortOrder: 2,
    cardSubtitle: "Aplikasi Mobile",
    cardTitle: "Mobile Application",
    cardDescription:
      "Aplikasi Android & iOS native dan cross-platform yang intuitif untuk bisnis modern Anda.",
    title: "Mobile Application",
    titleID: "Aplikasi Mobile",
    tagline: "Native and cross-platform apps for Android & iOS",
    taglineID: "Aplikasi Android & iOS native dan cross-platform",
    description:
      "Kami mengembangkan aplikasi mobile Android dan iOS yang intuitif, performa tinggi, dan sesuai standar App Store dan Google Play Store. Dari ide hingga rilis — kami wujudkan aplikasi impian bisnis Anda.",
    descEN:
      "We develop intuitive, high-performance Android and iOS mobile applications that meet App Store and Google Play Store standards. From concept to release — we make your business app a reality.",
    features: [
      "Aplikasi Android & iOS (cross-platform)",
      "UI/UX design custom untuk mobile",
      "Integrasi REST API dan backend",
      "Push notification & in-app messaging",
      "Autentikasi (OTP, biometric, social login)",
      "Offline mode dan local storage",
      "Upload ke App Store & Google Play Store",
      "3 bulan maintenance pasca-rilis",
    ],
    processSteps: [
      { step: "01", title: "Research", description: "Riset pengguna dan analisis kompetitor" },
      { step: "02", title: "UX Design", description: "User flow, wireframe, dan prototype" },
      { step: "03", title: "UI Design", description: "Desain visual komponen dan screen" },
      { step: "04", title: "Development", description: "Coding aplikasi dan integrasi API" },
      { step: "05", title: "QA Testing", description: "Testing di berbagai perangkat fisik" },
      { step: "06", title: "Publish", description: "Submit ke App Store & Play Store" },
    ],
    technologies: ["React Native", "Flutter", "iOS (Swift)", "Android (Kotlin)", "Firebase", "REST API"],
    waText: "Paket%20Aplikasi%20Mobile",
    footerNavLabel: "Mobile Application",
  },
  {
    slug: "it-consulting",
    icon: "monitor-cog" as const,
    sortOrder: 3,
    cardSubtitle: "Konsultasi IT",
    cardTitle: "IT Consulting",
    cardDescription:
      "Audit sistem, perencanaan infrastruktur IT, dan strategi transformasi digital bisnis Anda.",
    title: "IT Consulting",
    titleID: "Konsultasi IT",
    tagline: "Strategic IT planning and digital transformation",
    taglineID: "Perencanaan IT strategis dan transformasi digital",
    description:
      "Kami membantu bisnis Anda merencanakan dan mengeksekusi strategi IT yang tepat. Dari audit sistem, perencanaan infrastruktur, hingga roadmap transformasi digital — kami adalah mitra IT terpercaya Anda.",
    descEN:
      "We help your business plan and execute the right IT strategy. From system audits, infrastructure planning, to digital transformation roadmaps — we are your trusted IT partner.",
    features: [
      "Audit sistem dan infrastruktur IT saat ini",
      "Perencanaan arsitektur teknologi bisnis",
      "Roadmap transformasi digital",
      "Evaluasi dan pemilihan teknologi yang tepat",
      "Optimasi proses bisnis berbasis IT",
      "Keamanan data dan cybersecurity dasar",
      "Pelatihan tim internal",
      "Pendampingan implementasi sistem baru",
    ],
    processSteps: [
      {
        step: "01",
        title: "Assessment",
        description: "Audit kondisi IT dan infrastruktur saat ini",
      },
      { step: "02", title: "Analysis", description: "Analisis gap dan peluang perbaikan" },
      { step: "03", title: "Strategy", description: "Penyusunan strategi dan roadmap IT" },
      { step: "04", title: "Proposal", description: "Presentasi rekomendasi dan estimasi biaya" },
      {
        step: "05",
        title: "Implementation",
        description: "Pendampingan eksekusi rencana IT",
      },
      { step: "06", title: "Review", description: "Evaluasi dan optimasi berkelanjutan" },
    ],
    technologies: [
      "Cloud (AWS / GCP)",
      "Linux Server",
      "Network Infrastructure",
      "Security Audit Tools",
      "Project Management",
      "Technical Documentation",
    ],
    waText: "Konsultasi%20IT",
    footerNavLabel: "IT Consulting",
  },
] as const;

export const seedPricing = [
  {
    sortOrder: 0,
    name: "Paket Website Profesional",
    price: "Rp 7.500.000",
    description: "Website company profile modern & responsif",
    features: [
      "Design custom & responsif",
      "5 halaman konten",
      "SEO dasar",
      "1 tahun domain & hosting",
      "Panel admin sederhana",
    ],
    waText: "Paket%20Website%20Profesional",
  },
  {
    sortOrder: 1,
    name: "Paket Aplikasi Mobile",
    price: "Rp 18.000.000",
    description: "Aplikasi Android & iOS custom",
    features: [
      "Android & iOS cross-platform",
      "UI/UX design custom",
      "Integrasi API",
      "3 bulan maintenance",
      "Upload ke App Store/Play Store",
    ],
    waText: "Paket%20Aplikasi%20Mobile",
  },
  {
    sortOrder: 2,
    name: "Paket Software Custom",
    price: "Rp 25.000.000",
    description: "Sistem manajemen enterprise",
    features: [
      "Analisis kebutuhan mendalam",
      "Development full-stack",
      "Database enterprise",
      "Training pengguna",
      "6 bulan support",
    ],
    waText: "Paket%20Software%20Custom",
  },
  {
    sortOrder: 3,
    name: "Paket Platform Digital",
    price: "Rp 12.000.000",
    description: "Portal web komersial & marketplace",
    features: [
      "Multi-user & multi-role",
      "Payment gateway",
      "Dashboard admin",
      "Sistem notifikasi",
      "3 bulan support",
    ],
    waText: "Paket%20Platform%20Digital",
  },
] as const;

export const seedPortfolio = [
  {
    sortOrder: 0,
    title: "SIMRS — Rumah Sakit Regional",
    category: "Custom Software",
    year: "2026",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=60",
  },
  {
    sortOrder: 1,
    title: "Batik Jepara E-Commerce",
    category: "Web Platform",
    year: "2026",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=60",
  },
  {
    sortOrder: 2,
    title: "Koperasi Digital Mobile App",
    category: "Mobile Application",
    year: "2026",
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=60",
  },
  {
    sortOrder: 3,
    title: "ERP Pabrik Furniture Jepara",
    category: "Custom Software",
    year: "2026",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14431b9?auto=format&fit=crop&w=600&q=60",
  },
  {
    sortOrder: 4,
    title: "Portal Berita Jepara Online",
    category: "Web Platform",
    year: "2026",
    imageUrl:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=600&q=60",
  },
  {
    sortOrder: 5,
    title: "Sistem Absensi & Penggajian",
    category: "IT Solution",
    year: "2026",
    imageUrl:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=600&q=60",
  },
] as const;
