'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
	const router = useRouter();
	const [trades, setTrades] = useState<any[]>([]);
	const [error, setError] = useState('');

	useEffect(() => {
		const user = localStorage.getItem('user');
		if (!user) router.push('/login');

		fetch('/api/trades')
			.then((res) => res.json())
			.then((data) => {
				if (!data.success) throw new Error(data.message);
				setTrades(data.data);
			})
			.catch((err) => setError(err.message));
	}, []);

	if (error) return <p className="text-red-500">{error}</p>;

	return (
		<div className="p-6 grid gap-4">
			{trades.map((trade) => (
				<div
					key={trade.id}
					className="bg-gray-800 p-4 rounded text-white"
				>
					<p>{trade.symbol}</p>
					<p>Price: {trade.price}</p>
					<p
						className={
							trade.pnl > 0 ? 'text-green-500' : 'text-red-500'
						}
					>
						PnL: {trade.pnl}
					</p>
				</div>
			))}
		</div>
	);
}
