import { Button } from "@/components/ui/button";

const PasswordPage = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold mb-2">Mot de passe</h2>
    <p className="text-gray-600 mb-4">
      Vous devez renseigner votre mot de passe actuel pour changer de mot de
      passe.
    </p>
    <div className="space-y-4">
      <div>
        <label
          htmlFor="current-password"
          className="block text-sm font-medium text-gray-700"
        >
          Mot de passe actuel
        </label>
        <input
          type="password"
          id="current-password"
          name="current-password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="new-password"
          className="block text-sm font-medium text-gray-700"
        >
          Nouveau mot de passe
        </label>
        <input
          type="password"
          id="new-password"
          name="new-password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <p className="mt-1 text-sm text-gray-500">
          Votre nouveau mot de passe doit comporter plus de 8 caractères.
        </p>
      </div>
      <div>
        <label
          htmlFor="confirm-password"
          className="block text-sm font-medium text-gray-700"
        >
          Confirmer nouveau mot de passe
        </label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
    <div className="flex justify-end">
      <Button type="submit">Enregistrer</Button>
    </div>
  </div>
);
export default PasswordPage;
