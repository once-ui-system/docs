"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button, Fade, Flex, Logo, NavIcon, Row, Kbar, useTheme } from "@once-ui-system/core";
import { layout, routes } from "@/resources/once-ui.config";
import { Sidebar, NavigationItem } from "./Sidebar";

export function Header() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSidebarVisible(false);
  }, [pathname]);

  useEffect(() => {
    setIsMac(navigator.userAgent.toLowerCase().indexOf('mac') !== -1);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  
  useEffect(() => {
    fetch("/api/navigation")
      .then((res) => res.json())
      .then((data) => {
        setNavigationItems(data);
      })
      .catch((err) => console.error("Navigation fetch failed", err));
  }, []);

  // Function to convert navigation items to Kbar items recursively
  const convertToKbarItems = (items: NavigationItem[]) => {
    const kbarItems: any[] = [];
    
    items.forEach((item) => {
      if (item.children) {
        // This is a section/category
        // Add children items with this section name
        const childItems = convertToKbarItems(item.children);
        childItems.forEach(child => {
          child.section = item.title;
        });
        kbarItems.push(...childItems);
      } else {
        const correctedSlug = item.slug.replace(/^src\\content\\/, '').replace(/\\/g, '/');
        
        const defaultKeywords = `${item.title.toLowerCase()}, docs, documentation`;
        const keywords = item.keywords || defaultKeywords;
        
        kbarItems.push({
          id: correctedSlug,
          name: item.label || item.title,
          section: "Documentation",
          shortcut: [],
          keywords: keywords,
          href: `/${correctedSlug}`,
          icon: item.navIcon || "document",
        });
      }
    });
    
    return kbarItems;
  };

  const docsItems = convertToKbarItems(navigationItems);
  const { theme, setTheme } = useTheme();

  const navigationKbarItems = [
    {
      id: "home",
      name: "Home",
      section: "Navigation",
      shortcut: [],
      keywords: "home, landing page",
      href: "/",
      icon: "home",
    }
  ];
  
  if (routes['/changelog']) {
    navigationKbarItems.push({
      id: "changelog",
      name: "Changelog",
      section: "Navigation",
      shortcut: [],
      keywords: "changelog, changelog page",
      href: "/changelog",
      icon: "changelog",
    });
  }
  
  if (routes['/roadmap']) {
    navigationKbarItems.push({
      id: "roadmap",
      name: "Roadmap",
      section: "Navigation",
      shortcut: [],
      keywords: "roadmap, roadmap page",
      href: "/roadmap",
      icon: "roadmap",
    });
  }

  const kbar = [
    ...navigationKbarItems,
    ...docsItems,
    {
      id: "theme-toggle",
      name: theme === 'dark' ? "Light mode" : "Dark mode",
      section: "Theme",
      shortcut: [],
      keywords: "light mode, dark mode, theme, toggle, switch, appearance",
      perform: () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      },
      icon: theme === 'dark' ? "light" : "dark",
    },
  ];

  useEffect(() => {
    if (sidebarVisible) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Add styles to prevent scrolling but maintain position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position when sidebar is closed
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    
    return () => {
      // Cleanup function to ensure body scroll is restored
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [sidebarVisible]);

  return (
    <>
      <Fade
        pattern={{ display: true, size: "2" }}
        zIndex={3}
        pointerEvents="none"
        height="64"
        position="fixed"
        fillWidth
        top="0"
        left="0"
      />
      <Flex as="header" horizontal="center" position="sticky" top="0" zIndex={9} fillWidth vertical="center" paddingY="12" paddingX="l">
        <Row maxWidth={layout.header.width} vertical="center" horizontal="space-between" gap="l">
          <Row fillWidth vertical="center" gap="8">
            <NavIcon show="m" onClick={toggleSidebar}/>
            <Logo className="dark-flex" wordmark="/trademark/type-dark.svg" size="s" href="/"/>
            <Logo className="light-flex" wordmark="/trademark/type-light.svg" size="s" href="/"/>
          </Row>
          <Kbar hide="m" items={kbar} radius="full" background="neutral-alpha-weak">
            <Button data-border="rounded" size="s" variant="tertiary" weight="default">
              <Row vertical="center" gap="16" style={{marginLeft: '-0.5rem'}} paddingRight="8">
                <Row background="neutral-alpha-medium" paddingX="8" paddingY="4" radius="full" data-scaling="90" textVariant="body-default-xs" onBackground="neutral-medium">{isMac ? 'Cmd' : 'Ctrl'} k</Row>
                Search docs...
              </Row>
            </Button>
          </Kbar>
          <Row fillWidth horizontal="end" gap="8" data-border="rounded">
            <Row hide="s">
              <Button size="s" variant="secondary" href="https://once-ui.com/products">
                Start building
              </Button>
            </Row>
            <Button href="https://once-ui.com/auth" size="s">
              Sign up
            </Button>
          </Row>
        </Row>
      </Flex>

      {sidebarVisible && (
        <Sidebar 
          maxWidth={100}
          style={{height: "calc(100vh - var(--static-space-64))", backdropFilter: "blur(2rem)"}} 
          padding="8" 
          background="overlay" 
          position="fixed"
          borderTop="neutral-alpha-weak"
          left="0" 
          top="64"
          zIndex={9}
        />
      )}
    </>
  );
};
