import { Link, Navigate } from "react-router-dom";
import { TokenProps } from "../UserTypes";

const Welcome = ({ checkUser }: TokenProps) => {
  return checkUser() ? (
    <Navigate to="/home" />
  ) : (
    <>
      <section className="flex items-center justify-center bg-blue-500 h-[100vh] text-white text-center px-4">
        <div>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Suivez votre activité, améliorez votre productivité.
          </h1>
          <p className="text-lg mb-6">
            Avec Activity Tracker, suivez facilement vos heures de travail,
            analysez vos progrès et optimisez votre temps.
          </p>
          <Link
            to="/signup"
            className="px-6 py-3 bg-yellow-500 text-black rounded-lg text-xl hover:bg-yellow-600 transition duration-300"
          >
            Essayer maintenant
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white" id="features">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-8">
            Fonctionnalités principales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">Suivi des heures</h3>
              <p className="mt-4">
                Enregistrez facilement le temps que vous consacrez à chaque
                tâche.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">Rapports détaillés</h3>
              <p className="mt-4">
                Obtenez des rapports visuels sur la façon dont vous passez votre
                temps.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">
                Optimisation de la productivité
              </h3>
              <p className="mt-4">
                Recevez des notifications pour rester motivé et ne pas oublier
                de suivre vos activités./Gagnez des badges et des récompenses
                pour chaque objectif atteint !
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Welcome;
