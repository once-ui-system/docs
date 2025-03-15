"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ToggleButton } from '@/once-ui/components/ToggleButton';
import { Accordion, Column, Flex, Icon, Row, Tag } from "@/once-ui/components";
import { usePathname } from 'next/navigation';
import { layout } from "@/app/resources/config";
import { routes } from "@/app/resources";
import { Schemes } from "@/once-ui/types";

import styles from './Sidebar.module.scss';

export interface NavigationItem extends Omit<React.ComponentProps<typeof Flex>, "title" | "label" | "children">{
  slug: string;
  title: string;
  label?: string;
  order?: number;
  children?: NavigationItem[];
  schemes?: Schemes;
  keywords?: string;
  navIcon?: string;
  navTag?: string;
  navLabel?: string;
  navTagVariant?: Schemes;
}

interface SidebarProps extends Omit<React.ComponentProps<typeof Flex>, "children"> {
  initialNavigation?: NavigationItem[];
  hide?: "s" | "m" | "l";
  show?: "s" | "m" | "l";
}

const toTitleCase = (str: string) => {
  return str
    .replace(/-/g, ' ')
    .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

// Memoized navigation item component to prevent re-renders
const NavigationItem: React.FC<{
  item: NavigationItem;
  depth: number;
  pathname: string;
  renderNavigation: (items: NavigationItem[], depth: number) => React.ReactNode;
}> = React.memo(({ item, depth, pathname, renderNavigation }) => {
  const correctedSlug = item.slug;
  const isSelected = pathname.startsWith(`/docs/${correctedSlug}`);

  if (item.children) {
    return (
      <Row
        fillWidth 
        style={{paddingLeft: `calc(${depth} * var(--static-space-8))`}}>
        <Column
          fillWidth
          marginTop="2">
          {layout.sidebar.collapsible ? (
          <Accordion
            gap="2"
            icon="chevronRight"
            iconRotation={90}
            size="s"
            radius="s"
            paddingX={undefined}
            paddingBottom={undefined}
            paddingLeft="4"
            paddingTop="4"
            title={
              <Row textVariant="label-strong-s" onBackground="brand-strong">
                {toTitleCase(item.title)}
              </Row>
            }>
              {renderNavigation(item.children, depth + 1)}
          </Accordion>
          ) : (
            <Column
              gap="2"
              paddingLeft="4"
              paddingTop="4">
                <Row 
                  paddingY="12" paddingLeft="8" textVariant="label-strong-s" onBackground="brand-strong">
                  {toTitleCase(item.title)}
                </Row>
                {renderNavigation(item.children, depth + 1)}
            </Column>
          )}
        </Column>
      </Row>
    );
  }

  return (
    <ToggleButton
      fillWidth
      justifyContent="space-between"
      selected={isSelected}
      className={depth === 0 ? styles.navigation : undefined}
      href={`/docs/${correctedSlug}`}>
      <Row fillWidth horizontal="space-between" vertical="center">
          <Row
            overflow="hidden"
            gap="8"
            onBackground={isSelected ? "neutral-strong" : "neutral-weak"}
            textVariant={isSelected ? "label-strong-s" : "label-default-s"}
            style={{ textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
              {item.navIcon && <Icon size="xs" name={item.navIcon}/>}
              {item.label || item.title}
          </Row>
          {item.navTag && (
            <Tag data-theme="dark" data-brand={item.navTagVariant} style={{marginRight: "-0.5rem", transform: "scale(0.8)", transformOrigin: "right center"}} variant="brand" size="s">
                {item.navTag}
            </Tag>
          )}
      </Row>
    </ToggleButton>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function to prevent unnecessary re-renders
  // Only re-render if the item changes or if the selection state changes
  const prevSelected = prevProps.pathname.startsWith(`/docs/${prevProps.item.slug}`);
  const nextSelected = nextProps.pathname.startsWith(`/docs/${nextProps.item.slug}`);
  
  return prevProps.item === nextProps.item && prevSelected === nextSelected;
});

// Memoized resource link component
const ResourceLink: React.FC<{
  href: string;
  icon: string;
  label: string;
  pathname: string;
}> = React.memo(({ href, icon, label, pathname }) => {
  const isSelected = pathname === href;
  
  return (
    <ToggleButton
      fillWidth
      justifyContent="space-between"
      selected={isSelected}
      className={styles.navigation}
      href={href}>
      <Row 
        gap="8"
        onBackground={isSelected ? "neutral-strong" : "neutral-weak"}
        textVariant={isSelected ? "label-strong-s" : "label-default-s"}>
        <Icon size="xs" name={icon}/>
        {label}
      </Row>
    </ToggleButton>
  );
}, (prevProps, nextProps) => {
  // Only re-render if the selection state changes
  return (prevProps.pathname === prevProps.href) === (nextProps.pathname === nextProps.href);
});

const Sidebar: React.FC<SidebarProps> = ({ initialNavigation, ...rest }) => {
  const [navigation, setNavigation] = useState<NavigationItem[]>(initialNavigation || []);
  const [hasLoaded, setHasLoaded] = useState(false);
  const pathname = usePathname();
  
  // Load navigation data only once
  useEffect(() => {
    if (initialNavigation && initialNavigation.length > 0) {
      setNavigation(initialNavigation);
      setHasLoaded(true);
      return;
    }
    
    if (!hasLoaded) {
      fetch("/api/navigation")
        .then((res) => res.json())
        .then((data) => {
          setNavigation(data);
          setHasLoaded(true);
        })
        .catch((err) => {
          console.error("Navigation fetch failed", err);
          setHasLoaded(true);
        });
    }
  }, [initialNavigation, hasLoaded]);
  
  // Create a stable renderNavigation function that doesn't depend on pathname
  const renderNavigation = useCallback((items: NavigationItem[], depth = 0) => {
    return (
      <>
        {items.map((item) => (
          <NavigationItem 
            key={item.slug}
            item={item}
            depth={depth}
            pathname={pathname}
            renderNavigation={renderNavigation}
          />
        ))}
      </>
    );
  }, [pathname]);

  // Memoize the entire navigation tree
  const memoizedNavigation = useMemo(() => renderNavigation(navigation), [navigation, renderNavigation]);

  // Memoize the resources section
  const memoizedResources = useMemo(() => {
    if (!(routes['/roadmap'] || routes['/changelog'])) {
      return null;
    }

    return (
      <Column gap="2" marginTop="32" paddingLeft="4">
        <Row textVariant="label-strong-s" onBackground="brand-strong" paddingLeft="8" paddingY="12">
          Resources
        </Row>
        {routes['/roadmap'] && (
          <ResourceLink 
            href="/roadmap"
            icon="roadmap"
            label="Roadmap"
            pathname={pathname}
          />
        )}
        
        {routes['/changelog'] && (
          <ResourceLink 
            href="/changelog"
            icon="changelog"
            label="Changelog"
            pathname={pathname}
          />
        )}
      </Column>
    );
  }, [pathname]);

  return (
    <Column maxWidth={layout.sidebar.width} position="sticky" top="64" fitHeight gap="2" as="nav" overflowY="auto" paddingRight="8" style={{maxHeight: "calc(100vh - var(--static-space-80))"}} {...rest}>
        {memoizedNavigation}
        {memoizedResources}
    </Column>
  );
};

// Use a custom comparison function for the entire Sidebar component
const MemoizedSidebar = React.memo(Sidebar, (prevProps, nextProps) => {
  // Only re-render if the initialNavigation changes
  // This is a very aggressive optimization that prevents re-renders when navigating
  return prevProps.initialNavigation === nextProps.initialNavigation;
});

export { MemoizedSidebar as Sidebar };