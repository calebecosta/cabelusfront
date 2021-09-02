import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'docs',
    icon: 'iconsminds-check',
    label: 'menu.agendamentos',
    to: `${adminRoot}/agendamentos`,
  },
  {
    id: 'dashboard',
    icon: 'iconsminds-dashboard',
    label: 'menu.dashboard',
    to: `${adminRoot}/dashboard`,
    roles: 6, 
  },
  {
    id: 'servicos',
    icon: 'iconsminds-dashboard',
    label: 'menu.servicos',
    to: `${adminRoot}/servicos`,
    roles: 7, 
  },
  {
    id: 'colaboradores',
    icon: 'iconsminds-business-mens',
    label: 'menu.colaboradores',
    to: `${adminRoot}/colaboradores`,
    roles: 4, 
  },
  {
    id: 'clientes',
    icon: 'iconsminds-business-mens',
    label: 'menu.clientes',
    to: `${adminRoot}/clientes`,
    roles: 5, 
  },
  {
    id: 'perfil',
    icon: 'iconsminds-profile',
    label: 'menu.meu-perfil',
    to: `${adminRoot}/meu-perfil`,
    roles: 1, 
  },
  {
    id: 'calendar',
    icon: 'iconsminds-calendar-4',
    label: 'menu.calendar',
    to: `${adminRoot}/agendamentos/calendario`,
    roles: 8, 
  },
];
export default data;
