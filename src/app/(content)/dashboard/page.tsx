"use client";


export default function DashboardPage() {
  const stats = [
    { label: "Total Siswa", value: "156", icon: "👨‍🎓", color: "from-blue-400 to-blue-600" },
    { label: "Total Guru", value: "24", icon: "👨‍🏫", color: "from-purple-400 to-purple-600" },
    { label: "Kelas Aktif", value: "8", icon: "🏫", color: "from-green-400 to-green-600" },
    { label: "Kehadiran Hari Ini", value: "92%", icon: "✓", color: "from-orange-400 to-orange-600" },
  ];

  const activities = [
    { title: "Jadwal kelas A1 diubah", time: "10:30", icon: "📅" },
    { title: "Data siswa baru ditambahkan (5 siswa)", time: "09:15", icon: "👥" },
    { title: "Nilai siswa diperbarui untuk pelajaran Matemat", time: "08:45", icon: "📊" },
    { title: "Pengumuman baru: Libur Sekolah", time: "08:00", icon: "📢" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Selamat Datang 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Kelola semua aspek pendidikan TK Ceria Bersama Anda dari sini
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`bg-linear-to-br ${stat.color} p-3 rounded-lg text-xl`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                📋 Aktivitas Terbaru
              </h2>
              <div className="space-y-3">
                {activities.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
                  >
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">
                        {activity.title}
                      </p>
                      <p className="text-gray-500 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              ⚡ Tautan Cepat
            </h2>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-600 font-medium transition-colors">
                📝 Input Data Siswa
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-600 font-medium transition-colors">
                👨‍🏫 Lihat Guru
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 border border-green-200 text-green-600 font-medium transition-colors">
                📊 Laporan Nilai
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-600 font-medium transition-colors">
                📢 Buat Pengumuman
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
