const NotFound = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-boxdark">
      <div className="text-center">
        <h1 className="mb-4 text-7xl font-bold text-white">404</h1>
        <p className="mb-4 text-lg text-white">
          Oops! La page que vous recherchez n'existe pas.
        </p>
        <a
          href="/"
          className="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white hover:text-boxdark"
        >
          Retourner à l'accueil
        </a>
      </div>
    </div>
  );
};

export default NotFound;
