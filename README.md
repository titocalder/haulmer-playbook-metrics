# Playbook de métricas Haulmer

Tablero interactivo de métricas por unidad de negocio (TUU, Apanio, AndCo, SuperApp).

## Ver en vivo (GitHub Pages)

**https://titocalder.github.io/haulmer-playbook-metrics/**

Al publicar cambios en `index.html`, actualizá `BASELINE_REV` dentro del archivo para que todos los navegadores descarten versiones viejas guardadas en localStorage y carguen la base nueva.

## Archivos del repo

| Archivo | Qué es |
|---------|--------|
| `index.html` | Playbook completo (tablero + catálogo + segmentos/filtros) |
| `catalogo-metricas-haulmer.xlsx` | Export Excel del catálogo |
| `scripts/build_catalogo_xlsx.py` | Regenera el Excel desde el HTML |
| `scripts/extract_catalog_rows.mjs` | Extrae filas del catálogo embebido |
| `data/state.json` | (Opcional) Estado compartido exportado del tablero |

## Cómo guardar cambios en el tablero

| Acción | Qué hace |
|--------|----------|
| **Guardar tablero** | Persiste en el navegador (localStorage) + agrega entrada al historial |
| **Exportar JSON** | Descarga un archivo para compartir o subir al repo |
| **Importar JSON** | Carga un archivo exportado por otra persona |
| **Historial** | Restaura versiones guardadas en este navegador |
| **Restaurar base** | Vuelve al tablero embebido original del HTML |

### Publicar para todo el equipo

1. Editá `index.html` (o el tablero en local y exportá JSON si preferís `data/state.json`).
2. Subí `BASELINE_REV` en `index.html` (ej. `2026-06-27`).
3. Commit + push a `main` → GitHub Pages se actualiza en ~1–2 min.

Si alguien ve una versión vieja: recarga forzada (`Cmd+Shift+R`) o **Restaurar base**.

## Desarrollo local

```bash
python3 -m http.server 8080
# Abrir http://localhost:8080
```

Regenerar Excel del catálogo:

```bash
python3 scripts/build_catalogo_xlsx.py
```
