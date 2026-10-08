# DT-02 — definición congelada, benchmark todavía NO ejecutado

## EXISTENTE

Unidad técnica autorizada por el usuario: selección definitiva, escalas
aprobadas y congelación **previa a resultados**. Base: corrección 1 revisada
offline, 54 tests. Se conservan corpus, snapshots literales, schemas y **texto
exacto de `common-json-format-1`**, ahora aprobado. Sonnet 5.5 reemplaza al
candidato anterior antes de cualquier resultado real.

| Proveedor | Modelo activo / ID                      | USD por millón entrada / salida | Respaldo documental                                                                                                                  | Acceso efectivo |
| --------- | --------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| G         | Gemini 3.8 Flash / `gemini-3.8-flash`   | 0.75 / 3.75                     | Confirmación **aportada por usuario**, GA Developer API; intro hasta 2026-12-31. Sin URL/captura aportada ni fetch exitoso atribuido | PENDIENTE       |
| O         | GPT-5.6 Sol / `gpt-5.6-sol`             | 4 / 20                          | Página oficial recuperada en etapa anterior + selección actual del usuario                                                           | PENDIENTE       |
| A         | Claude Sonnet 5.5 / `claude-sonnet-5-5` | 2 / 10                          | Overview/pricing oficiales recuperados en etapa anterior + selección definitiva actual                                               | PENDIENTE       |

El anterior Sonnet 4.5 es **histórico NO activo**; su retiro motivó la
sustitución autorizada. No hay resultados antiguos que migrar o mezclar. Tarifas
base aprobadas y congeladas; cache desconocido continúa pendiente si se reporta
uso positivo.

## PENDIENTE

- `effectiveVerification.G/O/A.parametersAndSchema`: pendiente para la
  combinación efectiva del request. La identidad documental no demuestra
  compatibilidad completa.
- Especialmente `thinking: { type: "disabled" }` para Sonnet 5.5: **propuesta
  preparada, soporte NO confirmado**; no se cambió silenciosamente a otro
  parámetro.
- Acceso/account/key efectivo G/O/A y evidencia de conectividad: pendientes, sin
  claves leídas ni probes realizados.
- `approval.connectivityAuthorization` y `approval.finalLive`: **pending**. La
  estimación no autoriza gasto.
- Dos revisores humanos, adjudicación cuando corresponda y mediciones reales.

## OBSERVACIÓN

Congelar el diseño no equivale a validar capacidades API ni ejecutar el
benchmark. El timeout de 85 s y las bandas C4 son criterios experimentales, no
RNF institucionales. No hubo ejecución/connect/run de API, lectura de
credenciales/env, cambios de producción/tesis, commit/push. El único programa
del runner invocado en esta unidad fue **budget offline**. La descarga del
runtime público se distingue de inferencia.

## PROPUESTA técnica aún no validada

Los parámetros propuestos quedan identificados y hasheados: salida 2000, no
streaming, G LOW, O none, A disabled, sampling omitido, sin cache explícito. Si
la verificación exige cambiar parámetros, es necesario **otro protocol_version y
nuevo archivo de freeze aprobado antes de resultados**. La aprobación documental
posterior puede registrarse en controles operativos sin alterar el payload
congelado.

## Freeze y guardas

Archivo público durable: `frozen/protocol-dt02-frozen-1.json`.

Digest SHA-256 del JSON canónico de **payload**, sin auto-referencia:

```text
2daab00355bb412b48b685c0e2562c184256aa51a35dfa5476b5e73c1421849f
```

Versiones: protocolo `dt02-frozen-1`, corpus `dt02-synthetic-lila-1`, prompt
`production-snapshot-1`, schema `production-contract-1`, directiva
`common-json-format-1`, config `dt02-config-3-frozen`, tarifas
`dt02-tariffs-approved-frozen-1`, escalas
`dt02-absolute-cuts-approved-frozen-1`.

