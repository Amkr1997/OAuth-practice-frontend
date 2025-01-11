const Home = () => {
  const handleLogin = () => {
    try {
      window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="mt-5 d-flex aling-items-center justify-content-center">
      <button className="btn btn-danger" onClick={handleLogin}>
        LOG-IN-GOOGLE
      </button>
    </main>
  );
};

export default Home;
