import { DotsVerticalIcon } from "@radix-ui/react-icons"
import { DropdownMenu, IconButton } from "@radix-ui/themes"
interface ActionsPopoverProps {
    onEdit?: () => void;
    onDelete?: () => void;
}
export const ActionsPopover = ({ onEdit, onDelete }: ActionsPopoverProps) => {
    return (
        <DropdownMenu.Root >
            <DropdownMenu.Trigger>
                <IconButton variant="ghost">
                    <DotsVerticalIcon />
                </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
                <DropdownMenu.Item onSelect={onEdit}>Edit</DropdownMenu.Item>
                <DropdownMenu.Item color="red" onSelect={onDelete}>Delete</DropdownMenu.Item>

            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}