Componentes: corpus canónico; snapshots; prompts completos; directivas; schemas;
selección/canal/estado; parámetros; tarifas; pesos/escalas/aceptación; retries;
diseño; 36 requests preparados sin secretos. No headers de credenciales ni
claves en el freeze.

`freeze.ts` compara payload, digest fijado y definición efectiva. El runner
verifica antes de autorización/lectura de credenciales, al comenzar la corrida,
antes de cada caso y antes de **cada intento/retry**. Mismatch aborta fuera del
manejo de retries técnicos. También valida que cada entrada programada
pertenezca al corpus congelado. Sin actualización automática del checksum ni
comando de sobrescritura. Aprobaciones/evidencia operativa mutables quedan fuera
del payload; no invalidan la definición por sí mismas.

El manifiesto registra `executedCommit: null` y working tree no confirmado por
commit: **definición, no corrida**. La procedencia futura exige commit + huella
real del working tree; no se inventa un commit de ejecución. Las guardas son
integridad/versionado del harness, no ACL ni firma contra alguien que edite
deliberadamente código y digest a la vez.

## Escalas aprobadas y congeladas

Pesos C1–C5: **25/25/20/20/10**. C1, C2 y C3 usan exactamente los mismos cortes
sin redondeo previo: **5 ≥95 %, 4 ≥90 %, 3 ≥80 %, 2 ≥60 %, 1 <60 %**.

C4: mediana de respuesta completa **≤5/≤10/≤20/≤40/>40 segundos** → 5/4/3/2/1.
Se conservan valores raw, media, mediana, mínimo, máximo, varianza y desviación
estándar **poblacional**, con conteos de fallos/cobertura.

C5: K = costo de todos los intentos / originales aceptables;
**≤0.01/≤0.02/≤0.04/≤0.08/>0.08 USD** → 5/4/3/2/1. Facturación
desconocida/revisiones pendientes no se convierten en cero. 900 salidas y
9/18/36/72 USD son dimensionamiento **planificado**, no uso actual ni
autorización de gasto.

Aceptación individual: contrato + palabras + cada dimensión manual aplicable
≥3/4 + ninguna bandera crítica. Dos independientes completos antes de adjudicar.
N/A excluido; texto vacío/whitespace no evaluable; falla técnica no recibe cero
manual. Las banderas críticas impiden elegibilidad aunque el total ponderado sea
alto.

## Runtime portátil reproducible y comprobación nativa

Instalado solo en el temporal previamente autorizado:

```text
C:\Users\Ignacia\AppData\Local\Temp\opencode\deno-2.5.4\deno.exe
deno 2.5.4 stable, x86_64-pc-windows-msvc
V8 14.0.365.5-rusty; TypeScript 5.9.2
```

Binario oficial fijado:
`https://github.com/denoland/deno/releases/download/v2.5.4/deno-x86_64-pc-windows-msvc.zip`;
checksum oficial: misma URL + `.sha256sum`. SHA-256 publicado/local coincidente:

```text
1c40c73193960fcbed9341764d43bbd35e381eddbcf7d6cba7c2f3c0cabe96fb
```

Se verificó el padre con Test-Path antes de descargar/extraer. Sin instalación
global, cambios de PATH/gitconfig ni dependencias npm del benchmark. El primer
chequeo interpretó `.Content` binario sin decodificar; se corrigió la
decodificación y se verificó coincidencia **antes de ejecutar el binario**.

Desde raíz del repositorio, comandos usados (solo offline):

```powershell
$Deno = "C:\Users\Ignacia\AppData\Local\Temp\opencode\deno-2.5.4\deno.exe"
$env:DENO_DIR = "C:\Users\Ignacia\AppData\Local\Temp\opencode\deno-2.5.4-cache"
& $Deno --version
& $Deno fmt experiments/model_comparison
& $Deno fmt --check experiments/model_comparison
& $Deno lint experiments/model_comparison
& $Deno test --cached-only --allow-read=supabase/functions experiments/model_comparison/tests/
& $Deno run --cached-only experiments/model_comparison/runner.ts budget
```

