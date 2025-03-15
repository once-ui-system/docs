"use client";

import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { ToggleButton } from '@/once-ui/components/ToggleButton';
import { Accordion, Column, Flex, Icon, Row, Tag } from "@/once-ui/components";
import { usePathname } from 'next/navigation';
import { layout } from "@/app/resources/config";
import { routes } from "@/app/resources";
import { Schemes } from "@/once-ui/types";

import styles from './Sidebar.module.scss';

// Global navigation cache to prevent refetching
let globalNavigationCache: any = null;

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
const NavigationItemComponent: React.FC<{
  item: NavigationItem;
  depth: number;
  pathname: string;
  renderNavigation: (items: NavigationItem[], depth: number) => React.ReactNode;
}> = ({ item, depth, pathname, renderNavigation }) => {
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
};

// Add display name and memoize with a less aggressive comparison function
const NavigationItem = React.memo(NavigationItemComponent, (prevProps, nextProps) => {
  // Always re-render if the pathname changes - this is critical for active state updates
  if (prevProps.pathname !== nextProps.pathname) {
    return false; // Different pathname means we should re-render
  }
  
  // Otherwise, only re-render if the item itself changes
  return prevProps.item === nextProps.item;
});

NavigationItem.displayName = 'NavigationItem';

// Memoized resource link component
const ResourceLinkComponent: React.FC<{
  href: string;
  icon: string;
  label: string;
  pathname: string;
}> = ({ href, icon, label, pathname }) => {
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
};

// Add display name and memoize with a less aggressive comparison function
const ResourceLink = React.memo(ResourceLinkComponent, (prevProps, nextProps) => {
  // Always re-render if the pathname changes - this is critical for active state updates
  if (prevProps.pathname !== nextProps.pathname) {
    return false; // Different pathname means we should re-render
  }
  
  // Otherwise, only re-render if the href or icon changes
  return prevProps.href === nextProps.href && prevProps.icon === nextProps.icon;
});

ResourceLink.displayName = 'ResourceLink';

// Create a stable version of the sidebar that doesn't re-render
const SidebarContent: React.FC<{
  navigation: NavigationItem[];
  pathname: string;
}> = React.memo(({ navigation, pathname }) => {
  // Use refs to maintain stable function references across renders
  const renderNavigationRef = useRef<any>(null);
  
  // Initialize the renderNavigation function only once
  if (!renderNavigationRef.current) {
    renderNavigationRef.current = (items: NavigationItem[], depth = 0) => {
      return (
        <>
          {items.map((item) => (
            <NavigationItem 
              key={item.slug}
              item={item}
              depth={depth}
              pathname={pathname}
              renderNavigation={renderNavigationRef.current}
            />
          ))}
        </>
      );
    };
  }

  // Create resources section
  const resourcesSection = (!(routes['/roadmap'] || routes['/changelog'])) ? null : (
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

  return (
    <>
      {renderNavigationRef.current(navigation, 0)}
      {resourcesSection}
    </>
  );
}, (prevProps, nextProps) => {
  // Only re-render if pathname changes or navigation changes
  return prevProps.pathname === nextProps.pathname && prevProps.navigation === nextProps.navigation;
});

SidebarContent.displayName = 'SidebarContent';

const Sidebar: React.FC<SidebarProps> = ({ initialNavigation, ...rest }) => {
  const [navigation, setNavigation] = useState<NavigationItem[]>(initialNavigation || []);
  const [hasLoaded, setHasLoaded] = useState(false);
  const pathname = usePathname();
  
  // Load navigation data only once, using global cache
  useEffect(() => {
    // Use initialNavigation if provided
    if (initialNavigation && initialNavigation.length > 0) {
      setNavigation(initialNavigation);
      globalNavigationCache = initialNavigation;
      setHasLoaded(true);
      return;
    }
    
    // Use global cache if available
    if (globalNavigationCache) {
      setNavigation(globalNavigationCache);
      setHasLoaded(true);
      return;
    }
    
    // Fetch only if not loaded and no global cache
    if (!hasLoaded) {
      fetch("/api/navigation")
        .then((res) => res.json())
        .then((data) => {
          setNavigation(data);
          globalNavigationCache = data; // Cache globally
          setHasLoaded(true);
        })
        .catch((err) => {
          console.error("Navigation fetch failed", err);
          setHasLoaded(true);
        });
    }
  }, [initialNavigation, hasLoaded]);

  // Create a stable container that doesn't change
  const containerStyle = useMemo(() => ({
    maxHeight: "calc(100vh - var(--static-space-80))"
  }), []);

  return (
    <Column 
      maxWidth={layout.sidebar.width} 
      position="sticky" 
      top="64" 
      fitHeight 
      gap="2" 
      as="nav" 
      overflowY="auto" 
      paddingRight="8" 
      style={containerStyle} 
      {...rest}
    >
      {hasLoaded && <SidebarContent navigation={navigation} pathname={pathname} />}
    </Column>
  );
};

// Use a custom comparison function for the entire Sidebar component
const MemoizedSidebar = React.memo(Sidebar, (prevProps, nextProps) => {
  // Only re-render if the initialNavigation changes
  return prevProps.initialNavigation === nextProps.initialNavigation;
});

MemoizedSidebar.displayName = 'MemoizedSidebar';

export { MemoizedSidebar as Sidebar };