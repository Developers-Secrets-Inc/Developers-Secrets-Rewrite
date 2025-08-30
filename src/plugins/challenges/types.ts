type ExerciceType = 'classic' | 'ai' | 'sql' | 'react'

type Exercice = {
  type: ExerciceType
}

type Challenge = {
    id: number
}

type ChallengeConfig = {
  challenge: Challenge
  onSolutionUnlock: (args?: { userId: string; challengeId: number; }) => Promise<void>
  isSolutionUnlocked: (args?: { userId: string; challengeId: number; }) => Promise<boolean>
  onLike: (args?: { userId: string; challengeId: number; } | undefined) => Promise<void>
  onDislike: (args?: { userId: string; challengeId: number; } | undefined) => Promise<void>
  onRating: () => Promise<void>
  onSubmit: () => Promise<void>
}



/* 
Exercice 
    File | Folder 

    File 
        content 
        name 
        extension 
        size 
        isLocked

    Folder 
        content
        isLocked 

    - En fonction du type, on va avoir des informations supplémentaires. 
        - Un classique vas avoir des test cases 
        - Un SQL va avoir un résultat attendu 
        - Un IA va avoir des tests et des prompts 
        - Un React va aussi avoir des tests mais potentiellement structuré différemment.


- On doit aussi avoir une config de l'éditeur (fichiers ouverts, composants, ...)

*/
