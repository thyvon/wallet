import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiReact,
} from '@mdi/js'

export default [
  {
    route: 'dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  // {
  //   route: 'tables.index',
  //   label: 'Tables',
  //   icon: mdiTable,
  // },
  // {
  //   route: 'forms.index',
  //   label: 'Forms',
  //   icon: mdiSquareEditOutline,
  // },
  // {
  //   route: 'ui.index',
  //   label: 'UI',
  //   icon: mdiTelevisionGuide,
  // },
  // {
  //   route: 'responsive.index',
  //   label: 'Responsive',
  //   icon: mdiResponsive,
  // },
  // {
  //   route: 'styles.index',
  //   label: 'Styles',
  //   icon: mdiPalette,
  // },
  {
    route: 'profile.show',
    label: 'Profile',
    icon: mdiAccountCircle,
  },
  {
    route: 'login',
    label: 'Login',
    icon: mdiLock,
  },
  // {
  //   route: 'error',
  //   label: 'Error',
  //   icon: mdiAlertCircle,
  // },
  // {
  //   label: 'Dropdown',
  //   icon: mdiViewList,
  //   menu: [
  //     {
  //       label: 'Item One',
  //       route: 'dropdown.one',
  //     },
  //     {
  //       label: 'Item Two',
  //       route: 'dropdown.two',
  //     },
  //   ],
  // },
  // {
  //   href: 'https://github.com/justboil/admin-one-vue-tailwind',
  //   label: 'GitHub',
  //   icon: mdiGithub,
  //   target: '_blank',
  // },
  // {
  //   href: 'https://github.com/justboil/admin-one-react-tailwind',
  //   label: 'React version',
  //   icon: mdiReact,
  //   target: '_blank',
  // },
]
