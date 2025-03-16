let logCounter = 0;

console.log('');
console.log(`                       @@@@@@@@@@@@                        
                      @@@@@@@@@@@%@@@@                     
                    @@@@@@@@@@@@@**%@@@                    
                   @@@@@@@@@@@@@@@@@@@@@                   
                   @@@@@@@@@@@@@@@@@@@@@@                  
                   @@@%#@@@@@@#+++%@@@@@@                  
                   @@+::.+@@@:.--.-%@@@@@                  
                   @@:@@*.@@#.+@%%:*@@@@@                  
                   @@==@*---=:=@@#:#@@@@@                  
                   @@@==----::::::=@@@@@@                  
                   @@*==---::::-===%@@@@@@                 
                   @@@*+=----=+===+%@@*#@@                 
                   @@@-=+++=====-::-@@%#@@@@               
                   @@+.--------:....:@@@@@@@               
                 @@@+...::-::........:@@@@@@@@             
               @@@@-..................+@@@@@@@@            
              @@@@+...................-%@@@@@@@@@          
            @@@@@@=:..............:::::-@@@@@@@@@@         
            @@@@@=.....................:.#@@@%@@@@@        
            @@@@=........................:#@%@%@@@@@       
           @@@@*..........................=@@@@%@@@@       
          @@@@%...........................:%@@@%@@@@@      
         @@@@@-............................%@@@%@@@@@      
        @@@@@%.............................#@@%@@@@@@@     
        @@@%%#.............................%@@%@@@@@@@     
        %*++%*............................:%@@@@@%#@@      
       +=----#@*.......................:=--#@@@@@@%%==     
 ++=====------+@@#:....................:=--#@@@@@@#--==    
+==------------=%@@@=.................:-=--=+#%#+=----=    
+=--------------=%@@@%................:-=---====-------=   
 ==--------------=%@@@-...............+#+----------------==
 +=----------------=:...............=@@#+----------------=+
+=-----------------=+-...........:*@@@@#+------------===+++
+==-----------------=*@@@#***#%@@@@@@@@*=--------==++***   
+++++=====---------=+*%@@@@@@@@@@@@@@@@#+==--===++***      
     *****+++======+*#@          @@@@@@%#*+++++**#         
            ##*****##%                 %%%######           
`);

