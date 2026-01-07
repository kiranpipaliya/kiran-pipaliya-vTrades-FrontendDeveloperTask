import { NextResponse } from 'next/server';

export async function GET() {
	try {
		return NextResponse.json({
			success: true,
			data: [
				{ id: 1, symbol: 'BTCUSD', price: 42000, pnl: 1200 },
				{ id: 2, symbol: 'ETHUSD', price: 2200, pnl: -300 },
			],
		});
	} catch {
		return NextResponse.json(
			{ success: false, message: 'Failed to load trades' },
			{ status: 500 },
		);
	}
}
