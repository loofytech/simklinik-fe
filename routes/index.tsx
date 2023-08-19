export const items = [
  {
    key: 'dashboard',
    icon: 'bx bx-home-circle',
    label: 'Dashboard',
    path: '/dashboard',
    children: null
  },
  {
    key: 'datamaster',
    icon: 'bx bx-layout',
    label: 'Data Master',
    path: null,
    children: [
      {
        label: 'User',
        path: '/dashboard/masterdata/user'
      }
    ]
  }
];