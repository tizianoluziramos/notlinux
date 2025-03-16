#Persistent
#NoEnv
SendMode Input
SetWorkingDir %A_ScriptDir%

KeyPressed := False
F12Pressed := False

; Crear una ventana negra en pantalla completa
Gui, +AlwaysOnTop +Border -Caption
Gui, Color, Black
Gui, Show, % "w" A_ScreenWidth " h" A_ScreenHeight " x0 y0"

; Crear un temporizador que espere 3 segundos, pero permitir la presión de F12 en cualquier momento
SetTimer, CheckKey, -1000  

; Detectar si se presiona la tecla "F12"
F12::
KeyPressed := True
F12Pressed := True
Gui, Destroy ; Cerrar la pantalla negra inmediatamente si se presiona F12
return

CheckKey:
if (!F12Pressed) {
    ; Si no se presionó F12, espera los 3 segundos
    Gui, Destroy ; Cerrar la pantalla negra después de los 3 segundos
    if (KeyPressed) {
        Run, C:\Windows\System32\cmd.exe /K "mode con:cols=80 lines=25 && node container/boot/bios.js && node container/boot/bootclothconfigapi.js && node container/boot/bootramdisk.js && node container/boot/bootwifirequired.js && node container/boot/bootbluetooth.js && node container/boot/bootverifyadminrights.js && node container/boot/bootanimation.js && cls && node index.js && exit"
    } else {
        Run, C:\Windows\System32\cmd.exe /K "mode con:cols=80 lines=25 && node container/boot/bootclothconfigapi.js && node container/boot/bootramdisk.js && node container/boot/bootwifirequired.js && node container/boot/bootbluetooth.js && node container/boot/bootverifyadminrights.js && node container/boot/bootanimation.js && cls && node index.js && exit"
    }
} else {
    ; Si F12 fue presionado, ejecutar inmediatamente el código
    Gui, Destroy ; Cerrar la pantalla negra
    Run, C:\Windows\System32\cmd.exe /K "mode con:cols=80 lines=25 && node container/boot/bios.js && node container/boot/bootclothconfigapi.js && node container/boot/bootramdisk.js && node container/boot/bootwifirequired.js && node container/boot/bootbluetooth.js && node container/boot/bootverifyadminrights.js && node container/boot/bootanimation.js && cls && node index.js && exit"
}
Sleep, 1400
Send, !{Enter} ; Presiona Alt + Enter para pantalla completa
Send, !{Enter}
Send, !{Enter}
ExitApp