const logs = [
  "Uncompressing Linux... done, booting the kernel.",
  "[    0.000000] Booting Linux on physical CPU 0x0",
  "[    0.000000] Initializing cgroup subsys cpu",
  "[    0.000000] Initializing cgroup subsys cpuacct",
  "[    0.000000] Linux version 3.18.10+ (dc4@dc4-XPS13-9333) (gcc version 4.8.3 20140303 (prerelease) (crosstool-NG linaro-1.13.1+bzr2650 - Linaro GCC 2014.03)) #775 PREEMPT Thu Apr 2 18:10:12 BST 2015",
  "[    0.000000] CPU: ARMv6-compatible processor [410fb767] revision 7 (ARMv7), cr=00c5387d",
  "[    0.000000] CPU: PIPT / VIPT nonaliasing data cache, VIPT nonaliasing instruction cache",
  "[    0.000000] Machine model: Raspberry Pi Model B",
  "[    0.000000] cma: Reserved 8 MiB at 0x0b800000",
  "[    0.000000] Memory policy: Data cache writeback",
  "[    0.000000] Built 1 zonelists in Zone order, mobility grouping on.  Total pages: 48768",
  "[    0.000000] Kernel command line: dma.dmachans=0x7f35 bcm2708_fb.fbwidth=656 bcm2708_fb.fbheight=416 bcm2708.boardrev=0x2 bcm2708.serial=0xb51cb961 smsc95x.macaddr=B8:27:EB:1C:B9:61 bcm2708_fb.fbswap=1 sdhci-bcm2708.emmc_clock_freq=250000000 vc_mem.mem_base=0xec00000 vc_mem.mem_size=0x10000000  dwc_otg.lpm_enabe=0 console=ttyAMA0,115200 console=tty1 root=/dev/mmcblk0p2 rootfstype=ext4 elevator=deadline rootwait",
  "[    0.000000] PID hash table entries: 1024 (order: 0, 4096 bytes)",
  "[    0.000000] Dentry cache hash table entries: 32768 (order: 5, 131072 bytes)",
  "[    0.000000] Inode-cache hash table entries: 16384 (order: 4, 65536 bytes)",
  "[    0.000000] Memory: 177372K/196608K available (5885K kernel code, 348K rwdata, 1868K rodata, 340K init, 733K bss, 19236K reserved)",
  "[    0.000000] Virtual kernel memory layout:",
  "[    0.000000]     vector  : 0xffff0000 - 0xffff1000   (   4 kB)",
  "[    0.000000]     fixmap  : 0xffc00000 - 0xffe00000   (2048 kB)",
  "[    0.000000]     vmalloc : 0xcc800000 - 0xff000000   ( 808 MB)",
  "[    0.000000]     lowmem  : 0xc0000000 - 0xcc000000   ( 192 MB)",
  "[    0.000000]     modules : 0xbf000000 - 0xc0000000   (  16 MB)",
  "[    0.000000]       .text : 0xc0008000 - 0xc079a78c   (7754 kB)",
  "[    0.000000]       .init : 0xc079b000 - 0xc07f0000   ( 340 kB)",
  "[    0.000000]       .data : 0xc07f0000 - 0xc084711c   ( 349 kB)",
  "[    0.000000]        .bss : 0xc084711c - 0xc08fe848   ( 734 kB)",
  "[    0.000000] SLUB: HWalign=32, Order=0-3, MinObjects=0, CPUs=1, Nodes=1",
  "[    0.000000] Preemptible hierarchical RCU implementation.",
  "[    0.000000] NR_IRQS:522",
  "[    0.000027] sched_clock: 32 bits at 1000kHz, resolution 1000ns, wraps every 2147483648000ns",
  "[    0.000077] Switching to timer-based delay loop, resolution 1000ns",
  "[    0.000359] Console: colour dummy device 80x30",
  "[    0.001422] console [tty1] enabled",
  "[    0.001469] Calibrating delay loop (skipped), value calculated using timer frequency.. 2.00 BogoMIPS (lpj=10000)",
  "[    0.001545] pid_max: default: 32768 minimum: 301",
  "[    0.001931] Mount-cache hash table entries: 1024 (order: 0, 4096 bytes)",
  "[    0.001997] Mountpoint-cache hash table entries: 1024 (order: 0, 4096 bytes)",
  "[    0.003000] Initializing cgroup subsys memory",
  "[    0.003093] Initializing cgroup subsys devices",
  "[    0.003151] Initializing cgroup subsys freezer",
  "[    0.003204] Initializing cgroup subsys net_cls",
  "[    0.003254] Initializing cgroup subsys blkio",
  "[    0.003377] CPU: Testing write buffer coherency: ok",
  "[    0.003498] ftrace: allocating 19229 entries in 57 pages",
  "[    0.107319] Setting up static identity map for 0x553698 - 0x5536d0",
  "[    0.110174] devtmpfs: initialized",
  "[    0.127357] VFP support v0.3: implementor 41 architecture 1 part 20 variant b rev 5",
  "[    0.130404] pinctrl core: initialized pinctrl subsystem",
  "[    0.133123] NET: Registered protocol family 16",
  "[    0.138594] DMA: preallocated 4096 KiB pool for atomic coherent allocations",
  "[    0.139999] bcm2708.uart_clock = 3000000",
  "[    0.142890] No ATAGs?",
  "[    0.142954] hw-breakpoint: found 6 breakpoint and 1 watchpoint registers.",
  "[    0.143016] hw-breakpoint: maximum watchpoint size is 4 bytes.",
  "[    0.143083] mailbox: Broadcom VideoCore Mailbox driver",
  "[    0.143245] bcm2708_vcio: mailbox at f200b880",
  "[    0.143703] bcm_power: Broadcom power driver",
  "[    0.143761] bcm_power_open() -> 0",
  "[    0.143791] bcm_power_request(0, 8)",
  "[    0.644504] bcm_mailbox_read -> 00000080, 0",
  "[    0.644551] bcm_power_request -> 0",
  "[    0.644761] Serial: AMBA PL011 UART driver",
  "[    0.645001] dev:f1: ttyAMA0 at MMIO 0x20201000 (irq = 83, base_baud = 0) is a PL011 rev3",
  "[    1.026171] console [ttyAMA0] enabled",
  "[    1.089428] SCSI subsystem initialized",
  "[    1.093582] usbcore: registered new interface driver usbfs",
  "[    1.099370] usbcore: registered new interface driver hub",
  "[    1.104873] usbcore: registered new device driver usb",
  "[    1.112045] Switched to clocksource stc",
  "[    1.144472] FS-Cache: Loaded",
  "[    1.147792] CacheFiles: Loaded",
  "[    1.167352] NET: Registered protocol family 2",
  "[    1.173329] TCP established hash table entries: 2048 (order: 1, 8192 bytes)",
  "[    1.180389] TCP bind hash table entries: 2048 (order: 1, 8192 bytes)",
  "[    1.187044] TCP: Hash tables configured (established 2048 bind 2048)",
  "[    1.193567] TCP: reno registered",
  "[    1.196842] UDP hash table entries: 256 (order: 0, 4096 bytes)",
  "[    1.202767] UDP-Lite hash table entries: 256 (order: 0, 4096 bytes)",
  "[    1.209433] NET: Registered protocol family 1",
  "[    1.214527] RPC: Registered named UNIX socket transport module.",
  "[    1.220497] RPC: Registered udp transport module.",
  "[    1.225329] RPC: Registered tcp transport module.",
  "[    1.230060] RPC: Registered tcp NFSv4.1 backchannel transport module.",
  "[    1.237793] bcm2708_dma: DMA manager at f2007000",
  "[    1.242844] vc-mem: phys_addr:0x00000000 mem_base=0x0ec00000 mem_size:0x10000000(256 MiB)",
  "[    1.252677] futex hash table entries: 256 (order: -1, 3072 bytes)",
  "[    1.258959] audit: initializing netlink subsys (disabled)",
  "[    1.264643] audit: type=2000 audit(1.030:1): initialized",
  "[    1.285511] VFS: Disk quotas dquot_6.5.2",
  "[    1.289878] Dquot-cache hash table entries: 1024 (order 0, 4096 bytes)",
  "[    1.299414] FS-Cache: Netfs 'nfs' registered for caching",
  "[    1.306594] NFS: Registering the id_resolver key type",
  "[    1.311766] Key type id_resolver registered",
  "[    1.316111] Key type id_legacy registered",
  "[    1.321553] msgmni has been set to 362",
  "[    1.327984] Block layer SCSI generic (bsg) driver version 0.4 loaded (major 252)",
  "[    1.336007] io scheduler noop registered",
  "[    1.339992] io scheduler deadline registered (default)",
  "[    1.345764] io scheduler cfq registered",
  "[    1.352388] BCM2708FB: allocated DMA memory 4bc00000",
  "[    1.357459] BCM2708FB: allocated DMA channel 0 @ f2007000",
  "[    1.368051] Console: switching to colour frame buffer device 82x26",
  "[    1.379949] bcm2708-dmaengine bcm2708-dmaengine: Load BCM2835 DMA engine driver",
  "[    1.389642] uart-pl011 dev:f1: no DMA platform data",
  "[    1.397092] vc-cma: Videocore CMA driver",
  "[    1.402834] vc-cma: vc_cma_base      = 0x00000000",
  "[    1.409145] vc-cma: vc_cma_size      = 0x00000000 (0 MiB)",
  "[    1.416205] vc-cma: vc_cma_initial   = 0x00000000 (0 MiB)",
  "[    1.436395] brd: module loaded",
  "[    1.448019] loop: module loaded",
  "[    1.453297] vchiq: vchiq_init_state: slot_zero = 0xcb800000, is_master = 0",
  "[    1.462740] Loading iSCSI transport class v2.0-870.",
  "[    1.470905] usbcore: registered new interface driver smsc95xx",
  "[    1.478580] dwc_otg: version 3.00a 10-AUG-2012 (platform bus)",
  "[    1.686340] Core Release: 2.80a",
  "[    1.691076] Setting default values for core params",
  "[    1.697475] Finished setting default values for core params",
  "[    1.904796] Using Buffer DMA mode",
  "[    1.909665] Periodic Transfer Interrupt Enhancement - disabled",
  "[    1.917086] Multiprocessor Interrupt Enhancement - disabled",
  "[    1.924277] OTG VER PARAM: 0, OTG VER FLAG: 0",
  "[    1.930218] Dedicated Tx FIFOs mode",
  "[    1.935666] WARN::dwc_otg_hcd_init:1047: FIQ DMA bounce buffers: virt = 0xcbc14000 dma = 0x4bc14000 len=9024",
  "[    1.948724] FIQ FSM acceleration enabled for :",
  "[    1.948724] Non-periodic Split Transactions",
  "[    1.948724] Periodic Split Transactions",
  "[    1.948724] High-Speed Isochronous Endpoints",
  "[    1.971866] WARN::hcd_init_fiq:412: FIQ on core 0 at 0xc03fad8c",
  "[    1.979466] WARN::hcd_init_fiq:413: FIQ ASM at 0xc03fb064 length 36",
  "[    1.987400] WARN::hcd_init_fiq:438: MPHI regs_base at 0xcc806000",
  "[    1.995104] dwc_otg bcm2708_usb: DWC OTG Controller",
  "[    2.001651] dwc_otg bcm2708_usb: new USB bus registered, assigned bus number 1",
  "[    2.010630] dwc_otg bcm2708_usb: irq 32, io mem 0x00000000",
  "[    2.017815] Init: Port Power? op_state=1",
  "[    2.023378] Init: Power Port (0)",
  "[    2.028537] usb usb1: New USB device found, idVendor=1d6b, idProduct=0002",
  "[    2.037033] usb usb1: New USB device strings: Mfr=3, Product=2, SerialNumber=1",
  "[    2.045927] usb usb1: Product: DWC OTG Controller",
  "[    2.052273] usb usb1: Manufacturer: Linux 3.18.10+ dwc_otg_hcd",
  "[    2.059707] usb usb1: SerialNumber: bcm2708_usb",
  "[    2.066889] hub 1-0:1.0: USB hub found",
  "[    2.072503] hub 1-0:1.0: 1 port detected",
  "[    2.079264] usbcore: registered new interface driver usb-storage",
  "[    2.087479] mousedev: PS/2 mouse device common for all mice",
  "[    2.095606] bcm2835-cpufreq: min=700000 max=700000",
  "[    2.102496] sdhci: Secure Digital Host Controller Interface driver",
  "[    2.110280] sdhci: Copyright(c) Pierre Ossman",
  "[    2.116621] DMA channels allocated for the MMC driver",
  "[    2.152126] Load BCM2835 MMC driver",
  "[    2.159221] sdhci-pltfm: SDHCI platform and OF driver helper",
  "[    2.175080] ledtrig-cpu: registered to indicate activity on CPUs",
  "[    2.183143] hidraw: raw HID events driver (C) Jiri Kosina",
  "[    2.194831] usbcore: registered new interface driver usbhid",
  "[    2.203214] usbhid: USB HID core driver",
  "[    2.211223] TCP: cubic registered",
  "[    2.217453] Initializing XFRM netlink socket",
  "[    2.225619] NET: Registered protocol family 17",
  "[    2.231956] Key type dns_resolver registered",
  "[    2.239713] registered taskstats version 1",
  "[    2.245791] vc-sm: Videocore shared memory driver",
  "[    2.252251] [vc_sm_connected_init]: start",
  "[    2.259102] [vc_sm_connected_init]: end - returning 0",
  "[    2.267761] Waiting for root device /dev/mmcblk0p2...",
  "[    2.274904] Indeed it is in host mode hprt0 = 00021501",
  "[    2.286814] mmc0: host does not support reading read-only switch, assuming write-enable",
  "[    2.314220] mmc0: new high speed SDHC card at address b368",
  "[    2.332171] mmcblk0: mmc0:b368 SMI   15.0 GiB",
  "[    2.343287]  mmcblk0: p1 p2",
  "[    2.395467] EXT4-fs (mmcblk0p2): INFO: recovery required on readonly filesystem",
  "[    2.404706] EXT4-fs (mmcblk0p2): write access will be enabled during recovery",
  "[    2.460279] EXT4-fs (mmcblk0p2): recovery complete",
  "[    2.472867] EXT4-fs (mmcblk0p2): mounted filesystem with ordered data mode. Opts: (null)",
  "[    2.484425] usb 1-1: new high-speed USB device number 2 using dwc_otg",
  "[    2.492779] VFS: Mounted root (ext4 filesystem) readonly on device 179:2.",
  "[    2.501971] Indeed it is in host mode hprt0 = 00001101",
  "[    2.509409] devtmpfs: mounted",
  "[    2.523251] Freeing unused kernel memory: 340K (c079b000 - c07f0000)",
  "[    2.722646] usb 1-1: New USB device found, idVendor=0424, idProduct=9512",
  "[    2.732631] usb 1-1: New USB device strings: Mfr=0, Product=0, SerialNumber=0",
  "[    2.746803] hub 1-1:1.0: USB hub found",
  "[    2.753774] hub 1-1:1.0: 3 ports detected",
  "[    3.032458] usb 1-1.1: new high-speed USB device number 3 using dwc_otg",
  "[    3.142744] usb 1-1.1: New USB device found, idVendor=0424, idProduct=ec00",
  "[    3.151599] usb 1-1.1: New USB device strings: Mfr=0, Product=0, SerialNumber=0",
  "[    3.174835] smsc95xx v1.0.4",
  "[    3.260006] smsc95xx 1-1.1:1.0 eth0: register 'smsc95xx' at usb-bcm2708_usb-1.1, smsc95xx USB 2.0 Ethernet, b8:27:eb:1c:b9:61",
  "[    4.220552] udevd[159]: starting version 175",
  "[   10.386572] EXT4-fs (mmcblk0p2): re-mounted. Opts: (null)",
  "[   10.867335] EXT4-fs (mmcblk0p2): re-mounted. Opts: (null)",
  "[   11.810617] random: nonblocking pool is initialized",
  "[   11.849114] Driver for 1-wire Dallas network protocol.",
  "[   12.167722] i2c /dev entries driver"
];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function showLogs() {
  while (logCounter < logs.length) {
    console.log(logs[logCounter]);
    logCounter++;
    randoms = Math.floor(Math.random() * 100);
    await delay(randoms); // Espera antes de continuar
  }
}

setTimeout(() => {
  setTimeout(() => {
    (async function main() {
      await showLogs();
      console.clear();
    })();
  }, 1000); // Esto imprime cada log con un segundo de diferencia
}, 5000); // 5000 milisegundos = 5 segundos
