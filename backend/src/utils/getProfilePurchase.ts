export function getProfilePurchase(oldRanking: number, frequency: number, totalSpent: number){
    let score = 0;

  // Cálculo de ranking com base nos critérios
    score += frequency * 0.4;      // Peso 40%
    score += totalSpent * 0.3;     // Peso 30%

    // Definir ranking baseado na pontuação
    let ranking = 1;
    if (score > 70) {
        ranking = oldRanking + 4; // VIP
    } else if (score > 50) {
        ranking =+ oldRanking + 3; // Alto
    } else if (score > 30) {
        ranking =+ oldRanking + 2; // Médio
    }

    return {
        ranking,
        score
    }
}
