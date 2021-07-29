import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'docs',
    icon: 'iconsminds-check',
    label: 'menu.agendamentos',
    to: `${adminRoot}/agendamentos`,
    role: ['adm', 'cli', 'col'],
    // subs: [
    //   {
    //     label: 'menu.meus-agendamentos',
    //     to: `${adminRoot}/agendamentos`,
    //   },
    //   {
    //     label: 'dashboards.calendar',
    //     to: `${adminRoot}/agendamentos/calendario`,
    //   },
    // ],
  },
  {
    id: 'colaboradores',
    icon: 'iconsminds-business-mens',
    label: 'menu.colaboradores',
    to: `${adminRoot}/colaboradores`,
    role: ['adm'],
  },
  {
    id: 'clientes',
    icon: 'iconsminds-business-mens',
    label: 'menu.clientes',
    to: `${adminRoot}/clientes`,
    role: ['adm'],
  },
  {
    id: 'perfil',
    icon: 'iconsminds-profile',
    label: 'menu.meu-perfil',
    to: `${adminRoot}/meu-perfil`,
    role: ['adm', 'col', 'cli'],
  },

];
export default data;
