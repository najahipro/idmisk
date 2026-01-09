import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 font-sans text-black">
            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-extralight uppercase text-center mb-12 tracking-widest">
                Politique de Confidentialité
            </h1>

            {/* Intro */}
            <p className="mb-8 text-sm md:text-base font-light leading-relaxed text-gray-800">
                Chez <strong>IDMISK</strong>, la confidentialité de vos informations personnelles est une priorité absolue.
                Cette politique explique comment nous recueillons, utilisons et protégeons vos données lorsque vous visitez notre boutique.
            </p>

            {/* Section 1 */}
            <div className="mb-8">
                <h2 className="text-lg font-medium uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                    1. Collecte des Informations
                </h2>
                <p className="text-sm md:text-base font-light leading-relaxed text-gray-700">
                    Nous recueillons les informations nécessaires pour traiter vos commandes efficacement :
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm font-light text-gray-700">
                    <li>Nom et Prénom</li>
                    <li>Adresse de livraison complète</li>
                    <li>Numéro de téléphone (pour la confirmation et la livraison)</li>
                    <li>Adresse e-mail (pour le suivi de commande)</li>
                </ul>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
                <h2 className="text-lg font-medium uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                    2. Utilisation des Données
                </h2>
                <p className="text-sm md:text-base font-light leading-relaxed text-gray-700">
                    Vos données sont utilisées exclusivement pour :
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm font-light text-gray-700">
                    <li>Expédier et livrer vos commandes via nos partenaires.</li>
                    <li>Vous contacter pour confirmer la commande (souvent via WhatsApp).</li>
                    <li>Vous informer sur le statut de votre colis.</li>
                </ul>
            </div>

            {/* Section 3 */}
            <div className="mb-8">
                <h2 className="text-lg font-medium uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                    3. Protection des Données
                </h2>
                <p className="text-sm md:text-base font-light leading-relaxed text-gray-700">
                    Vos informations ne sont <strong>jamais vendues, échangées ou transférées</strong> à des tiers non affiliés,
                    sauf aux prestataires logistiques (livreurs) strictement pour assurer la livraison de votre commande.
                </p>
            </div>

            {/* Contact */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                <p className="text-sm font-light text-gray-600">
                    Pour toute question concernant vos données, contactez-nous sur notre page Instagram ou via WhatsApp.
                </p>
            </div>
        </div>
    );
}
