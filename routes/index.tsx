export const items = [
  {
    key: 'dashboard',
    icon: 'bx bx-home-circle',
    label: 'Dashboard',
    path: '/dashboard',
    children: null
  },
  {
    key: 'pendaftaran',
    icon: 'bx bx-home-circle',
    label: 'Pendaftaran',
    path: '/dashboard/registration',
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
      },
      {
        label: 'Kepercayaan',
        path: '/dashboard/masterdata/religion'
      },
      {
        label: 'Suku',
        path: '/dashboard/masterdata/ethnic'
      },
      {
        label: 'Status Pernikahan',
        path: '/dashboard/masterdata/marital-status'
      }
    ]
  }
];