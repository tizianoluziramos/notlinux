Run, C:\Windows\System32\cmd.exe /K "mode con:cols=80 lines=25 && node container/boot/bios.js && node container/boot/bootclothconfigapi.js && node container/boot/bootramdisk.js && node container/boot/bootwifirequired.js && node container/boot/bootbluetooth.js && node container/boot/bootverifyadminrights.js && node container/boot/bootanimation.js && cls && node index.js && exit"
Sleep, 1400
Send, !{Enter} ; Presiona Alt + Enter para poner en pantalla completa