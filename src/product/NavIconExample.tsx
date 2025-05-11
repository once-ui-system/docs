"use client";

import { NavIcon } from "@/once-ui/components";
import React, { useState } from "react";
import { Flex } from "@/once-ui/components";

// Client-side wrapper for the NavIcon component to be used in MDX documentation
export function NavIconToggle() {
  const [isActive, setIsActive] = useState(false);
  
  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <Flex horizontal="center" gap="16">
      <NavIcon isActive={isActive} onClick={handleClick} />
    </Flex>
  );
}

export function NavIconStates() {
  return (
    <Flex horizontal="center" gap="16">
      <NavIcon isActive={false} />
      <NavIcon isActive={true} />
    </Flex>
  );
}
