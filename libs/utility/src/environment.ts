export type NodeEnv = 'development' | 'production' | 'test' | undefined;

const Env = process.env['NODE_ENV'] as NodeEnv;

export const isTest = () => Env === 'test';
export const isProduction = () => Env === 'production';
export const isDevelopment = () => Env === 'development';

export default Env;
