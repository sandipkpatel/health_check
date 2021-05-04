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

kill -9 $(sudo lsof -t -i:443) || true
if [ $? != 0 ]
then
    echo "failed!"
    exit 0
else
    echo "done"
fi



echo "finished"
exit 0