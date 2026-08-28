export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 leading-none">PneumoScan</p>
            <p className="text-xs text-slate-400 mt-0.5 leading-none">AI-powered X-ray analysis</p>
          </div>
        </div>

        {/* Warning badge */}
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse-dot" aria-hidden="true" />
          Pour la Recherche
        </span>
      </div>
    </header>
  );
}
