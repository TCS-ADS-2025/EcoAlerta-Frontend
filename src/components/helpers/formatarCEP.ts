export const formatarCEP = (cep: string): string => {
    const apenasNumeros = cep.replace(/\D/g, '').slice(0, 8); // remove não números e limita a 8 dígitos

    if (apenasNumeros.length <= 5) {
        return apenasNumeros;
    }

    return apenasNumeros.replace(/(\d{5})(\d{1,3})/, '$1-$2');
};