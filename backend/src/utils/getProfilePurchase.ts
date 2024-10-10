export function getProfilePurchase(frequency: number, totalSpent: number){
    let score = 0;

  // Cálculo de ranking com base nos critérios
    score += frequency * 0.4;      // Peso 40%
    score += totalSpent * 0.3;     // Peso 30%
    // Adicionar outros critérios de acordo com a lógica do seu negócio

    // Definir ranking baseado na pontuação
    let ranking = 1;
    if (score > 70) {
        ranking = 4; // VIP
    } else if (score > 50) {
        ranking = 3; // Alto
    } else if (score > 30) {
        ranking = 2; // Médio
    }

    return {
        ranking,
        score
    }
}
