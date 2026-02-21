-- ============================================================================
-- site_config: Global key-value store for shared content
-- Used by all section components via getSiteConfig()
-- Tiny table (~15 rows), cached aggressively, public read via RLS.
-- ============================================================================

CREATE TABLE IF NOT EXISTS site_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Public read, admin write
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site_config"
  ON site_config FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role can manage site_config"
  ON site_config FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- Seed global content
-- ============================================================================

INSERT INTO site_config (key, value) VALUES

-- Phone number
('phone', '{"number": "+45 52 52 34 97", "href": "tel:+4552523497"}'::jsonb),

-- Navigation links
('nav_links', '[
  { "label": "Mobil cykelsmed", "href": "/" },
  { "label": "Priser", "href": "/priser" },
  { "label": "Til erhvervskunder", "href": "/erhverv" },
  { "label": "Blog", "href": "/blog" },
  { "label": "Om os", "href": "/om-os" },
  { "label": "Kontakt", "href": "/kontakt" }
]'::jsonb),

-- Hero USP labels (shown below hero CTA)
('hero_usps', '[
  { "icon": "truck", "text": "Vi kommer til dig" },
  { "icon": "zap", "text": "Reparation samme dag" },
  { "icon": "shield", "text": "Garanti på alt arbejde" }
]'::jsonb),

-- Trust bar stats
('trust_stats', '[
  { "icon": "star", "value": "4.3/5", "label": "Trustpilot" },
  { "icon": "bike", "value": "2.500+", "label": "Cykler repareret" },
  { "icon": "clock", "value": "Samme dag", "label": "Hurtig responstid" },
  { "icon": "shield-check", "value": "Garanti", "label": "På alt arbejde" }
]'::jsonb),

-- How it works steps
('how_it_works_steps', '[
  { "icon": "bike", "number": "1", "title": "Vælg cykel", "description": "Fortæl os hvilken type cykel der skal repareres." },
  { "icon": "settings", "number": "2", "title": "Vælg serviceplan", "description": "Vælg de ydelser du har brug for, eller vælg en Serviceaftale." },
  { "icon": "calendar-check", "number": "3", "title": "Vælg tid", "description": "Book et tidspunkt der passer dig – vi er fleksible." },
  { "icon": "wrench", "number": "4", "title": "Vi kommer og fikser", "description": "Vores cykelsmed kommer til dig med alt professionelt værktøj." }
]'::jsonb),

-- How it works section text
('how_it_works', '{
  "heading": "Sådan",
  "headingAccent": "fungerer det",
  "body": "Få din cykel repareret i 4 enkle trin",
  "ctaText": "Book nu – det tager kun 2 minutter"
}'::jsonb),

-- About section
('about', '{
  "badge": "Vores historie",
  "heading": "Fra én cykelsmed til dit",
  "headingAccent": "personlige værksted på hjul",
  "body": [
    "BikeDoctor startede med en simpel idé: Hvad nu hvis cykelsmeden kom til dig, i stedet for omvendt? Det der begyndte som én mand med en kassevogn fuld af værktøj, er vokset til et team af professionelle cykelsmede der dækker hele Sjælland.",
    "Vi tror på personlig service. Derfor får du din egen faste cykelsmed, som kender dine cykler og deres historik. Det handler ikke bare om at fikse cykler – det handler om at du altid føler dig tryg."
  ],
  "stats": [
    { "icon": "heart", "value": "2.500+", "label": "Glade kunder" },
    { "icon": "users", "value": "5+", "label": "Cykelsmede" },
    { "icon": "wrench", "value": "5.000+", "label": "Reparationer" }
  ]
}'::jsonb),

-- CTA banner defaults
('cta_banner', '{
  "heading": "Klar til at få din cykel fixet?",
  "subtext": "Book en tid i dag og få din cykel repareret derhjemme.",
  "ctaText": "Book din tid nu"
}'::jsonb),

-- Secondary CTA (hero scroll button)
('hero_secondary_cta', '"Se hvordan det virker"'::jsonb),

-- Footer content
('footer', '{
  "companyName": "BikeDoctor ApS",
  "cvr": "12345678",
  "address": "København, Danmark",
  "email": "hej@bikedoctor.dk",
  "copyright": "BikeDoctor. Alle rettigheder forbeholdes."
}'::jsonb)

ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();
