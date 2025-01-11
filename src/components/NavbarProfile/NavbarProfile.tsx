"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/utils/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";


const components: { title: string; href: string; description: string, handleClick?: () => void }[] = [
  {
    title: "username",
    href: "/profile",
    description:
      "View profile",
  },
  {
    title: "List",
    href: "/list",
    description:
      "",
  },
  {
    title: "Rating",
    href: "/rating-movie",
    description:
      "",
  },
  {
    title: "Watchlist",
    href: "/watchList",
    description: "",
  },
  {
    title: "Favourite list",
    href: "/favourite-list",
    description:
      "",
  },
  {
    title: "Logout",
    href: "/logout",
    description:
      "",
    },
]

export function NavbarProfile({username, handleLogout} : {username: string, handleLogout: () => void}) {

    components[0].title = username;
    components[components.length - 1].handleClick = handleLogout;
    return (
        <NavigationMenu className="bg-transparent bg-opacity-30 backdrop-blur-md rounded-md text-white">
        <NavigationMenuList>
            <NavigationMenuItem>
            <NavigationMenuTrigger>
                <FontAwesomeIcon icon={faUser} className="text-xl" />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className="grid text-start w-[100px] gap-3 p-4 md:w-[150px] md:grid-cols-1 lg:w-[250px] ">
                {
                    components.map((component, index: number) => (
                        !component.handleClick ?
                        (
                            <ListItem
                                key={component.title}
                                title={component.title}
                                href={component.href}
                            >
                                {component.description}
                            </ListItem>
                        ) : (
                            <ButonListItem
                                key={component.title}
                                title={component.title}
                                onClick={component.handleClick}
                            >
                                {component.description}
                            </ButonListItem>
                        )
                    ))
                }

                </ul>
            </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, onClick, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-1 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          onClick={onClick}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


const ButonListItem = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button">
>(({ className, title, children, onClick, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <button
          className={cn(
            "block select-none space-y-1 rounded-md p-1 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          onClick={onClick}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </button>
      </NavigationMenuLink>
    </li>
  )
})
ButonListItem.displayName = "ButonListItem"


export default NavbarProfile;