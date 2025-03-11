function readlineModule(question) {
    return new Promise((resolve) => {
        process.stdout.write(question);

        process.stdin.once("data", (data) => {
            const respuesta = data.toString().trim();
            process.stdin.pause();
            
            // Imprimir la respuesta con el color especificado
            resolve(respuesta);
        });
    });
}

export async function question(question) {
    const result = await readlineModule(question);
    return result;
}

export default question;