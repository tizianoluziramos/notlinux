const R = (mul, shift, vars) => {
    let [x, y] = vars;
    let _ = x;
    x -= (mul * y) >> shift;
    y += (mul * _) >> shift;
    _ = (3145728 - x * x - y * y) >> 11;
    x = (x * _) >> 10;
    y = (y * _) >> 10;
    return [x, y];
  };
  
  const width = 80, height = 22;
  const b = new Array(width * height).fill(" ");
  const z = new Array(width * height).fill(127);
  
  let sA = 1024, cA = 0, sB = 1024, cB = 0;
  
  globalThis["donut"] = () => {
    b.fill(" ");
    z.fill(127);
  
    let sj = 0, cj = 1024;
    for (let j = 0; j < 90; j++) {
      let si = 0, ci = 1024;
  
      for (let i = 0; i < 324; i++) {
        const R1 = 1, R2 = 2048, K2 = 5120 * 1024;
        
        let x0 = R1 * cj + R2,
            x1 = (ci * x0) >> 10,
            x2 = (cA * sj) >> 10,
            x3 = (si * x0) >> 10,
            x4 = R1 * x2 - ((sA * x3) >> 10),
            x5 = (sA * sj) >> 10,
            x6 = K2 + R1 * 1024 * x5 + cA * x3,
            x7 = (cj * si) >> 10,
            x = Math.max(0, Math.min(width - 1, 40 + (((30 * (cB * x1 - sB * x4)) / x6) | 0))),
            y = Math.max(0, Math.min(height - 1, 12 + (((15 * (cB * x4 + sB * x1)) / x6) | 0))),
            N = ((((-cA * x7 - cB * (((-sA * x7) >> 10) + x2) - ci * ((cj * sB) >> 10)) >> 10) - x5) >> 7) | 0;
  
        let o = x + width * y;
        let zz = ((x6 - K2) >> 15) | 0;
  
        if (y >= 0 && y < height && x >= 0 && x < width && zz < z[o]) {
          z[o] = zz;
          b[o] = " .:-=+*#%@"[Math.max(0, Math.min(9, N))]; // Evita valores fuera del índice
        }
  
        [ci, si] = R(5, 8, [ci, si]);
      }
  
      [cj, sj] = R(9, 7, [cj, sj]);
    }
  
    console.clear();
    let output = "";
    for (let k = 0; k < width * height; k++) {
      output += b[k] || " "; // Asegura que no haya `undefined`
      if (k % width === width - 1) output += "\n";
    }
    
    process.stdout.write(output);
  
    [cA, sA] = R(5, 7, [cA, sA]);
    [cB, sB] = R(5, 8, [cB, sB]);
  
    setTimeout(globalThis["donut"], 50);
  };
  
  module.exports = globalThis["donut"];
  