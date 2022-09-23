// Entrada: String de 8 bits
// Salida: Decimal que representa los 8 bits
const binaryStringToDecimal = (bits) => {
    let decimal = 0;
    let posicion = 7;
    for (let k = 0; k < 8; k++) {
        if (bits[posicion] == "1") {
            decimal = decimal + Math.pow(2, k);
        }
        posicion = posicion - 1;
    }
    return decimal
}

export default binaryStringToDecimal;