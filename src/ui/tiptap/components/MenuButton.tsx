import { MenubarMenu } from '@radix-ui/react-menubar';
import {
  MenubarContent,
  MenubarItem,
  MenubarTrigger,
  RadixMenu,
} from '@/src/ui/tiptap/components/RadixMenu';
import React, { ReactNode } from 'react';

type ButtonType = {
  icon: ReactNode;
  onClick?: () => void;
  disable?: boolean;
  isActive: string;
};

interface ItemType extends ButtonType {
  name: string;
  split?: boolean;
}

interface SubItemType extends ItemType {
  subMenu: (editor: any) => { name: string; action: () => any }[];
}

const Button = ({ icon, onClick, disable, isActive }: ButtonType) => {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      className={`${disable ? 'cursor-not-allowed' : 'cursor-pointer hover:rounded-lg hover:bg-gray-500'} p-1 ${isActive || ''}`}
      type="button"
    >
      {icon}
    </button>
  );
};

const MenuButton = ({ item }: { item: ItemType }) => {
  const {
    name,
    onClick,
    icon,
    isActive,
    split = false,
    disable = false,
  } = item;

  return (
    <div className="flex h-full items-center gap-1" key={name}>
      <Button
        onClick={onClick}
        icon={icon}
        isActive={isActive}
        disable={disable}
      />
      {split && <div className="mx-1 flex h-6 w-[1px] bg-gray-500" />}
    </div>
  );
};

const MenuInSubButton = (props: { item: SubItemType; editor: any }) => {
  const {
    name,
    icon,
    isActive,
    split = false,
    disable = false,
    subMenu,
  } = props.item;

  return (
    <RadixMenu className="border-none bg-transparent" key={name}>
      <MenubarMenu>
        <MenubarTrigger
          className={`${isActive || ''} p-1.5 ${disable ? 'cursor-not-allowed' : 'cursor-pointer hover:rounded-lg hover:bg-gray-500'}`}
          disabled={disable}
        >
          {icon}
        </MenubarTrigger>
        {split && <div className="mx-1 flex h-6 w-[1px] bg-gray-500" />}
        <MenubarContent>
          {subMenu({ editor: props.editor }).map((menuItem) => (
            <MenubarItem key={menuItem.name} onClick={menuItem.action}>
              {menuItem.name}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </RadixMenu>
  );
};

export { MenuButton, MenuInSubButton };
