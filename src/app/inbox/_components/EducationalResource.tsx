import React from "react";

export default function EducationalResource() {
  return (
    <div className="text-WhiteCalido p-6 rounded-lg h-full overflow-y-auto">
      <h1 className="text-3xl font-bold mb-4">Título del recurso educativo</h1>

      {/* Información del autor */}
      <div className="mb-6">
        <p>Edson Josué P. Ch.</p>
        <p className="text-xs text-GrayCalido">UNJBG</p>
        <button className="mt-2 bg-VioletCalido text-WhiteCalido font-bold px-4 py-2 rounded-lg">
          + Seguir
        </button>
      </div>

      {/* Información adicional */}
      <div className="mb-6">
        <h2 className="font-bold">Curso</h2>
        <p className="text-GrayCalido text-sm">Curso del recurso educativo</p>
        <h2 className="font-bold mt-4">Universidad</h2>
        <p className="text-GrayCalido text-sm">Universidad del recurso educativo</p>
        <h2 className="font-bold mt-4">Descripción</h2>
        <p className="text-GrayCalido text-sm">Descripción del recurso educativo</p>
      </div>

      {/* Recursos Similares */}
      <div className="mb-6">
        <h2 className="font-bold">Recursos Similares</h2>
        <div className="mt-4 space-y-2">
          <div className="bg-BlackCalido p-4 rounded-lg">
            <p className="font-bold text-sm">Creación de Videojuegos con Unity</p>
            <p className="text-xs text-GrayCalido">Categoría del recurso</p>
          </div>
          <div className="bg-BlackCalido p-4 rounded-lg">
            <p className="font-bold text-sm">Desarrollo Web con React</p>
            <p className="text-xs text-graycalido">Categoría del recurso</p>
          </div>
          <div className="bg-BlackCalido p-4 rounded-lg">
            <p className="font-bold text-sm">Introducción a Python</p>
            <p className="text-xs text-graycalido">Categoría del recurso</p>
          </div>
          <div className="bg-BlackCalido p-4 rounded-lg">
            <p className="font-bold text-sm">Aprendiendo Docker desde cero</p>
            <p className="text-xs text-graycalido">Categoría del recurso</p>
          </div>
          <div className="bg-BlackCalido p-4 rounded-lg">
            <p className="font-bold text-sm">Machine Learning Básico</p>
            <p className="text-xs text-graycalido">Categoría del recurso</p>
          </div>
          <div className="bg-BlackCalido p-4 rounded-lg">
            <p className="font-bold text-sm">Desarrollo de APIs con Node.js</p>
            <p className="text-xs text-graycalido">Categoría del recurso</p>
          </div>
        </div>
      </div>
    </div>
  );
}
