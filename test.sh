#!/bin/bash

myFunction() {
  echo "Hello from myFunction!"
}

case $1 in
  "myFunction") myFunction ;;
  # "two") functionTwo ;;
esac
