/* eslint-disable import/no-cycle */
import { UserRole } from '../helpers/authHelper';
import { getCurrentUser } from '../helpers/Utils';

/*
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = 'menu-default';

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = 'en';
export const localeOptions = [
  { id: 'en', name: 'English - LTR', direction: 'ltr' },
  { id: 'es', name: 'Español', direction: 'ltr' },
  { id: 'enrtl', name: 'English - RTL', direction: 'rtl' },
];

export const firebaseConfig = {
  apiKey: 'AIzaSyBBksq-Asxq2M4Ot-75X19IyrEYJqNBPcg',
  authDomain: 'gogo-react-login.firebaseapp.com',
  databaseURL: 'https://gogo-react-login.firebaseio.com',
  projectId: 'gogo-react-login',
  storageBucket: 'gogo-react-login.appspot.com',
  messagingSenderId: '216495999563',
};

export const adminRoot = '/app';
export const buyUrl = '';
export const searchPath = `${adminRoot}/pages/miscellaneous/search`;
export const servicePath = process.env.REACT_APP_API_URL;
export const serviceMeetPath = process.env.REACT_APP_API_MEET_URL;
export const serviceMeetBearer = process.env.REACT_APP_API_MEET_BEARER;
export const imgPreview = `${servicePath}/img`;

// export const servicePath = 'https://api.coloredstrategies.com';

const user = getCurrentUser();
if (user) {
  const { id, nome, avatar = 'sem-foto.png' } = user;
}
export const currentUser = {
  id: 0,
  title: '',
  img: '',
  date: 'Último acesso hoje às 15:24',
  role: UserRole.Admin,
};


export const themeColorStorageKey = '__theme_selected_color';
export const isMultiColorActive = true;
export const defaultColor = 'light.greenlime';
export const isDarkSwitchActive = true;
export const defaultDirection = 'ltr';
export const themeRadiusStorageKey = '__theme_radius';
export const isAuthGuardActive = true;
export const colors = [
  'bluenavy',
  'blueyale',
  'blueolympic',
  'greenmoss',
  'greenlime',
  'purplemonster',
  'orangecarrot',
  'redruby',
  'yellowgranola',
  'greysteel',
];
