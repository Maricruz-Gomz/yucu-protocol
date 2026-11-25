export interface ConsentimientoIA {
  imagen: boolean;
  audio: boolean;
}

// Todo consentimiento empieza sin marcar.
export const consentimientoInicial = (): ConsentimientoIA => ({
  imagen: false,
  audio: false,
});

export type TipoEnvioIA = 'imagen' | 'audio';

// El envío solo se permite si la persona dijo "Sí, enviar" y no lo revocó.
export const puedeEnviarAIA = (c: ConsentimientoIA, tipo: TipoEnvioIA): boolean =>
  c[tipo] === true;

// Envuelve cualquier llamada a la IA: si no hay consentimiento, no se llama.
export async function conConsentimiento<T>(
  c: ConsentimientoIA,
  tipo: TipoEnvioIA,
  enviar: () => Promise<T>
): Promise<T | null> {
  if (!puedeEnviarAIA(c, tipo)) return null;
  return enviar();
}