En `experiments/model_comparison/`, invocación completa portátil
`& $Deno task check`:
`deno check --no-remote *.ts adapters/*.ts cases/*.ts config/*.ts tests/*.ts`,
**todos los 21 archivos TS**, runtime y tests. Deno task expande los globs sin
cambiar PATH global. Tasks test/lint/fmt-check/check también funcionan desde esa
carpeta. Test concede únicamente lectura de Edge para snapshots; sin
net/env/write. Imports nativos locales/JSON, sin dependencias remotas. Node
fallback usa imports dinámicos solo en rama Node, evitando dependencia de tipos
npm en el grafo Deno.

`DENO_DIR` es configuración pública de cache **solo del proceso/sesión**, dentro
del temporal aprobado; no se lee su valor previo ni ninguna variable de
credenciales. No cambia configuración global ni otorga `--allow-env` a tests. El
intento inicial de check con imports Node estáticos solicitaba tipos npm
ausentes; se corrigió el grafo nativo, sin descargar dependencias. `check` usa
`--no-remote` porque Deno 2.5.4 no admite `--cached-only` en ese subcomando;
test/budget sí lo admiten.

Resultado nativo: **78 tests, 78 pass, 0 fail, 0 skipped** (54 base +24 nuevos).
Node fallback también comprobado: **78 pass, 0 fail, 0 skipped**. Cobertura
nueva: bandas raw y límites exactos; estadísticas; tampering de
corpus/snapshots/prompts/
directiva/modelos/parámetros/tarifas/scoring/retries/schemas/requests; controles
operativos separados; guardas antes de casos y retries; manifiesto/digest
alterados; método y headers públicos obtenidos realmente del adaptador, sin
headers de credenciales. El digest final incorpora esa cobertura de transporte.
Check estricto de todos los TS aprobado. Lint aprobado; sus únicas excepciones
locales son `no-explicit-any`/`require-await` en el archivo de tests,
documentadas para fault injection y transports async inmediatos; ninguna
exclusión global ni de runtime. Se corrigieron cuatro errores de tipos reales y
tipos dinámicos del runtime. La prueba literal de snapshots y el digest
confirman que fmt no cambió el texto de prompts ni directiva.

Node 26.7.0 permanece como alternativa histórica, no sustituto del typecheck
ahora completado:

```powershell
node --permission --allow-fs-read="*" --test --test-isolation=none experiments/model_comparison/tests/offline_test.ts
```

## Presupuesto offline actual

36 llamadas/modelo, 108 base futuras; máximo 108 retries adicionales. Heurística
de entrada 33 468–55 773/modelo y reserva de 72 000 salida/modelo. No tokens
medidos ni gasto; overhead de esquemas/envoltorios/tokenizadores no medido,
límites de reasoning pendientes.

| Proveedor                           |       Base USD estimada |
| ----------------------------------- | ----------------------: |
| G                                   |     0.295101–0.31182975 |
| O                                   |       1.573872–1.663092 |
| A Sonnet 5.5                        |       0.786936–0.831546 |
| Total 108 base                      | **2.655909–2.80646775** |
| Total con contingencia máxima igual |  **5.311818–5.6129355** |

## Fases futuras — comandos NO EJECUTADOS

1. **Contrato/documentación efectiva:** verificar parámetros/schema por
   proveedor sin alterar el payload. Si exige cambio, nueva versión y nuevo
   freeze.
2. **Autorización de probe:** `connectivityAuthorization: approved`, permiso
   explícito de red y `documentaryProfileApproval: approved` **solo del
   proveedor seleccionado**, con respaldo de parámetros/schema. No exige
   contrato/acceso ya comprobados por una inferencia ni acceso de otros
   proveedores: evita circularidad. Actualmente aprobación documental del perfil
   y verificación efectiva son campos separados, ambos pendientes.
