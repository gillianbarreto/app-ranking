import { general } from './general';

const specific = {
  production: false,
  MS_URL: 'http://localhost:3001',
  MS_BASE: '/ms/v1'
};

export const environment = { ...general, ...specific };
