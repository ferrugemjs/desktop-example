var path = require('path');

module.exports = {
    entry: {
        'app':['es6-shim','whatwg-fetch','./src/desktop/app/app.ts']
    },
    output: {
        path: path.resolve(__dirname, './public'), 
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        contentBase: './',
        port: 9000,
        proxy: {
		  "/rest": {
		    target: "http://localhost:8330"
		  }
		}
    },
    module: {
        loaders: [
        	{
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: { configFile:'tslint.json' }
            }
			,{
				test: /\.ts$/,
				loader: 'ts-loader'
			}
            ,{
                test: /\.pug$/,
                loaders: [
                            { 
                                loader:'ferrugemjs-loader'
                                ,options:{
                                    templateExtension:".pug"
                                }
                            }
                            ,'pug-html-loader'
                        ]
            }            
			,{
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
            ,{
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader']
            }
            ,{
    			test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
   				loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
			}
		]
    }
	,resolve: {
		extensions: [".ts",".pug",".js",".html"]
		,alias:{    		
			"app":path.resolve(__dirname, './src')
			,"ui":path.resolve(__dirname, './src/ui')
			,"root_app":path.resolve(__dirname, './src')
			,"ferrugemjs":"ferrugemjs/dist/core"
			,"ferrugemjs-router":"ferrugemjs-router/dist/router"
		}    
	}
}
