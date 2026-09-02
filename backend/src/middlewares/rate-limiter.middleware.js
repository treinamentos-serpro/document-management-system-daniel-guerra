// Middleware de rate limiting simples em memória, sem dependências externas.
// Limita requisições por IP dentro de uma janela de tempo configurável.
function createRateLimiter({ windowMs = 60_000, max = 20 } = {}) {
  const requests = new Map();

  return function rateLimiter(req, res, next) {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const windowStart = now - windowMs;

    const timestamps = (requests.get(ip) || []).filter((t) => t > windowStart);
    timestamps.push(now);
    requests.set(ip, timestamps);

    if (timestamps.length > max) {
      return res.status(429).json({ error: 'Muitas requisições. Tente novamente mais tarde.' });
    }

    return next();
  };
}

module.exports = { createRateLimiter };
