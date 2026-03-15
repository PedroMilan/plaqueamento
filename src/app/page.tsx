"use client";

import { useState } from "react";

import { GiMicroscope } from "react-icons/gi";

export default function Plaqueamento() {
  const [tab, setTab] = useState<"plaqueamento" | "mix">("plaqueamento");

  const [celulas, setCelulas] = useState<number>(0);
  const [diluicao, setDiluicao] = useState<number>(0);
  const [resuspendido, setResuspendido] = useState<number>(0);

  const [resultado, setResultado] = useState<number | null>(null);
  const [volumePoco, setVolumePoco] = useState<number | null>(null);

  const [volumeTotalMix, setVolumeTotalMix] = useState<number>(0);
  const [pocos, setPocos] = useState<number | null>(null);
  const [volumeCelulas, setVolumeCelulas] = useState<number | null>(null);
  const [quantidadeCelula, setQuantidadeCelula] = useState<number | null>(null);

  function reset() {
    setCelulas(0);
    setDiluicao(0);
    setResuspendido(0);
    setResultado(null);
    setVolumePoco(null);
    setVolumeTotalMix(0);
    setPocos(null);
    setVolumeCelulas(null);
    setQuantidadeCelula(null);
  }

  function calcular() {
    if (!celulas || !diluicao || !resuspendido) return;

    const contagemTotal = celulas * diluicao;

    const celulasEmMilhoes = contagemTotal / 100;

    const volumeParaUmMilhao = resuspendido / celulasEmMilhoes;

    setResultado(celulasEmMilhoes);
    setVolumePoco(volumeParaUmMilhao);
  }

  function calcularMix() {
    if (!volumePoco) return;

    const pocosCalculados = Math.floor(volumeTotalMix / volumePoco);

    const volumeCelulasNecessario = pocosCalculados * volumePoco;

    const paraMil = pocosCalculados * 1000;

    setQuantidadeCelula(volumeCelulasNecessario);
    const resultado = paraMil - volumeCelulasNecessario;

    setPocos(pocosCalculados);
    setVolumeCelulas(resultado);
  }

  return (
    <div className="min-h-screen flex items-center flex-col justify-center bg-gray-100">
      <h1 className="text-black mb-5 text-[24px] font-bold flex flex-row items-center gap-2">
        Na ciência, cada célula conta. <GiMicroscope />
      </h1>

      <div className="bg-white p-8 rounded-xl shadow w-[420px] space-y-6">
        <div className="flex gap-2">
          <button
            onClick={() => setTab("plaqueamento")}
            className={`flex-1 py-2 rounded ${
              tab === "plaqueamento"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Plaqueamento
          </button>

          <button
            onClick={() => setTab("mix")}
            className={`flex-1 py-2 rounded ${
              tab === "mix"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Mix
          </button>
        </div>

        {tab === "plaqueamento" && (
          <div className="space-y-4">
            <h1 className="text-xl font-bold text-black">
              Cálculo de Plaqueamento
            </h1>

            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-black mb-1">
                  Células contadas
                </label>
                <input
                  type="number"
                  className="border p-2 w-full rounded text-black"
                  onChange={(e) => setCelulas(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-black mb-1">
                  Diluição (ex: 20 para 1:20)
                </label>
                <input
                  type="number"
                  className="border p-2 w-full rounded text-black"
                  onChange={(e) => setDiluicao(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-black mb-1">
                  Valor resuspendido
                </label>
                <input
                  type="number"
                  className="border p-2 w-full rounded text-black"
                  onChange={(e) => setResuspendido(Number(e.target.value))}
                />
              </div>
            </div>

            <button
              onClick={calcular}
              className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
            >
              Calcular
            </button>

            {resultado !== null && (
              <div className="text-lg font-semibold text-black space-y-2">
                <div>Resultado: {resultado.toFixed(2)} × 10⁶ células</div>

                {volumePoco !== null && (
                  <div>
                    Volume para 1 × 10⁶ células por poço:{" "}
                    {volumePoco.toFixed(2)} µL
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {tab === "mix" && (
          <div className="space-y-4">
            <h1 className="text-xl font-bold text-black">Cálculo do Mix</h1>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-black mb-1">
                Volume total da placa
              </label>
              <input
                type="number"
                className="border p-2 w-full rounded text-black"
                onChange={(e) => setVolumeTotalMix(Number(e.target.value))}
              />
            </div>

            {volumePoco && (
              <div className="text-sm text-gray-700">
                Volume por poço calculado: {volumePoco.toFixed(2)} µL
              </div>
            )}

            <button
              onClick={calcularMix}
              className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
            >
              Calcular Mix
            </button>

            {pocos !== null &&
              volumeCelulas !== null &&
              quantidadeCelula !== null && (
                <div className="text-lg font-semibold text-black space-y-2">
                  <div>
                    Poços possíveis: {Math.round(pocos).toLocaleString("pt-BR")}
                  </div>

                  <div>
                    Volume de células necessário: <br />
                    {Math.round(quantidadeCelula).toLocaleString("pt-BR")} µL
                  </div>

                  <div>
                    Volume de meio necessário para o mix: <br />
                    {Math.round(volumeCelulas).toLocaleString("pt-BR")} mL
                  </div>
                </div>
              )}
          </div>
        )}
      </div>

      <button
        onClick={reset}
        className="mt-5 bg-blue-600 hover:bg-blue-700 p-2 rounded"
      >
        Resetar dados
      </button>
    </div>
  );
}
