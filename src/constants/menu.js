import { adminRoot } from './defaultValues';

const data = [

  {
    id: 'docs',
    icon: 'iconsminds-check',
    label: 'menu.agendamentos',
    to: `${adminRoot}/agendamentos`,
    subs: [
      {
        label: 'menu.meus-agendamentos',
        to: `${adminRoot}/agendamentos`,
      },
      {
        label: 'dashboards.calendar',
        to: `${adminRoot}/agendamentos/calendario`,
      },
    ],
  },
  {
    id: 'blankpage',
    icon: 'iconsminds-yes',
    label: 'menu.novo-agendamento',
    to: `${adminRoot}/agendamentos/novo`,
  },
  {
    id: 'perfil',
    icon: 'iconsminds-profile',
    label: 'menu.meu-perfil',
    to: `${adminRoot}/meu-perfil`,
    role: ['adm', 'teste'],
  },
  {
    id: 'colaboradores',
    icon: 'iconsminds-business-mens',
    label: 'menu.colaboradores',
    to: `${adminRoot}/colaboradores`,
    role: ['adm'],
  },

];
export default data;
