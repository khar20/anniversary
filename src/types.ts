export type AppStage = typeof AppStage[keyof typeof AppStage];

export const AppStage = {
  INTRO: 'INTRO',
  TIMELINE: 'TIMELINE',
  LETTER: 'LETTER',
} as const;

export interface LetterContent {
  title: string;
  body: string;
  signature: string;
}

export const DEFAULT_LETTER: LetterContent = {
  title: "Mi amorcito,",
  body: "Ha pasado un año desde que empezamos nuestra relación y soy muy feliz de seguir acompañándote. Te adoro, mi amor, y espero seguir mucho más tiempo a tu lado. Eres mi mejor amiga y una compañera excepcional.\n\nGuardo con enorme cariño los momentos que hemos compartido juntos y deseo atesorar muchos más.\n\nCelebremos nuestro aniversario, preciosa. Te amo con todo mi corazón.",
  signature: "Aléx"
};
