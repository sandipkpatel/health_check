#!/bin/bash
cd $1
if [ $? != 0 ]
then
    echo "failed!"
    exit 0
else
    echo "done"
fi

rm -rf RUNNING_PID
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

kill -9 $(sudo lsof -t -i:$2) || true
if [ $? != 0 ]
then
    echo "failed!"
    exit 0
else
    echo "done"
fi

if [ $2 = 80 ]
then
    ./furnishing -J-Xmx1000M -J-Xms1000M -Dhttp.port=$2 -Djavax.net.ssl.keyStore=/root/code/furnishing/ssl/a2032b2ccb8bab4189d8c32083fd8c3d.pfx -Djavax.net.ssl.keyStorePassword=furnishzing -Dplay.server.netty.maxInitialLineLength=1024000000 > /dev/null    
else
    httpport=$(( $1 + 50 ))
    ./furnishing -J-Xmx1000M -J-Xms1000M -Dhttp.port="${httpport}" -Dhttps.port=$2 -Djavax.net.ssl.keyStore=/root/code/furnishing/ssl/a2032b2ccb8bab4189d8c32083fd8c3d.pfx -Djavax.net.ssl.keyStorePassword=furnishzing -Dplay.server.netty.maxInitialLineLength=1024000000 > /dev/null    
fi


if [ $? != 0 ]
then
    echo "failed!"
    exit 0
else
    echo "done"
fi

echo "finished"
exit 0