import { ArrowUpRight, ArrowDownRight, Users, DollarSign, Activity, MoreHorizontal } from 'lucide-react';


const COLORS = {
  green: '#48dd84',
  blue: '#48c4dd',
  pink: '#dd48c4',
  bg: '#1a1a2e'
};

const HomePage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-gray-400">Welcome back! Here is your daily performance.</p>
        </div>
        <div className="text-right">
          <button className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition">
            Last 30 Days
          </button>
        </div>
      </div>

      {/* --- BENTO GRID LAYOUT --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* 1REVENUE CHART (*/}
        <div className="lg:col-span-2 bg-[#1e1e2f] border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <DollarSign size={100} color={COLORS.green} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#48dd84] shadow-[0_0_10px_#48dd84]"></span>
              <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Revenue</h3>
            </div>
            <div className="flex items-baseline gap-4 mt-2">
              <h2 className="text-4xl font-bold text-white">$142,390.00</h2>
              <span className="flex items-center text-[#48dd84] bg-[#48dd84]/10 px-2 py-1 rounded-md text-sm font-medium">
                <ArrowUpRight size={16} className="mr-1" /> +12.5%
              </span>
            </div>
          </div>

          {/* Simple SVG Chart Simulation */}
          <div className="mt-8 h-48 w-full flex items-end justify-between gap-2">
            {[40, 65, 50, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
              <div key={i} className="w-full bg-white/5 rounded-t-sm relative group/bar hover:bg-[#48dd84]/20 transition-colors cursor-pointer">
                <div 
                  className="absolute bottom-0 w-full bg-linear-to-t from-[#48dd84]/10 to-[#48dd84] rounded-t-sm transition-all duration-500"
                  style={{ height: `${h}%` }}
                ></div>
                {/* Tooltip on hover */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                  ${h * 1420}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*  ACTIVE USERS  */}
        <div className="bg-[#1e1e2f] border border-white/5 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#48c4dd] rounded-full blur-[80px] opacity-20"></div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#48c4dd] shadow-[0_0_10px_#48c4dd]"></span>
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Active Users</h3>
              </div>
              <Users size={20} className="text-[#48c4dd]" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-1">24,592</h2>
            <p className="text-sm text-gray-500">Live users right now</p>
          </div>

          {/* Users Progress Circles */}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between text-sm mb-1 text-gray-400">
              <span>Desktop</span>
              <span>62%</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-[#48c4dd] w-[62%] shadow-[0_0_15px_#48c4dd]"></div>
            </div>

            <div className="flex justify-between text-sm mb-1 text-gray-400">
              <span>Mobile</span>
              <span>38%</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-[#48c4dd]/50 w-[38%]"></div>
            </div>
          </div>
        </div>

        {/*  HEALTH / CHURN */}
        <div className="bg-[#1e1e2f] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#dd48c4] rounded-full blur-[80px] opacity-10"></div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#dd48c4] shadow-[0_0_10px_#dd48c4]"></span>
              <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Business Health</h3>
            </div>
            <Activity size={20} className="text-[#dd48c4]" />
          </div>

          {/* Circular Stat Simulation */}
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 flex items-center justify-center">
               {/* SVG Circle for Donut Chart */}
               <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-white/5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                  <path className="text-[#dd48c4] drop-shadow-[0_0_5px_rgba(221,72,196,0.5)]" strokeDasharray="96, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
               </svg>
               <span className="absolute text-white font-bold text-lg">96%</span>
            </div>
            <div>
              <p className="text-white font-semibold">Excellent</p>
              <p className="text-xs text-gray-500 mt-1">Churn rate is below 2%. Platform stability is high.</p>
            </div>
          </div>
          
          <div className="mt-6 flex items-center gap-2 text-xs text-[#dd48c4] bg-[#dd48c4]/10 w-fit px-3 py-1.5 rounded-full">
            <ArrowDownRight size={14} /> Churn down 0.4%
          </div>
        </div>

        <div className="lg:col-span-3 bg-[#1e1e2f] border border-white/5 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold">Recent Transactions</h3>
            <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 transition">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-500 text-sm border-b border-white/5">
                  <th className="pb-4 font-medium pl-2">Customer</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium">Date</th>
                  <th className="pb-4 font-medium text-right pr-2">Amount</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { name: "Neon Tech Labs", status: "Success", date: "Today, 14:02", amount: "+$1,200.00", color: "#48dd84" },
                  { name: "CyberSystems Inc", status: "Pending", date: "Yesterday", amount: "$850.00", color: "#48c4dd" },
                  { name: "Future Vision AI", status: "Failed", date: "Oct 24, 2023", amount: "$0.00", color: "#dd48c4" },
                  { name: "Global Grid Ltd", status: "Success", date: "Oct 23, 2023", amount: "+$2,400.00", color: "#48dd84" },
                ].map((item, index) => (
                  <tr key={index} className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                    <td className="py-4 pl-2 font-medium text-white flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                        {item.name.charAt(0)}
                      </div>
                      {item.name}
                    </td>
                    <td className="py-4">
                      <span 
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${item.color}15`, color: item.color }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-400">{item.date}</td>
                    <td className="py-4 text-right pr-2 font-mono text-white">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;