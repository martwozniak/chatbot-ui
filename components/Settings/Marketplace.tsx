import { IconFileImport, IconBuildingStore } from '@tabler/icons-react';
import { FC } from 'react';

import { useTranslation } from 'next-i18next';

import { SidebarButton } from '../Sidebar/SidebarButton';

interface Props {}

export const Marketplace: FC<Props> = () => {
  const { t } = useTranslation('sidebar');
  return (
    <>
      <SidebarButton
        text={t('Marketplace')}
        icon={<IconBuildingStore size={18} />}
        onClick={() => {
          console.log("User tried to open Marketplace")
        }}
      />
    </>
  );
};