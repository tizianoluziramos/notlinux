#Persistent
#NoEnv
SendMode Input
SetWorkingDir %A_ScriptDir%

OnExit("ForceClose")  ; Cierra todo si se fuerza la salida

KeyPressed := False
F10Pressed := False
EnterPressed := False
F1Pressed := False
F9Pressed := False

; Crear una ventana con una imagen en pantalla completa
Gui, +AlwaysOnTop +Border -Caption
Gui, Add, Picture, x0 y0 w%A_ScreenWidth% h%A_ScreenHeight%, imagen.png
Gui, Show, % "w" A_ScreenWidth " h"A_ScreenHeight " x0 y0"

; Detectar si se presiona "F10" para cargar BIOS
F10::
    KeyPressed := True
    F10Pressed := True
    Run, C:\Windows\System32\cmd.exe /K "mode con:cols=80 lines=25 && node container/boot/bios.js && node container/boot/bootclothconfigapi.js && node container/boot/bootramdisk.js && node container/boot/bootwifirequired.js && node container/boot/bootbluetooth.js && node container/boot/bootverifyadminrights.js && node container/boot/bootanimation.js && cls && node index.js && exit"  ; Ejecutar el comando inmediatamente
    SetTimer, WaitAndRun, -2000  ; Espera 2 segundos antes de continuar
return

F9::
    KeyPressed := True
    F9Pressed := True
    Run, C:\Windows\System32\cmd.exe /K "mode con:cols=80 lines=25 && node container/boot/bootoptions.js && node container/boot/bootclothconfigapi.js && node container/boot/bootramdisk.js && node container/boot/bootwifirequired.js && node container/boot/bootbluetooth.js && node container/boot/bootverifyadminrights.js && node container/boot/bootanimation.js && cls && node index.js && exit"  ; Ejecutar el comando inmediatamente
    SetTimer, WaitAndRun, -2000
return
F1::
    KeyPressed := True
    F1Pressed := True
    Run, C:\Windows\System32\cmd.exe /K "mode con:cols=80 lines=25 && node container/boot/sysinforeq.js && node container/boot/bootclothconfigapi.js && node container/boot/bootramdisk.js && node container/boot/bootwifirequired.js && node container/boot/bootbluetooth.js && node container/boot/bootverifyadminrights.js && node container/boot/bootanimation.js && cls && node index.js && exit"  ; Ejecutar el comando inmediatamente
    SetTimer, WaitAndRun, -2000
Return

; Detectar si se presiona "Enter" para cargar sin BIOS
Enter::
    KeyPressed := True
    EnterPressed := True
    Run, C:\Windows\System32\cmd.exe /K "mode con:cols=80 lines=25 && node container/boot/bootclothconfigapi.js && node container/boot/bootramdisk.js && node container/boot/bootwifirequired.js && node container/boot/bootbluetooth.js && node container/boot/bootverifyadminrights.js && node container/boot/bootanimation.js && cls && node index.js && exit"  ; Ejecutar el comando inmediatamente
    SetTimer, WaitAndRun, -2000  ; Espera 2 segundos antes de continuar
return

; Espera 2 segundos después de ejecutar el Run, luego simula Alt + Enter y cierra la imagen
WaitAndRun:
    Send, !{Enter}  ; Simular Alt + Enter
    Gui, Destroy  ; Cerrar la imagen
return

ForceClose() {
    Gui, Destroy  ; Cierra la imagen si aún está abierta
    ExitApp  ; Termina el script
}