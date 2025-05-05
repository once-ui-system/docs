import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";
import dynamic from "next/dynamic";

import {
  SmartImage,
  SmartLink,
  Text,
  InlineCode,
} from "@/once-ui/components";
import { CodeBlock } from "@/once-ui/modules/code/CodeBlock";
import { TextProps } from "@/once-ui/interfaces";
import { SmartImageProps } from "@/once-ui/components/SmartImage";
import { HeadingLink } from "@/once-ui/modules";

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <SmartLink href={href} {...props}>
        {children}
      </SmartLink>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function createImage({ alt, src, ...props }: SmartImageProps & { src: string }) {
  if (!src) {
    console.error("SmartImage requires a valid 'src' property.");
    return null;
  }

  return (
    <SmartImage
      marginTop="8"
      marginBottom="16"
      enlarge
      radius="m"
      aspectRatio="16 / 9"
      border="neutral-alpha-medium"
      sizes="(max-width: 960px) 100vw, 960px"
      alt={alt}
      src={src}
      {...props}
    />
  );
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const CustomHeading = ({ children, ...props }: TextProps<typeof as>) => {
    const slug = slugify(children as string);
    return (
      <HeadingLink
        style={{ marginTop: "var(--static-space-24)", marginBottom: "var(--static-space-12)" }}
        as={as}
        id={slug}
        {...props}
      >
        {children}
      </HeadingLink>
    );
  };

  CustomHeading.displayName = `${as}`;

  return CustomHeading;
}

function createParagraph({ children }: TextProps) {
  return (
    <Text
      style={{ lineHeight: "175%" }}
      variant="body-default-m"
      onBackground="neutral-medium"
      marginTop="8"
      marginBottom="12"
    >
      {children}
    </Text>
  );
}

function createInlineCode({ children }: { children: ReactNode }) {
  return <InlineCode>{children}</InlineCode>;
}

function createCodeBlock(props: any) {
  // For pre tags that contain code blocks
  if (props.children && props.children.props && props.children.props.className) {
    const { className, children } = props.children.props;
    
    // Extract language from className (format: language-xxx)
    const language = className.replace('language-', '');
    const label = language.charAt(0).toUpperCase() + language.slice(1);
    
    return (
      <CodeBlock
        marginTop="8"
        marginBottom="16"
        codePreview={children}
        codeInstances={[
          {
            code: children,
            language,
            label
          }
        ]}
        copyButton={true}
      />
    );
  }
  
  // Fallback for other pre tags or empty code blocks
  return <pre {...props} />;
}

