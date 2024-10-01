/* eslint-disable no-console */
import config from '../config';
import { user_role, user_status } from '../modules/User/user.constant';
import { User } from '../modules/User/user.model';

export const seed = async () => {
  try {
    //atfirst check if the admin exist of not
    const admin = await User.findOne({
      role: user_role.admin,
      email: config.admin_email,
      status: user_status.active,
    });
    if (!admin) {
      console.log('Seeding started...');

      await User.create({
        name: 'Admin',
        role: user_role.admin,
        email: config.admin_email,
        password: config.admin_password,
        phone: config.admin_mobile_number,
        avatar: config.admin_profile_photo,
        status: user_status.active,
      });
      console.log('Admin created successfully...');
      console.log('Seeding completed...');
    }
  } catch (error) {
    console.log('Error in seeding', error);
  }
};