3. **Probes G/O/A:** una inferencia A01/proveedor, máximo un retry técnico. No
   ping gratuito. Salida separada `connectivity_probe_NOT_BENCHMARK_RESULTS`;
   operador valida contrato efectivo/acceso y registra evidencia real en
   `effectiveVerification`, fuera de la definición. No se autoriza la corrida
   automáticamente.
4. **Corrida completa:** `finalLive: approved`, contratos verificados y
   acceso/evidencia de los tres seleccionados. 108 solicitudes base,
   intercaladas, una activa. Mismos inputs; sin chaining/cascadas. Todos esos
   controles operativos siguen pendientes.

Las credenciales solo se suministrarían por archivo privado explícito G/O/A, no
env ni valores CLI. **No existe ese archivo creado/leído por esta tarea.**
Comandos disponibles para futura autorización, con ruta portátil completa vía
variable local:

```powershell
$Deno = "C:\Users\Ignacia\AppData\Local\Temp\opencode\deno-2.5.4\deno.exe"
# FUTURO, NO ejecutar ahora: cada probe consume 1 inferencia; hasta 2 intentos.
& $Deno run --cached-only --allow-read=experiments/model_comparison/private/credentials.json --allow-net=generativelanguage.googleapis.com experiments/model_comparison/runner.ts connect --provider=G --allow-network --credentials=experiments/model_comparison/private/credentials.json --commit=COMMIT_Y_HUELLA_WORKTREE
& $Deno run --cached-only --allow-read=experiments/model_comparison/private/credentials.json --allow-net=api.openai.com experiments/model_comparison/runner.ts connect --provider=O --allow-network --credentials=experiments/model_comparison/private/credentials.json --commit=COMMIT_Y_HUELLA_WORKTREE
& $Deno run --cached-only --allow-read=experiments/model_comparison/private/credentials.json --allow-net=api.anthropic.com experiments/model_comparison/runner.ts connect --provider=A --allow-network --credentials=experiments/model_comparison/private/credentials.json --commit=COMMIT_Y_HUELLA_WORKTREE
# FUTURO, después de probes reales y aprobación final: 108 base / máximo 216 intentos.
& $Deno run --cached-only --allow-read=experiments/model_comparison/private/credentials.json --allow-net=generativelanguage.googleapis.com,api.openai.com,api.anthropic.com experiments/model_comparison/runner.ts run --provider=all --allow-network --credentials=experiments/model_comparison/private/credentials.json --commit=COMMIT_Y_HUELLA_WORKTREE
```

No guardado automático de resultados; revisión ciega mediante
`review.ts`/rúbrica/template. Mapa proveedor/blindId privado, export JSON/CSV
sanitizado. Fetch real solo se seleccionaría después de los gates; integradores
de la biblioteca también deben aplicar autorización operativa. `.gitignore`
existente ya protege env/private/results/logs; no fue necesario cambiarlo en
esta unidad.

## Archivos y trazabilidad interna

`cases/corpus.ts` y `cases/manifest.ts` → objetivos DT02 →
`prompts.ts`/`contracts.ts` → `adapters/providers.ts`/`http.ts` →
`validation.ts`/`production_normalization.ts` → `scoring.ts`/`cost.ts` → tests.
`freeze.ts` + `frozen/protocol-dt02-frozen-1.json` protegen esa definición.
`protocol.md` explica diseño; `diagnosis.md` conserva localizadores de
producción; `review/rubric.md` conserva descriptores 0–4;
`security.ts`/`export.ts`/`provenance.ts` separan original, sanitización y
procedencia.

Huella protegida inicial/final de `lib/`, `supabase/functions/`, `tesis/` (49
archivos): `f727813a94a1f87d3f9e56671aa3b5722834e5c7778cea81e7b3e36da6986685`;
cuatro DOCX individualmente iguales a la base anterior. Cambios previos del
usuario preservados. No editar MEMORY/CURRENT/otros docs académicos.
