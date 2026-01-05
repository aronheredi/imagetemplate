
import { useAuth } from "@/hooks/useAuth";
import * as Dialog from "@radix-ui/react-dialog";
import { GearIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "@radix-ui/themes";
import { Avatar, IconButton } from "@radix-ui/themes";
import { LogOutIcon, Settings } from "lucide-react";

export const ProfileIconButton = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger >
                <IconButton variant="ghost" size="2" radius="full">
                    <Avatar
                        src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMGljb258ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                        alt="Profile Picture"
                        size="4" fallback={user.name?.charAt(0).toUpperCase() || "U"} />
                </IconButton>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content align="start" className="text-start">
                <div>
                    <h1 className="text-sm font-semibold text-slate-900">{user.name}</h1>
                    <p className="text-xs text-slate-500">{user.email}</p>
                </div>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                    <Settings className="mr-1 " size={17} />
                    Settings</DropdownMenu.Item>

                <DropdownMenu.Item onClick={() => logout()}>
                    <LogOutIcon className="mr-1" size={17} />
                    Logout</DropdownMenu.Item>
            </DropdownMenu.Content>

        </DropdownMenu.Root>
    );
}