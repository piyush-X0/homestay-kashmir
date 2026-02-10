import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Users, Home, FileText, LayoutDashboard } from 'lucide-react';
import PendingAdsList from '../components/admin/PendingAdsList';

const AdminDashboard = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Pending Ads', href: '/admin/ads', icon: Home },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Reports', href: '/admin/reports', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          </div>
          <nav className="mt-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  } flex items-center px-6 py-3 text-sm font-medium transition-colors`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Routes>
            <Route index element={<DashboardOverview />} />
            <Route path="ads" element={<PendingAdsList />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const DashboardOverview = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Total Users" value="1,234" icon={Users} />
      <StatCard title="Pending Ads" value="12" icon={Home} />
      <StatCard title="Active Listings" value="89" icon={FileText} />
    </div>
  </div>
);

const StatCard = ({ title, value, icon: Icon }: { title: string; value: string; icon: any }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className="bg-indigo-100 p-3 rounded-full">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
    </div>
  </div>
);

const UsersManagement = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Users Management</h2>
    {/* Add user management functionality */}
  </div>
);

const Reports = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Reports</h2>
    {/* Add reports functionality */}
  </div>
);

export default AdminDashboard;