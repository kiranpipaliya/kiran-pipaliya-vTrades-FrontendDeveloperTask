export async function fetchTrades() {
	const res = await fetch('/api/trades');

	if (!res.ok) {
		throw new Error('Network error');
	}

	const data = await res.json();

	if (!data.success) {
		throw new Error(data.message);
	}

	return data.data;
}
