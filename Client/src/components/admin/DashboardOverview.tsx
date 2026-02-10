import React, { useEffect, useState } from 'react';
import { Users, Home, Receipt, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import api from '../../utils/api';
import { getSocket } from '../../utils/socketClient';

interface Stats {
  totalUsers: number;
  homeStayers: number;
  normalUsers: number;
  liveAds: number;
  pendingAds: number;
  successfulTransactions: number;
  pendingTransactions: number;
}

interface ChartData {
  date: string;
  users: number;
  ads: number;
  transactions: number;
}

const DashboardOverview = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    homeStayers: 0,
    normalUsers: 0,
    liveAds: 0,
    pendingAds: 0,
    successfulTransactions: 0,
    pendingTransactions: 0
  });
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socket = getSocket();

    socket.on('statsUpdate', (newStats: Stats) => {
      setStats(newStats);
    });

    socket.on('chartUpdate', (newChartData: ChartData[]) => {
      setChartData(newChartData);
    });

    const fetchStats = async () => {
      try {
        const [statsResponse, chartResponse] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/admin/stats/chart')
        ]);
        setStats(statsResponse.data);
        setChartData(chartResponse.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    return () => {
      socket.off('statsUpdate');
      socket.off('chartUpdate');
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          detail={`${stats.homeStayers} Home Stayers · ${stats.normalUsers} Normal Users`}
          color="bg-blue-500"
        />
        <StatCard
          title="Active Ads"
          value={stats.liveAds}
          icon={Home}
          detail={`${stats.pendingAds} pending approval`}
          color="bg-green-500"
        />
        <StatCard
          title="Successful Transactions"
          value={stats.successfulTransactions}
          icon={Receipt}
          detail="Last 30 days"
          color="bg-purple-500"
        />
        <StatCard
          title="Pending Transactions"
          value={stats.pendingTransactions}
          icon={AlertCircle}
          detail="Awaiting completion"
          color="bg-yellow-500"
        />
      </div>

      {/* Activity Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Platform Activity</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => format(new Date(date), 'MMM d')}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
              />
              <Area 
                type="monotone" 
                dataKey="users" 
                stackId="1" 
                stroke="#4F46E5" 
                fill="#4F46E5" 
                fillOpacity={0.2}
                name="New Users"
              />
              <Area 
                type="monotone" 
                dataKey="ads" 
                stackId="2" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.2}
                name="New Ads"
              />
              <Area 
                type="monotone" 
                dataKey="transactions" 
                stackId="3" 
                stroke="#8B5CF6" 
                fill="#8B5CF6" 
                fillOpacity={0.2}
                name="Transactions"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {/* Add real-time activity feed here */}
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  detail: string;
  color: string;
}

const StatCard = ({ title, value, icon: Icon, detail, color }: StatCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-3xl font-bold mt-2">{value.toLocaleString()}</p>
        <p className="text-sm text-gray-500 mt-1">{detail}</p>
      </div>
      <div className={`${color} p-4 rounded-full bg-opacity-10`}>
        <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
  </div>
);

export default DashboardOverview;
