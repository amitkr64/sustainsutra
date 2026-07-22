import React, { useState, useEffect } from 'react';
import { paymentService } from '@/services/paymentService';
import { TrendingUp, Receipt, IndianRupee } from 'lucide-react';

// Revenue + recent-orders view for admins. Rendered in the Admin Dashboard
// "Payments" tab alongside PaymentSettings.
const PaymentRevenue = () => {
    const [data, setData] = useState({ totals: [], recent: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        paymentService.getRevenueStats()
            .then(setData)
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="text-dimmed p-4">Loading revenue...</div>;
    }

    const totalRow = data.totals[0] || { _id: 'INR', total: 0, count: 0 };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-2 text-gold mb-2">
                        <IndianRupee size={18} />
                        <span className="text-xs uppercase tracking-widest">Total Revenue</span>
                    </div>
                    <p className="text-3xl font-playfair text-white">
                        ₹{Number(totalRow.total || 0).toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-dimmed mt-1">{totalRow._id || 'INR'}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-2 text-gold mb-2">
                        <Receipt size={18} />
                        <span className="text-xs uppercase tracking-widest">Paid Orders</span>
                    </div>
                    <p className="text-3xl font-playfair text-white">{totalRow.count || 0}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-2 text-gold mb-2">
                        <TrendingUp size={18} />
                        <span className="text-xs uppercase tracking-widest">Avg. Order Value</span>
                    </div>
                    <p className="text-3xl font-playfair text-white">
                        ₹{totalRow.count ? Math.round(totalRow.total / totalRow.count).toLocaleString('en-IN') : 0}
                    </p>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10">
                    <h4 className="text-lg font-playfair text-white">Recent Orders</h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase">Customer</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase">Product</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase">Amount</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {(data.recent || []).map((p) => (
                                <tr key={p._id} className="hover:bg-white/5">
                                    <td className="px-4 py-3 text-sm text-offwhite">{p.user?.email || '—'}</td>
                                    <td className="px-4 py-3 text-sm text-dimmed">{p.productType}</td>
                                    <td className="px-4 py-3 text-sm text-gold">₹{p.amount}</td>
                                    <td className="px-4 py-3 text-sm text-dimmed">{new Date(p.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {(!data.recent || data.recent.length === 0) && (
                                <tr>
                                    <td colSpan={4} className="px-4 py-10 text-center text-dimmed">No paid orders yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentRevenue;
