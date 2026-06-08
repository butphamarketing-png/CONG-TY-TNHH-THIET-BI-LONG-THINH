import { useEffect } from "react";
import { useLocation } from "wouter";

function LegacyRedirect({
  slug,
  target,
}: {
  slug: string;
  target: string;
}) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation(target, { replace: true });
  }, [slug, target, setLocation]);

  return null;
}

export function LegacyCategoryRedirect({ params }: { params: { slug: string } }) {
  return <LegacyRedirect slug={params.slug} target={`/${params.slug}`} />;
}

export function LegacyBrandRedirect({ params }: { params: { slug: string } }) {
  return <LegacyRedirect slug={params.slug} target={`/${params.slug}`} />;
}

export function LegacyProductRedirect({ params }: { params: { slug: string } }) {
  return <LegacyRedirect slug={params.slug} target={`/${params.slug}`} />;
}
