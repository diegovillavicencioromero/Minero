# Minero — Pieza 1 (Escena base)

Pieza 1 del nuevo rompecabezas: escena base con pasto, tienda de campaña, personaje y hoyo inicial. Solo hay movimiento lateral y acción de cavar para profundizar el hoyo de forma visual.

## Cómo correrlo

1. No hay dependencias externas. Abre `index.html` (doble clic) o sirve estáticamente:
   ```bash
   python -m http.server 8000
   ```
   Luego visita `http://localhost:8000`.
2. El estado es temporal en memoria; recarga para reiniciar.

## Controles

- Mover: `A/D` o `←/→`
- Cavar: `SPACE` o `E` (solo funciona frente al hoyo)

## Qué incluye la Pieza 1

- Fondo cielo + franja de pasto que cubre la base de la pantalla.
- Tienda de campaña visible sobre el pasto.
- Hoyo inicial frente al personaje, alineado a la grilla.
- Personaje de pie junto al hoyo.
- Cavar añade “capas” de profundidad (el hoyo se ve más profundo).

## Archivos clave

- `index.html` — contenedor y canvas principal.
- `styles.css` — estilos base y layout.
- `script.js` — lógica de escena, movimiento y cavar visual.
- `PROGRESS.md` — checklist de piezas del proyecto.
