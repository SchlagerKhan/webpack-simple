import { Configuration } from 'webpack';
import * as merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';

import { babelLoader } from '../loaders';

import { createDefaultConfig, DefaultOpts, BasicOpts } from './default';

export interface BasicNodeOpts extends BasicOpts {
	whitelist?: any[];
}

export type NodeOpts = DefaultOpts & BasicNodeOpts;

export function createNodeConfig(opts: NodeOpts, otherOpts?: Configuration): Configuration {
	const { whitelist } = opts;
	const defaultConfig = createDefaultConfig(opts, otherOpts);

	return merge.smart(defaultConfig, {
		target: 'node',
		node: {
			__dirname: false,
		},
		module: {
			rules: [babelLoader],
		},
		optimization: {
			minimize: false,
		},
		externals: [
			nodeExternals({
				modulesFromFile: true,
				whitelist,
			}),
		],
	});
}
