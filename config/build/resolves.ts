import {ResolveOptions} from 'webpack';

export const resolves = (): ResolveOptions => ({
  extensions: ['.tsx', '.ts', '.js'],
})
