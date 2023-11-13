"use client";
import Link from "next-intl/link";
import { useLocale } from "next-intl";
import { Vn, Us } from "react-country-flags-select";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMemo } from "react";

const languages = [
  {
    name: "English",
    code: "en",
    icon: <Us fontSize={20} />,
  },
  {
    name: "Việt Nam",
    code: "vn",
    icon: <Vn fontSize={20} />,
  },
];

export default function SwitcherLanguage() {
    const locale = useLocale();
    const findCurrentLocale = useMemo(() => {
        return languages.find((item) => item.code === locale)
    }, [locale]);
    
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <div className="mr-2">
              {findCurrentLocale?.icon}
            </div>
            {findCurrentLocale?.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {languages.map((item) => (
            <DropdownMenuItem key={item.code}>
              <Link
                href="/"
                locale={item.code}
                className="flex justify-center items-center"
              >
                <div className="mr-2">{item.icon}</div>
                {item.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
