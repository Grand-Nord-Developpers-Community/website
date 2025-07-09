const NotificationsPage = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold mb-2">Gérez vos notifications</h2>
    <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-blue-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-blue-700">
            Cette page répertorie tous les abonnements à des e-mails pour votre
            compte. Par exemple, vous avez peut-être demandé à être informé par
            e-mail de la mise à jour d&apos;un thread ou d&apos;un fil de
            discussion particulier.
          </p>
        </div>
      </div>
    </div>
    {/* Add notification settings here */}
  </div>
);
export default NotificationsPage;
