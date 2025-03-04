import { ProfilePurchase } from "../Model/entities/types/ProfilePurchase";

export function getProfilePurchase(oldRanking: number, frequency: number, totalSpent: number){
    let score = 0;
    let profile = ProfilePurchase.BRONZE

  // Cálculo de ranking com base nos critérios
    score += frequency * 0.4;      // Peso 40%
    score += totalSpent * 0.3;     // Peso 30%

    // Definir ranking baseado na pontuação
    let ranking = 1;
    if (score > 70) {
        ranking = oldRanking + 4; // VIP
        profile = ProfilePurchase.DIAMANTE
    } else if (score > 50) {
        ranking =+ oldRanking + 3; // Alto
        profile = ProfilePurchase.GOLD
    } else if (score > 30) {
        ranking =+ oldRanking + 2; // Médio
        profile = ProfilePurchase.SIlVER
    }else{
        ranking =+ oldRanking + 1; // Médio
        profile = ProfilePurchase.BRONZE
    }

    return {
        ranking,
        score,
        profile
    }
}
