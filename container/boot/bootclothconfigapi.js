const ora = require('ora').default;
function barraDeCarga() {
  const total = 20; // Total de "bloques" en la barra de carga
  let progreso = 0;
  
  // Iniciamos el spinner
  const spinner = ora('Loading JS Cloth Config API...').start();

  const intervalo = setInterval(() => {
    // Incrementamos el progreso con un valor aleatorio entre 0.5 y 4
    const incremento = Math.random() * (4 - 0.5) + 0.5;  // Valor aleatorio entre 0.5 y 4
    progreso += incremento;
    
    if (progreso >= total) {
      progreso = total;  // Aseguramos que el progreso no exceda el total
    }
    
    const porcentaje = Math.floor((progreso / total) * 100);  // Calculamos el porcentaje de progreso
    const barra = `[${'='.repeat(Math.floor(progreso))}${' '.repeat(total - Math.floor(progreso))}] ${porcentaje}%`;  // Creamos la barra de carga

    spinner.text = barra;  // Actualizamos el texto del spinner con la barra de carga

    if (progreso === total) {
      clearInterval(intervalo);
      spinner.succeed('Cloth Config API Enabled sucessfully. Now you can use Time and Date.');
    }
  }, 400);  // Actualizamos cada 200 ms
}

barraDeCarga();