from bleak import BleakScanner
import asyncio

async def check_bluetooth():
    try:
        scanner = BleakScanner()
        
        # Intentamos descubrir dispositivos Bluetooth con un timeout de 0.5 segundos
        devices = await scanner.discover(timeout=0)
        
        if not devices:
            print("True")  # No se encontraron dispositivos
        else:
            print("True")  # Se encontraron dispositivos, pero igual mostramos True
    
    except OSError as e:
        if "El dispositivo no está listo para su uso" in str(e):
            print("False")  # Error relacionado con el estado del dispositivo
        else:
            print(f"Ocurrió un error inesperado: {e}")

# Ejecutar la función en un loop
asyncio.run(check_bluetooth())
