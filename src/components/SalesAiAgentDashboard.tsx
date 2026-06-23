import { useState, useEffect } from 'react';
import { 
  Crown,
  TrendingUp,
  Truck,
  CreditCard,
  Package,
  BrainCircuit,
  Zap,
  ArrowUpRight,
  BarChart,
  ShoppingCart,
  Factory
} from 'lucide-react';
import Layout from './Layout';

export default function SalesAiAgentDashboard({ onBack, onOpenAiAgent = () => {} }: { onBack: () => void, onOpenAiAgent?: (agentId?: string) => void }) {
  const sidebarLinks = [
    { name: 'Elite CEO AI', icon: <Crown size={20} />, onClick: () => onOpenAiAgent('ceo') },
    { name: 'Sales Growth AI', icon: <TrendingUp size={20} />, onClick: () => onOpenAiAgent('sales') },
    { name: 'Logistics Master AI', icon: <Truck size={20} />, onClick: () => onOpenAiAgent('logistics') },
    { name: 'Revenue Recovery AI', icon: <CreditCard size={20} />, onClick: () => onOpenAiAgent('recovery') },
    { name: 'Smart Inventory AI', icon: <Package size={20} />, onClick: () => onOpenAiAgent('inventory') },
    { name: 'Business Insight AI', icon: <BrainCircuit size={20} />, onClick: () => onOpenAiAgent('insight') },
    { name: 'AI Action Center', icon: <Zap size={20} />, onClick: () => onOpenAiAgent('action-center') },
  ];

  return (
    <Layout departmentName="SALES AI AGENTS" onBack={onBack} sidebarLinks={sidebarLinks} variant="crm">
        {/* Content */}
        <header className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight leading-tight mb-2">Unified AI Intelligence Layer</h2>
            <p className="text-sm text-gray-500 font-normal">Your complete business operations are now being monitored by 7 specialized AI Agents.</p>
          </div>
        </header>

        {/* AI Action Center Launchpad */}
        <section>
          <h3 className="text-[11px] font-bold text-purple-600 uppercase tracking-widest mb-4">ACTIVE AI AGENTS</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12 items-stretch">
            
            {/* 1. Elite CEO AI (Full Width) */}
            <div 
              onClick={() => onOpenAiAgent('ceo')}
              className="lg:col-span-2 bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl p-8 shadow-md cursor-pointer hover:shadow-xl transition-all group flex flex-col md:flex-row gap-8 items-center relative overflow-hidden"
              style={{ viewTransitionName: 'sales-ceo-card' }}
            >
              <div className="absolute top-[-20px] right-[-20px] opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                <Crown size={200} />
              </div>

              <div className="w-24 h-24 rounded-2xl bg-purple-800/50 flex items-center justify-center text-purple-300 shrink-0 border border-purple-700 group-hover:scale-105 transition-transform relative z-10">
                <Crown size={48} />
              </div>
              
              <div className="flex-1 text-white relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-3xl font-bold tracking-tight">ELITE CEO AI</h4>
                  <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded uppercase tracking-wider border border-amber-500/30">Executive</span>
                </div>
                
                <div className="text-sm text-purple-200 mb-6 leading-relaxed max-w-3xl space-y-1">
                  <p><strong>You are ELITE CEO AI.</strong> Analyze this business data and brief me like my best CFO in under 5 minutes.</p>
                  <p><strong>Give me:</strong></p>
                  <ul className="list-decimal pl-4 space-y-0.5">
                    <li>One-line business health verdict (Green/Yellow/Red)</li>
                    <li>Revenue vs last month (% change)</li>
                    <li>Top 3 critical issues needing my attention NOW</li>
                    <li>Top 3 wins to celebrate</li>
                    <li>5 priority decisions I must take today — ranked by impact</li>
                    <li>One bold growth move I should consider this month</li>
                    <li>What will break if I do nothing this week</li>
                  </ul>
                  <p className="text-amber-300 font-bold mt-2">Rules: No fluff. No paragraphs. Bullet points only. CEO language.</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold bg-purple-950/50 text-purple-300 px-3 py-1.5 rounded-full border border-purple-700/50">Health Verdict</span>
                  <span className="text-[10px] font-bold bg-purple-950/50 text-purple-300 px-3 py-1.5 rounded-full border border-purple-700/50">Priority Decisions</span>
                  <span className="text-[10px] font-bold bg-purple-950/50 text-purple-300 px-3 py-1.5 rounded-full border border-purple-700/50">Growth Move</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm font-bold text-purple-900 bg-white px-6 py-3 rounded-xl shadow-md group-hover:bg-purple-50 transition-colors shrink-0 relative z-10">
                Launch Dashboard <ArrowUpRight size={18} />
              </div>
            </div>

            {/* 2. SALES GROWTH AI */}
            <div 
              onClick={() => onOpenAiAgent('sales')}
              className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-sm cursor-pointer hover:shadow-lg hover:border-emerald-400 transition-all group flex flex-col h-full"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center text-emerald-600 mb-6 border border-emerald-100 group-hover:scale-110 transition-transform">
                <TrendingUp size={32} />
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">SALES GROWTH AI</h4>
                </div>
                
                <div className="text-xs text-gray-600 mb-6 leading-relaxed flex-1 space-y-1">
                  <p><strong>You are SALES GROWTH AI.</strong> Analyze my sales data and tell me where money is being left on the table.</p>
                  <p><strong>Give me:</strong></p>
                  <ul className="list-decimal pl-4 space-y-0.5">
                    <li>Total open order value and count</li>
                    <li>Which 3 customers I should call TODAY (highest revenue risk or opportunity)</li>
                    <li>Orders delayed more than 3 days — customer name, value, delay reason</li>
                    <li>This month's sales forecast vs target — gap analysis</li>
                    <li>One upselling opportunity hiding in my current orders</li>
                    <li>One customer at risk of churning — what to do about them</li>
                    <li>Daily follow-up checklist for my sales team (3 items max)</li>
                  </ul>
                  <p className="text-emerald-600 font-bold mt-2">Rules: Be ruthless with priorities. Money first.</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded border border-emerald-100">Delayed Orders</span>
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-600 px-2 py-1 rounded border border-amber-100">Upsell Opportunity</span>
                  <span className="text-[10px] font-bold bg-rose-50 text-rose-600 px-2 py-1 rounded border border-rose-100">Churn Risk</span>
                </div>
              </div>
            </div>

            {/* 3. LOGISTICS MASTER AI */}
            <div 
              onClick={() => onOpenAiAgent('logistics')}
              className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm cursor-pointer hover:shadow-lg hover:border-blue-400 transition-all group flex flex-col h-full"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-blue-600 mb-6 border border-blue-100 group-hover:scale-110 transition-transform">
                <Truck size={32} />
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">LOGISTICS MASTER AI</h4>
                </div>
                
                <div className="text-xs text-gray-600 mb-6 leading-relaxed flex-1 space-y-1">
                  <p><strong>You are LOGISTICS MASTER AI.</strong> I need zero delivery failures and minimum cost.</p>
                  <p><strong>Give me:</strong></p>
                  <ul className="list-decimal pl-4 space-y-0.5">
                    <li>How many dispatches are pending RIGHT NOW and which are urgent</li>
                    <li>Optimal vehicle allocation for today (routes + loads)</li>
                    <li>Which deliveries are at risk of delay — and exact reason</li>
                    <li>POD pending list — who hasn't confirmed receipt</li>
                    <li>Which route is costing me the most vs alternatives</li>
                    <li>One change I can make today to reduce logistics cost</li>
                    <li>Alert me: any delivery that could become a customer complaint</li>
                  </ul>
                  <p className="text-blue-600 font-bold mt-2">Rules: Short. Direct. Logistics language.</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100">Vehicle Allocation</span>
                  <span className="text-[10px] font-bold bg-rose-50 text-rose-600 px-2 py-1 rounded border border-rose-100">Delivery Risk</span>
                  <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded border border-indigo-100">Cost Reduction</span>
                </div>
              </div>
            </div>

            {/* 4. REVENUE RECOVERY AI */}
            <div 
              onClick={() => onOpenAiAgent('recovery')}
              className="bg-white rounded-2xl p-6 border border-rose-200 shadow-sm cursor-pointer hover:shadow-lg hover:border-rose-400 transition-all group flex flex-col h-full"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-rose-50 flex items-center justify-center text-rose-600 mb-6 border border-rose-100 group-hover:scale-110 transition-transform">
                <CreditCard size={32} />
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-rose-700 transition-colors">REVENUE RECOVERY AI</h4>
                </div>
                
                <div className="text-xs text-gray-600 mb-6 leading-relaxed flex-1 space-y-1">
                  <p><strong>You are REVENUE RECOVERY AI.</strong> Every rupee outstanding is a risk. Help me collect faster.</p>
                  <p><strong>Give me:</strong></p>
                  <ul className="list-decimal pl-4 space-y-0.5">
                    <li>Total outstanding amount by age bucket (0-30, 31-60, 61-90, 90+ days)</li>
                    <li>Top 5 customers by outstanding amount — with last payment date</li>
                    <li>Who is HIGH RISK of not paying — and why</li>
                    <li>My collection target for this week to hit monthly cash goal</li>
                    <li>Exact follow-up script for my collections team (2 sentences max)</li>
                    <li>Which invoices are disputed vs genuinely delayed</li>
                    <li>One policy change to prevent this level of outstanding next month</li>
                  </ul>
                  <p className="text-rose-600 font-bold mt-2">Rules: Be direct. Name the customers. Give exact ₹ figures.</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  <span className="text-[10px] font-bold bg-rose-50 text-rose-600 px-2 py-1 rounded border border-rose-100">High Risk Customers</span>
                  <span className="text-[10px] font-bold bg-orange-50 text-orange-600 px-2 py-1 rounded border border-orange-100">Disputed Invoices</span>
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded border border-emerald-100">Collection Script</span>
                </div>
              </div>
            </div>

            {/* 5. SMART INVENTORY AI */}
            <div 
              onClick={() => onOpenAiAgent('inventory')}
              className="bg-white rounded-2xl p-6 border border-amber-200 shadow-sm cursor-pointer hover:shadow-lg hover:border-amber-400 transition-all group flex flex-col h-full"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center text-amber-600 mb-6 border border-amber-100 group-hover:scale-110 transition-transform">
                <Package size={32} />
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">SMART INVENTORY AI</h4>
                </div>
                
                <div className="text-xs text-gray-600 mb-6 leading-relaxed flex-1 space-y-1">
                  <p><strong>You are SMART INVENTORY AI.</strong> No stock-out, no excess. Optimize my inventory now.</p>
                  <p><strong>Give me:</strong></p>
                  <ul className="list-decimal pl-4 space-y-0.5">
                    <li>Items below minimum stock level — list with current qty and reorder qty</li>
                    <li>Critical materials that could stop production in 48 hours</li>
                    <li>Purchase orders I must raise TODAY — item, qty, suggested vendor</li>
                    <li>Excess inventory blocking capital — items + estimated cost blocked</li>
                    <li>Items with no movement in 60+ days — dead stock alert</li>
                    <li>One inventory policy that will save me 10%+ in holding costs</li>
                    <li>Stock vs demand mismatch — what's piling up while customers wait</li>
                  </ul>
                  <p className="text-amber-600 font-bold mt-2">Rules: No waste. No shortage. Just facts and fixes.</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-600 px-2 py-1 rounded border border-amber-100">Dead Stock Alert</span>
                  <span className="text-[10px] font-bold bg-rose-50 text-rose-600 px-2 py-1 rounded border border-rose-100">Critical Shortages</span>
                  <span className="text-[10px] font-bold bg-cyan-50 text-cyan-600 px-2 py-1 rounded border border-cyan-100">Excess Inventory</span>
                </div>
              </div>
            </div>

            {/* 6. BUSINESS INSIGHT AI */}
            <div 
              onClick={() => onOpenAiAgent('insight')}
              className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm cursor-pointer hover:shadow-lg hover:border-cyan-400 transition-all group flex flex-col h-full"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center text-cyan-600 mb-6 border border-cyan-100 group-hover:scale-110 transition-transform">
                <BrainCircuit size={32} />
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-cyan-700 transition-colors">BUSINESS INSIGHT AI</h4>
                </div>
                
                <div className="text-xs text-gray-600 mb-6 leading-relaxed flex-1 space-y-1">
                  <p><strong>You are BUSINESS INSIGHT AI.</strong> Turn my raw data into strategic intelligence.</p>
                  <p><strong>Give me:</strong></p>
                  <ul className="list-decimal pl-4 space-y-0.5">
                    <li>KPI Scorecard — Revenue, Collection, Orders, Dispatch (vs last month)</li>
                    <li>Which metric improved the most this month — and why</li>
                    <li>Which metric is silently getting worse — and what's driving it</li>
                    <li>Top operational bottleneck right now (where work is piling up)</li>
                    <li>Revenue trend — growing, declining, or flat — with pattern explanation</li>
                    <li>One risk that nobody in my team is probably talking about</li>
                    <li>One data point that surprised you most in this dataset</li>
                    <li>My business in 30 days if current trends continue — good or bad</li>
                  </ul>
                  <p className="text-cyan-600 font-bold mt-2">Rules: Talk like a smart analyst who knows business, not an AI generating reports.</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  <span className="text-[10px] font-bold bg-cyan-50 text-cyan-600 px-2 py-1 rounded border border-cyan-100">KPI Scorecard</span>
                  <span className="text-[10px] font-bold bg-purple-50 text-purple-600 px-2 py-1 rounded border border-purple-100">Hidden Risks</span>
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-600 px-2 py-1 rounded border border-amber-100">Bottlenecks</span>
                </div>
              </div>
            </div>

            {/* 7. AI ACTION CENTER (Full Width) */}
            <div 
              onClick={() => onOpenAiAgent('action-center')}
              className="lg:col-span-2 bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-2xl p-8 shadow-md cursor-pointer hover:shadow-xl transition-all group flex flex-col md:flex-row gap-8 items-center relative overflow-hidden"
            >
              <div className="absolute top-[-20px] left-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                <Zap size={200} />
              </div>

              <div className="w-24 h-24 rounded-2xl bg-indigo-800/50 flex items-center justify-center text-indigo-300 shrink-0 border border-indigo-700 group-hover:scale-105 transition-transform relative z-10">
                <Zap size={48} />
              </div>
              
              <div className="flex-1 text-white relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-3xl font-bold tracking-tight">AI ACTION CENTER</h4>
                  <span className="text-[10px] font-bold bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded uppercase tracking-wider border border-rose-500/30">Aggregator</span>
                </div>
                
                <div className="text-sm text-indigo-200 mb-6 leading-relaxed max-w-3xl space-y-1">
                  <p><strong>You are AI ACTION CENTER.</strong> You receive outputs from 6 AI agents and create ONE unified action list for management.</p>
                  <p><strong>YOUR JOB:</strong></p>
                  <ul className="list-decimal pl-4 space-y-0.5">
                    <li>Remove duplicates across all agent outputs</li>
                    <li>Rank ALL actions by: 🔴 HIGH / 🟡 MEDIUM / 🟢 LOW priority</li>
                    <li>Assign each action to a department/person</li>
                    <li>Set a deadline (Today / This Week / This Month)</li>
                    <li>Flag any conflicts between agent recommendations</li>
                    <li>Create a ONE-PAGE management briefing with: 3 things going well, 3 things on fire, Top 10 actions ranked by urgency and revenue impact</li>
                    <li>End with: "If CEO does only ONE thing today — it should be: [X]"</li>
                  </ul>
                  <p className="text-rose-300 font-bold mt-2">Rules: Output must fit on ONE page. No padding. All signal, no noise.</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold bg-indigo-950/50 text-indigo-300 px-3 py-1.5 rounded-full border border-indigo-700/50">Priority Ranking</span>
                  <span className="text-[10px] font-bold bg-indigo-950/50 text-indigo-300 px-3 py-1.5 rounded-full border border-indigo-700/50">Conflict Resolution</span>
                  <span className="text-[10px] font-bold bg-indigo-950/50 text-indigo-300 px-3 py-1.5 rounded-full border border-indigo-700/50">One-Page Briefing</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm font-bold text-indigo-900 bg-white px-6 py-3 rounded-xl shadow-md group-hover:bg-indigo-50 transition-colors shrink-0 relative z-10">
                Launch Center <ArrowUpRight size={18} />
              </div>
            </div>

          </div>
        </section>

    </Layout>
  );
}
