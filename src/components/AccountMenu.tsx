import {
  Github,
  Keyboard,
  LogOut,
  Settings,
  Sun,
  MoonStar,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { cn } from "~/lib/utils";

type AccountMenuProps = {
  theme: string | undefined;
  toggleTheme: () => void;
};

export function AccountMenu({ theme, toggleTheme }: AccountMenuProps) {
  const { data: sessionData } = useSession();

  return (
    <div className={cn({ hidden: !sessionData?.user })}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <div className="h-9 w-9 overflow-hidden rounded-lg outline transition hover:scale-110">
            <Image
              src={sessionData?.user.image || ""}
              width={36}
              height={36}
              alt="User's Github Profile Picture"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {sessionData?.user.name}
              </p>
              <p className="text-xsm leading-none text-muted-foreground">
                {sessionData?.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Keyboard className="mr-2 h-4 w-4" />
              <span>Keyboard shortcuts</span>
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="md:hidden" onClick={toggleTheme}>
            {theme === "light" ? (
              <Sun className="mr-2 h-4 w-4" />
            ) : (
              <MoonStar className="mr-2 h-4 w-4" />
            )}
            <span>Change theme</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => void signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
