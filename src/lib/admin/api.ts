export async function getUsers() {
  const res = await fetch("/api/admin/users");
  return res.json();
}

export async function getMetrics() {
  const res = await fetch("/api/admin/metrics");
  return res.json();
}

export async function togglePremium(userId: string, current: boolean) {
  const res = await fetch("/api/admin/toggle-premium", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, current })
  });

  return res.json();
}