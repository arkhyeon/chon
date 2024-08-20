import { create } from 'zustand';
import { User } from '@prisma/client';

const user: User = {
  uid: 0,
  id: '',
  username: '',
  email: '',
  password: '',
  address: '',
  addressDetail: '',
  point: 0,
  role: 'USER',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const profileStore = create(() => ({ user }));

export const setProfileUser = (user: User) => {
  profileStore.setState({ user });
};
