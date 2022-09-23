import binaryStringToDecimal from "./binaryStringToDecimal";

const moduleToDecimalArray = (modulo) => {
    const modulo_size = modulo.length;
    let contador_bits = 0;
    let string_acumulador = "";
    let arreglo_bytes = [];
    let arreglo_decimales = [];
    for (let n = 0; n < modulo_size; n++) {
        if (modulo[n]) {
            string_acumulador = string_acumulador + "1";
        } else {
            string_acumulador = string_acumulador + "0";
        }
        contador_bits = contador_bits + 1;
        if (contador_bits == 8) {
            arreglo_bytes.push(string_acumulador);
            let caracter = binaryStringToDecimal(string_acumulador)
            arreglo_decimales.push(caracter);
            string_acumulador = "";
            contador_bits = 0;
        }
    }
    return [arreglo_bytes, arreglo_decimales];
}

export default moduleToDecimalArray;