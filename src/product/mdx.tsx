import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";
import dynamic from "next/dynamic";

import {
  Media,
  SmartLink,
  Text,
  InlineCode,
  Grid,
  Flex,
  Column,
  Row,
  Button,
  Card,
  Heading,
  Icon,
  Table,
} from "@/once-ui/components";
import * as onceComponents from "@/once-ui/components";
import * as onceModules from "@/once-ui/modules";
import { CodeBlock } from "@/once-ui/modules/code/CodeBlock";
import { PropsTable } from "@/product/PropsTable";
import { TextProps } from "@/once-ui/interfaces";
import { MediaProps } from "@/once-ui/components/Media";
import { HeadingLink } from "@/once-ui/modules";
import { ClientOption } from "@/product/ClientOption";

import { BasicDialog, DialogWithFooter, StackedDialogs, CustomizedDialog } from "./DialogExample";
import { BasicDropdown, DropdownWithIcons, CustomPositionDropdown, SearchableDropdown } from "./DropdownWrapperExample";
import { BasicRawDropdown, IconsRawDropdown, DescriptionRawDropdown, CustomStyledRawDropdown } from "./DropdownExample";
import { NavIconToggle, NavIconStates, CustomNavIcon } from "./NavIconExample";
import { BasicSwitch, SwitchWithFeedback, SwitchWithLoading, ReversedSwitch, ClientSwitch } from "./SwitchExample";
import { IndeterminateCheckboxExample } from "./CheckboxExample";
import { SubscriptionRadioGroup } from "./RadioButtonExample";
import { 
  SearchInput, 
  ValidationInputExample, 
  ColorInputExample, 
  DateInputExample, 
  DateTimeInputExample,
  NumberInputExample,
  OTPInputExample,
  PasswordInputExample,
  TagInputExample
} from "./InputExamples";
import { BasicDatePickerExample, DateTimePickerExample, DateRangePickerExample, DateRangePickerPresetsExample } from "./DatePickerExamples";
import { BasicDateRangeInputExample, CustomLabelDateRangeInputExample } from "./DateRangeInputExamples";
import { BasicChipExample, ChipWithIconsExample, RemovableChipsExample, CustomRemovableChipExample, InteractiveChipExample } from "./ChipExamples";
import { InteractiveDetailsExample, FormControlsExample, TooltipExample } from "./InteractiveDetailsExamples";
import { ValidationTextareaExample } from "./TextareaExamples";
import { PageList } from "./PageList";

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

function createImage({ alt, src, ...props }: MediaProps & { src: string }) {
  if (!src) {
    console.error("Media requires a valid 'src' property.");
    return null;
  }

  return (
    <Media
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
  // Use HeadingLinkProps to ensure type compatibility
  const CustomHeading = ({ children, ...props }: Omit<React.ComponentProps<typeof HeadingLink>, 'as' | 'id'>) => {
    const slug = slugify(children as string);
    return (
      <HeadingLink
        marginTop="24"
        marginBottom="12"
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
        codes={[
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

// Import specific modules we need, excluding Meta which isn't a valid MDX component
const { Meta, ...otherOnceModules } = onceModules;

const components = {
  ...onceComponents,
  ...otherOnceModules,
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
  Media,
  SmartLink,
  Row,
  Column,
  Grid,
  Flex,
  Button,
  Card, 
  Heading,
  Icon,
  Table,
  PropsTable,
  BasicDialog,
  DialogWithFooter,
  StackedDialogs,
  CustomizedDialog,
  BasicDropdown,
  DropdownWithIcons,
  CustomPositionDropdown,
  SearchableDropdown,
  BasicRawDropdown,
  IconsRawDropdown,
  DescriptionRawDropdown,
  CustomStyledRawDropdown,
  NavIconToggle,
  NavIconStates,
  CustomNavIcon,
  BasicSwitch,
  SwitchWithFeedback,
  SwitchWithLoading,
  ReversedSwitch,
  ClientSwitch,
  IndeterminateCheckboxExample,
  SubscriptionRadioGroup,
  SearchInput,
  ValidationInputExample,
  ColorInputExample,
  DateInputExample,
  DateTimeInputExample,
  NumberInputExample,
  OTPInputExample,
  PasswordInputExample,
  TagInputExample,
  BasicDatePickerExample,
  DateTimePickerExample,
  DateRangePickerExample,
  DateRangePickerPresetsExample,
  BasicDateRangeInputExample,
  CustomLabelDateRangeInputExample,
  BasicChipExample,
  ChipWithIconsExample,
  RemovableChipsExample,
  CustomRemovableChipExample,
  InteractiveChipExample,
  ClientOption,
  InteractiveDetailsExample,
  FormControlsExample,
  TooltipExample,
  ValidationTextareaExample,
  Schema: dynamic(() => import("@/once-ui/modules").then(mod => mod.Schema), { ssr: true }),
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />
  );
}