const components = {
  p: createParagraph as any,
  h1: createHeading("h1") as any,
  h2: createHeading("h2") as any,
  h3: createHeading("h3") as any,
  h4: createHeading("h4") as any,
  h5: createHeading("h5") as any,
  h6: createHeading("h6") as any,
  img: createImage as any,
  a: CustomLink as any,
  code: createInlineCode as any,
  pre: createCodeBlock as any,
  Text,
  CodeBlock,
  InlineCode,
  Accordion: dynamic(() => import("@/once-ui/components").then(mod => mod.Accordion)),
  AccordionGroup: dynamic(() => import("@/once-ui/components").then(mod => mod.AccordionGroup)),
  Arrow: dynamic(() => import("@/once-ui/components").then(mod => mod.Arrow)),
  Avatar: dynamic(() => import("@/once-ui/components").then(mod => mod.Avatar)),
  AvatarGroup: dynamic(() => import("@/once-ui/components").then(mod => mod.AvatarGroup)),
  Background: dynamic(() => import("@/once-ui/components").then(mod => mod.Background)),
  Badge: dynamic(() => import("@/once-ui/components").then(mod => mod.Badge)),
  Banner: dynamic(() => import("@/once-ui/components").then(mod => mod.Banner)),
  Button: dynamic(() => import("@/once-ui/components").then(mod => mod.Button)),
  Card: dynamic(() => import("@/once-ui/components").then(mod => mod.Card)),
  Carousel: dynamic(() => import("@/once-ui/components").then(mod => mod.Carousel)),
  Checkbox: dynamic(() => import("@/once-ui/components").then(mod => mod.Checkbox)),
  Chip: dynamic(() => import("@/once-ui/components").then(mod => mod.Chip)),
  ColorInput: dynamic(() => import("@/once-ui/components").then(mod => mod.ColorInput)),
  Column: dynamic(() => import("@/once-ui/components").then(mod => mod.Column)),
  CompareImage: dynamic(() => import("@/once-ui/components").then(mod => mod.CompareImage)),
  CursorCard: dynamic(() => import("@/once-ui/components").then(mod => mod.CursorCard)),
  DateInput: dynamic(() => import("@/once-ui/components").then(mod => mod.DateInput)),
  DatePicker: dynamic(() => import("@/once-ui/components").then(mod => mod.DatePicker)),
  DateRangeInput: dynamic(() => import("@/once-ui/components").then(mod => mod.DateRangeInput)),
  DateRangePicker: dynamic(() => import("@/once-ui/components").then(mod => mod.DateRangePicker)),
  Dialog: dynamic(() => import("@/once-ui/components").then(mod => mod.Dialog)),
  Dropdown: dynamic(() => import("@/once-ui/components").then(mod => mod.Dropdown)),
  DropdownWrapper: dynamic(() => import("@/once-ui/components").then(mod => mod.DropdownWrapper)),
  ElementType: dynamic(() => import("@/once-ui/components").then(mod => mod.ElementType)),
  Fade: dynamic(() => import("@/once-ui/components").then(mod => mod.Fade)),
  Feedback: dynamic(() => import("@/once-ui/components").then(mod => mod.Feedback)),
  Flex: dynamic(() => import("@/once-ui/components").then(mod => mod.Flex)),
  GlitchFx: dynamic(() => import("@/once-ui/components").then(mod => mod.GlitchFx)),
  Grid: dynamic(() => import("@/once-ui/components").then(mod => mod.Grid)),
  Heading: dynamic(() => import("@/once-ui/components").then(mod => mod.Heading)),
  HoloFx: dynamic(() => import("@/once-ui/components").then(mod => mod.HoloFx)),
  Icon: dynamic(() => import("@/once-ui/components").then(mod => mod.Icon)),
  IconButton: dynamic(() => import("@/once-ui/components").then(mod => mod.IconButton)),
  Input: dynamic(() => import("@/once-ui/components").then(mod => mod.Input)),
  InteractiveDetails: dynamic(() => import("@/once-ui/components").then(mod => mod.InteractiveDetails)),
  Kbd: dynamic(() => import("@/once-ui/components").then(mod => mod.Kbd)),
  LetterFx: dynamic(() => import("@/once-ui/components").then(mod => mod.LetterFx)),
  Line: dynamic(() => import("@/once-ui/components").then(mod => mod.Line)),
  Logo: dynamic(() => import("@/once-ui/components").then(mod => mod.Logo)),
  LogoCloud: dynamic(() => import("@/once-ui/components").then(mod => mod.LogoCloud)),
  NavIcon: dynamic(() => import("@/once-ui/components").then(mod => mod.NavIcon)),
  NumberInput: dynamic(() => import("@/once-ui/components").then(mod => mod.NumberInput)),
  OgCard: dynamic(() => import("@/once-ui/components").then(mod => mod.OgCard)),
  Option: dynamic(() => import("@/once-ui/components").then(mod => mod.Option)),
  OTPInput: dynamic(() => import("@/once-ui/components").then(mod => mod.OTPInput)),
  PasswordInput: dynamic(() => import("@/once-ui/components").then(mod => mod.PasswordInput)),
  RadioButton: dynamic(() => import("@/once-ui/components").then(mod => mod.RadioButton)),
  RevealFx: dynamic(() => import("@/once-ui/components").then(mod => mod.RevealFx)),
  Row: dynamic(() => import("@/once-ui/components").then(mod => mod.Row)),
  Scoller: dynamic(() => import("@/once-ui/components").then(mod => mod.Scroller)),
  ScrollToTop: dynamic(() => import("@/once-ui/components").then(mod => mod.ScrollToTop)),
  SegmentedControl: dynamic(() => import("@/once-ui/components").then(mod => mod.SegmentedControl)),
  Select: dynamic(() => import("@/once-ui/components").then(mod => mod.Select)),
  Skeleton: dynamic(() => import("@/once-ui/components").then(mod => mod.Skeleton)),
  SmartImage: dynamic(() => import("@/once-ui/components").then(mod => mod.SmartImage)),
  SmartLink: dynamic(() => import("@/once-ui/components").then(mod => mod.SmartLink)),
  Spinner: dynamic(() => import("@/once-ui/components").then(mod => mod.Spinner)),
  StatusIndicator: dynamic(() => import("@/once-ui/components").then(mod => mod.StatusIndicator)),
  StylePanel: dynamic(() => import("@/once-ui/components").then(mod => mod.StylePanel)),
  StyleOverlay: dynamic(() => import("@/once-ui/components").then(mod => mod.StyleOverlay)),
  Switch: dynamic(() => import("@/once-ui/components").then(mod => mod.Switch)),
  Table: dynamic(() => import("@/once-ui/components").then(mod => mod.Table)),
  Tag: dynamic(() => import("@/once-ui/components").then(mod => mod.Tag)),
  TagInput: dynamic(() => import("@/once-ui/components").then(mod => mod.TagInput)),
  Textarea: dynamic(() => import("@/once-ui/components").then(mod => mod.Textarea)),
  TiltFx: dynamic(() => import("@/once-ui/components").then(mod => mod.TiltFx)),
  Toast: dynamic(() => import("@/once-ui/components").then(mod => mod.Toast)),
  Toaster: dynamic(() => import("@/once-ui/components").then(mod => mod.Toaster)),
  ToastProvider: dynamic(() => import("@/once-ui/components").then(mod => mod.ToastProvider)),
  ThemeSwitcher: dynamic(() => import("@/once-ui/components").then(mod => mod.ThemeSwitcher)),
  ThemeProvider: dynamic(() => import("@/once-ui/components").then(mod => mod.ThemeProvider)),
  ToggleButton: dynamic(() => import("@/once-ui/components").then(mod => mod.ToggleButton)),
  Tooltip: dynamic(() => import("@/once-ui/components").then(mod => mod.Tooltip)),
  User: dynamic(() => import("@/once-ui/components").then(mod => mod.User)),
  UserMenu: dynamic(() => import("@/once-ui/components").then(mod => mod.UserMenu)),
  PageList: dynamic(() => import("@/product/PageList").then(mod => mod.PageList)),
  Kbar: dynamic(() => import("@/once-ui/modules").then(mod => mod.Kbar)),
  Schema: dynamic(() => import("@/once-ui/modules").then(mod => mod.Schema)),
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />
  );
}
