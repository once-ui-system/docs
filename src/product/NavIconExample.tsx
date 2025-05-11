"use client";

import { NavIcon, Flex, Column, Logo, ToggleButton } from "@/once-ui/components";
import React, { useState } from "react";

export function NavIconToggle() {
  const [isActive, setIsActive] = useState(false);
  
  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <Column fillWidth>
      <Flex 
        paddingX="20" 
        paddingY="8" 
        background="surface"
        border="surface"
        radius="l" 
        horizontal="space-between" 
        vertical="center"
        fillWidth
      >
        <Logo wordmark={false}/>
        <NavIcon 
          isActive={isActive} 
          onClick={handleClick} 
          aria-label="Toggle navigation menu"
          aria-expanded={isActive}
          aria-controls="demo-nav"
        />
      </Flex>
      
      {isActive && (
        <Column 
          id="demo-nav"
          padding="16" 
          background="surface" 
          border="surface"
          radius="l" 
          marginTop="8"
          fillWidth
          gap="8"
        >
          <ToggleButton fillWidth horizontal="start" size="l">Home</ToggleButton>
          <ToggleButton fillWidth horizontal="start" size="l">Products</ToggleButton>
          <ToggleButton fillWidth horizontal="start" size="l">About</ToggleButton>
          <ToggleButton fillWidth horizontal="start" size="l">Contact</ToggleButton>
        </Column>
      )}
    </Column>
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

export function CustomNavIcon() {
  const [isActive, setIsActive] = useState(false);
  
  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <NavIcon 
      isActive={isActive} 
      onClick={handleClick}
      width="48"
      height="48"
      border="neutral-alpha-medium"
      background="neutral-strong"
      padding="8"
      radius="full"
    />
  );
}
