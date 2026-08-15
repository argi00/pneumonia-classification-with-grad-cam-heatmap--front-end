import Header from "@/components/Header";
import PneumoniaDetector from "@/components/PneumoniaDetector";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Chest X-ray pneumonia detector
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Téléchargez une radiographie thoracique et le modèle la classera instantanément.
            La superposition Grad-CAM met en évidence les zones ayant motivé la prédiction.
          </p>
        </div>
        <PneumoniaDetector />
      </main>

      <footer className="border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-400">
        PneumoScan · Recherche seulement · Pas pour remplacer un medecin
      </footer>
    </div>
  );
}
