"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
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

// Memoized navigation item component to prevent re-renders
const NavigationItemComponent: React.FC<{
  item: NavigationItem;
  depth: number;
  pathname: string;
  renderNavigation: (items: NavigationItem[], depth: number) => React.ReactNode;
}> = ({ item, depth, pathname, renderNavigation }) => {
  const correctedSlug = item.slug;
  
  // Extract the path segments for better matching
  const pathSegments = pathname.split('/').filter(Boolean);
  
  // For top-level directories, check if their name is in the pathname segments
  // This will match routes like "/once-ui/quick-start" for the "once-ui" parent
  const isTopLevelMatch = depth === 0 && 
                          pathSegments.length >= 2 && 
                          pathSegments[0] === 'docs' && 
                          correctedSlug.split('/')[0] === pathSegments[1];
  
  // For deeper items, check for exact match or if it's a parent path
  const isExactMatch = pathname === `/${correctedSlug}`;
  const isParentPath = pathname.startsWith(`/${correctedSlug}/`);
  
  // Only consider exact matches for selection, not parent paths
  const isSelected = isExactMatch;
  
  // Use this for accordion open state - if it's a parent or exact match
  const isActive = isExactMatch || isParentPath || isTopLevelMatch;
  
  // Check if the current path is within this section by comparing path segments
  // This is more reliable for deeper nested routes
  const isPathWithinSection = (() => {
    // Skip this check for empty paths
    if (!correctedSlug) return false;
    
    const sectionSegments = correctedSlug.split('/').filter(Boolean);
    
    // If there aren't enough segments in the path, it can't be within this section
    if (pathSegments.length < sectionSegments.length) return false;
    
    // Check if all section segments match the corresponding path segments
    for (let i = 0; i < sectionSegments.length; i++) {
      if (pathSegments[i] !== sectionSegments[i]) {
        return false;
      }
    }
    
    return true;
  })();
  
  // For accordion sections, check if any child's path is in the current URL
  const hasActiveChild = item.children?.some(child => {
    const childSlug = child.slug;
    const childSegments = childSlug.split('/').filter(Boolean);
    
    // Check if the pathname segments match this child's segments
    if (pathSegments.length >= childSegments.length) {
      for (let i = 0; i < childSegments.length; i++) {
        if (pathSegments[i] !== childSegments[i]) {
          return false;
        }
      }
      return true;
    }
    
    return false;
  });
  
  // Check if current section should be open based on path matching
  // This ensures the section is open when arriving at a page within this section
  const shouldBeOpen = isSelected || hasActiveChild || isParentPath || isPathWithinSection;

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
            open={shouldBeOpen}
            title={
              <Row textVariant="label-strong-s" onBackground="brand-strong">
                {item.title}
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
                  {item.title}
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
      horizontal="space-between"
      selected={isSelected}
      className={depth === 0 ? styles.navigation : undefined}
      href={`/${correctedSlug}`}>
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
      horizontal="space-between"
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
  // Create a render function that captures the current pathname
  const renderNavigation = (items: NavigationItem[], depth = 0) => {
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
  };

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
      {renderNavigation(navigation, 0)}
      {resourcesSection}
    </>
  );
}, (prevProps, nextProps) => {
  // Always re-render if pathname changes
  if (prevProps.pathname !== nextProps.pathname) {
    return false; // Different pathname means we should re-render
  }
  
  // Otherwise, only re-render if navigation changes
  return prevProps.navigation === nextProps.navigation;
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
      width={layout.sidebar.width} 
      minWidth={layout.sidebar.width} 
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
      {hasLoaded && <SidebarContent key={pathname} navigation={navigation} pathname={pathname} />}
    </Column>
  );
};

// Use a custom comparison function for the entire Sidebar component
const MemoizedSidebar = React.memo(Sidebar, (prevProps, nextProps) => {
  // Only re-render if the initialNavigation changes
  // The component will re-render when pathname changes via usePathname hook internally
  return prevProps.initialNavigation === nextProps.initialNavigation;
});

MemoizedSidebar.displayName = 'MemoizedSidebar';

export { MemoizedSidebar as Sidebar };