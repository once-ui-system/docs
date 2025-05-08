"use client";

import React from "react";
import { Table, Row, InlineCode, Text } from "@/once-ui/components";
import { ReactNode } from "react";

type PropType = string | string[] | ReactNode;
type PropData = [string, PropType, string?];

interface PropsTableProps {
  content: PropData[];
}

function PropsTable({ content }: PropsTableProps) {
  const tableData = {
    headers: [
      { content: "Prop", key: "prop", sortable: true },
      { content: "Type", key: "type", sortable: false },
      { content: "Default", key: "default", sortable: false },
    ],
    rows: content.map((propData) => {
      // First item is always the prop name
      const propName = propData[0];
      
      // Second item is the type
      const propType = propData[1];
      
      // Third item (if exists) is the default value
      const defaultValue = propData.length > 2 ? propData[2] : "-";
      
      // Render type differently based on whether it's an array or string
      let typeDisplay: ReactNode;
      if (Array.isArray(propType)) {
        typeDisplay = (
          <Row gap="4" wrap>
            {(propType as string[]).map((value, index) => (
              <React.Fragment key={index}><InlineCode>{value}</InlineCode> {index < (propType as string[]).length - 1 && <Text onBackground="neutral-weak" marginX="2">•</Text>}</React.Fragment>
            ))}
          </Row>
        );
      } else {
        typeDisplay = <InlineCode>{propType}</InlineCode>;
      }
      
      // Render default value with InlineCode if it exists
      const defaultDisplay = defaultValue === "-" ? <Text onBackground="neutral-weak">—</Text> : <InlineCode>{defaultValue}</InlineCode>;
      
      return [propName, typeDisplay, defaultDisplay];
    }),
  };

  return <Table marginTop="16" marginBottom="24" data={tableData} />;
}

export { PropsTable };
