import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";

import classNames from "classnames";

import { Footer, Header } from "@/product";
import { baseURL, effects, style } from "@/app/resources";

import { Analytics } from "@vercel/analytics/react"
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";

import { Background, Column, Flex, ToastProvider, ThemeProvider } from "@/once-ui/components";
import { font, layout, schema } from "./resources/config";
import { meta } from "@/app/resources";
import { RouteGuard } from "@/product/RouteGuard";
import { Meta } from "@/once-ui/modules";

const themeScript = `
  (function() {
    function getInitialTheme() {
      try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          if (savedTheme === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          }
          return savedTheme;
        }
      } catch (e) {
        // Fallback
      }
      return 'dark';
    }
    
    document.documentElement.setAttribute('data-theme', getInitialTheme());
  })();
`;

export async function generateMetadata() {
  const baseMetadata = Meta.generate({
    title: meta.home.title,
    description: meta.home.description,
    baseURL: baseURL,
    path: meta.home.path,
    image: meta.home.image
  });

  return {
    ...baseMetadata,
    metadataBase: new URL(`${baseURL}`),
    openGraph: {
      ...baseMetadata.openGraph,
      siteName: meta.home.title,
      locale: schema.locale,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <ThemeProvider>
        <ToastProvider>
          <Flex
            as="html"
            lang="en"
            background="page"
            data-neutral={style.neutral}
            data-brand={style.brand}
            data-accent={style.accent}
            data-solid={style.solid}
            data-solid-style={style.solidStyle}
            data-theme={style.theme}
            data-border={style.border}
            data-surface={style.surface}
            data-transition={style.transition}
            className={classNames(
              font.primary.variable,
              font.secondary.variable,
              font.tertiary.variable,
              font.code.variable,
            )}
          >
          <Column style={{ minHeight: "100vh" }} as="body" fillWidth margin="0" padding="0">
              <Background
                position="fixed"
                mask={{
                  cursor: effects.mask.cursor,
                  x: effects.mask.x,
                  y: effects.mask.y,
                  radius: effects.mask.radius,
                }}
                gradient={{
                  display: effects.gradient.display,
                  x: effects.gradient.x,
                  y: effects.gradient.y,
                  width: effects.gradient.width,
                  height: effects.gradient.height,
                  tilt: effects.gradient.tilt,
                  colorStart: effects.gradient.colorStart,
                  colorEnd: effects.gradient.colorEnd,
                  opacity: effects.gradient.opacity as
                    | 0
                    | 10
                    | 20
                    | 30
                    | 40
                    | 50
                    | 60
                    | 70
                    | 80
                    | 90
                    | 100,
                }}
                dots={{
                  display: effects.dots.display,
                  color: effects.dots.color,
                  size: effects.dots.size as any,
                  opacity: effects.dots.opacity as any,
                }}
                grid={{
                  display: effects.grid.display,
                  color: effects.grid.color,
                  width: effects.grid.width as any,
                  height: effects.grid.height as any,
                  opacity: effects.grid.opacity as any,
                }}
                lines={{
                  display: effects.lines.display,
                  opacity: effects.lines.opacity as any,
                }}
              />
              <Header />
              <Flex
                position="relative"
                fillWidth
                padding="l"
                horizontal="center"
                flex={1}
              >
                <Flex horizontal="center" maxWidth={layout.body.width} minHeight="0">
                  <RouteGuard>
                    {children}
                  </RouteGuard>
                </Flex>
              </Flex>
              <Footer />
            </Column>
            <Analytics />
          </Flex>
        </ToastProvider>
      </ThemeProvider>
    </>
  );
}
