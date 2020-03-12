const path = require('path')
const { override, fixBabelImports, addDecoratorsLegacy, addLessLoader, addWebpackAlias } = require('customize-cra');
module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd-mobile',
		style: 'css',
	}),
	//在传统模式下添加装饰器。一定要@babel/plugin-proposal-decorators安装
	addDecoratorsLegacy(),
	//添加less-loader配置
	addLessLoader(),
	// //配置简化路径
	addWebpackAlias(
		{
			'@': path.join(__dirname, 'src'),
			// '@assets': path.resolve(__dirname, 'src/assets'),
			// '@components': path.resolve(__dirname, 'src/components'),
			// '@config': path.resolve(__dirname, 'src/config'),
			// '@libs': path.resolve(__dirname, 'src/libs'),
			// '@pages': path.resolve(__dirname, 'src/pages'),
			// '@router': path.resolve(__dirname, 'src/router'),
			// '@store': path.resolve(__dirname, 'src/store'),
			// '@utils': path.resolve(__dirname, 'src/utils')
		}
	)
);
