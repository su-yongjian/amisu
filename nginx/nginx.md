安装：
1：到nginx官网上下载相应的安装包，http://nginx.org/en/download.html；
建议安装稳定版本：stable version
解压到任意喜欢的盘下：个人喜欢放在D盘里面：另起文件夹nginx
2：进入解压盘里面根目录：运行cmd命令nginx：start nginx.exe 进行安装，一般安装成功后会在任务管理进程里面看到两个nginx.exe的进程正在执行
启动:注意不要直接双击nginx.exe，这样会导致修改配置后重启、停止nginx无效，需要手动关闭任务管理器内的所有nginx进程

3：打开浏览器输入地址127.0.0.1可以看到相关的nginx界面
相关操作命令：  nginx.exe -s stop                   //停止nginx
               nginx.exe -s reload                //重新加载nginx
               nginx.exe -s quit                     //退出nginx
               nginx -s reopen  ：重新打开日志文件

nginx配置文件
在nginx输入命令ls可以看到nginx的配置文件nginx.conf
http {
     gzip  on;

    #静态文件
    server {
        listen       80;
        server_name  static.cnblog.com;

        location / {
            root   G:/source/static_cnblog_com;
        }
    }

    #html文件
    server {
        listen       80;
        server_name  127.0.0.1 localhost;

        location / {
            root   G:/source/html/mobile/dist;
            index  index.html index.htm;
        }
    }
}