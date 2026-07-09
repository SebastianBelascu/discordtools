const services = [
  'Discord Nitro',
  'server boosts',
  'Spotify Premium',
  'YouTube Premium',
  'Disney+',
  'Crunchyroll',
  'Discord members',
];

export function SeoProductFallback() {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
        DiscTools offers cheap Discord Nitro, Discord server boosts, premium streaming subscriptions and community growth tools with secure checkout, fast delivery and full-service warranty.
      </p>
      <p className="mt-4 text-sm text-zinc-500">
        Popular services include {services.join(', ')}.
      </p>
    </div>
  );
}
