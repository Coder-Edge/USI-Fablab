import React, { useState } from "react";
import "./pop.css";
 

export default function Modal({modal, toggleModal, handleSubmit, quantity, componentName, componentType, price}) {
  

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }



  return (
    <>
      <button onClick={toggleModal}>
    
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            
        
        <h2 className="text-lg font-medium mb-6">Formulaire d'ajout d'un nouveau composant</h2>
        
            <form onSubmit={handleSubmit}>
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
            <button type="submit" className="submit-button">
                Confirmer
            </button>

            </form>
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}