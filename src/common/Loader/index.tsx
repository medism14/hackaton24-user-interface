const Loader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary dark:border-white border-t-transparent dark:border-t-transparent"></div>
        <div className="mt-4 text-sm font-medium text-primary dark:text-white text-center">
          Chargement en cours...
        </div>
      </div>
    </div>
  );
};

export default Loader;
