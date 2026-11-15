export type PageRoute =
  | 'home'
  | 'about'
  | 'resume'
  | 'contact'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'cookie-policy'
  | 'affiliate-disclosure'
  | 'content-policy';

export const ROUTE_TO_PATH: Record<PageRoute, string> = {
  home: '/',
  about: '/about',
  resume: '/resume',
  contact: '/contact',
  'privacy-policy': '/privacy-policy',
  'terms-of-service': '/terms-of-service',
  'cookie-policy': '/cookie-policy',
  'affiliate-disclosure': '/affiliate-disclosure',
  'content-policy': '/content-policy',
};

export const POLICY_ROUTES: { route: PageRoute; label: string }[] = [
  { route: 'privacy-policy', label: 'Privacy Policy' },
  { route: 'terms-of-service', label: 'Terms of Service' },
  { route: 'cookie-policy', label: 'Cookie Policy' },
  { route: 'affiliate-disclosure', label: 'Affiliate Disclosure' },
  { route: 'content-policy', label: 'Content & DMCA Policy' },
];

export function isPolicyRoute(route: PageRoute): boolean {
  return POLICY_ROUTES.some((item) => item.route === route);
}

export function resolveRouteFromPath(pathname: string): PageRoute {
  const clean = pathname.replace(/\/+$/, '').toLowerCase() || '/';
  if (clean === '/' || clean === '/home') return 'home';
  if (clean === '/about') return 'about';
  if (clean === '/resume' || clean === '/cv') return 'resume';
  if (clean === '/contact') return 'contact';
  if (clean === '/policies' || clean === '/privacy' || clean === '/privacy-policy') {
    return 'privacy-policy';
  }
  if (clean === '/terms' || clean === '/terms-of-service') return 'terms-of-service';
  if (clean === '/cookies' || clean === '/cookie-policy') return 'cookie-policy';
  if (clean === '/affiliate-disclosure' || clean === '/disclosure') {
    return 'affiliate-disclosure';
  }
  if (clean === '/content-policy' || clean === '/dmca') return 'content-policy';
  return 'home';
}

export type NavigateFn = (route: PageRoute, sectionId?: string) => void;
