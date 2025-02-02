import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const ComponentForm = ({ handleSubmit, quantity, componentName, componentType, price }) => {

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-medium mb-6">Formulaire d'ajout d'un nouveau composant</h2>

      <form onSubmit={handleSubmit}>
        {/* Zone de téléchargement d'image */}
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 bg-blue-50 rounded-lg flex items-center justify-center">
            <Upload className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        {/* Champs du formulaire */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nom du composant</label>
            <input
              type="text"
              className="w-full border rounded-md p-2 text-sm"
              placeholder="Sélectionner le nom"
              value={componentName}
              onChange={(e) => setComponentName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Type du composant</label>
            <select
              className="w-full border rounded-md p-2 text-sm bg-white"
              value={componentType}
              onChange={(e) => setComponentType(e.target.value)}
            >
              <option value="">En Général</option>
              <option value="type1">Type 1</option>
              <option value="type2">Type 2</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">Prix :</label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full border rounded-md p-2 text-sm"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <span className="absolute right-3 top-2">$</span>
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm mb-1">Quantité :</label>
              <div className="flex border rounded-md">
                <button
                  type="button"
                  className="px-3 py-2 border-r"
                  onClick={() => setQuantity(Math.max(0, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-full p-2 text-center text-sm"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                />
                <button
                  type="button"
                  className="px-3 py-2 border-l"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton de confirmation */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md py-2 mt-6 hover:bg-blue-600 transition-colors"
        >
          Confirmer
        </button>
      </form>
    </div>
  );
};

export default ComponentForm;