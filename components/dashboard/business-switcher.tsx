"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Store, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Business } from "@/lib/types";

interface BusinessSwitcherProps {
  businesses: Business[];
  currentBusinessId?: string;
}

export function BusinessSwitcher({ businesses, currentBusinessId }: BusinessSwitcherProps) {
  const router = useRouter();

  const currentBusiness = businesses.find((b) => b.id === currentBusinessId) || businesses[0];

  if (!businesses || businesses.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Select a business"
          className="w-full sm:w-[260px] justify-between shadow-sm"
        >
          <div className="flex items-center truncate">
            <Store className="mr-2 h-4 w-4 shrink-0 text-primary" />
            <span className="truncate font-medium">{currentBusiness?.name || "Select business"}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full sm:w-[260px]" align="end">
        {businesses.map((business) => (
          <DropdownMenuItem
            key={business.id}
            onSelect={() => router.push(`/protected/dashboard/${business.id}`)}
            className="flex items-center justify-between cursor-pointer py-2 px-3"
          >
            <div className="flex flex-col truncate">
              <span className="font-medium truncate">{business.name}</span>
              <span className="text-xs text-muted-foreground capitalize">
                {business.type.replace("_", " ")}
              </span>
            </div>
            {currentBusinessId === business.id && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => router.push("/protected/dashboard/create")}
          className="cursor-pointer py-2 px-3 text-primary focus:text-primary flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add New Petrol Pump</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
