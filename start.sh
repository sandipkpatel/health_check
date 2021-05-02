#!/bin/bash
cd $1
if [ $? != 0 ]
then
    echo "failed!"
    exit 0
else
    echo "done"
fi

cd bin
if [ $? != 0 ]
then
    echo "failed!"
    exit 0
else
    echo "done"
fi

./furnishing -J-Xmx512M -J-Xms256M -Dhttp.port=$2 -Djavax.net.ssl.keyStore=/root/code/furnishing/ssl/a2032b2ccb8bab4189d8c32083fd8c3d.pfx -Djavax.net.ssl.keyStorePassword=furnishzing -Dplay.server.netty.maxInitialLineLength=1024000000 > /dev/null
if [ $? != 0 ]
then
    echo "failed!"
    exit 0
else
    echo "done"
fi

echo "finished"
exit 0