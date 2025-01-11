import { THEMES } from "../config/theme";
import { useThemeStore } from "../store/themeStore";

const Setting = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen container mx-auto max-w-6xl px-6 py-8"> 
      <div className="space-y-8">


        <section>
          <h2 className="text-lg font-semibold text-base-content">
            Select Your Theme
          </h2>
          <p className="text-sm text-base-content/70 mb-4">
            Choose from a variety of themes to personalize your experience.
          </p>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-4 gap-4"> {/* Updated column layout */}
            {THEMES.map((t) => (
              <div
                key={t}
                className={`group relative p-2 rounded-xl border shadow-lg cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl ${theme === t ? "border-primary bg-primary/10" : "border-base-300"}`}
                onClick={() => setTheme(t)}
              >
               
                <div className="h-8 w-full rounded-md overflow-hidden mb-4 text-sm" data-theme={t}>
                  <div className="grid grid-cols-4 gap-1 h-full">
                    <div className="bg-primary"></div>
                    <div className="bg-secondary"></div>
                    <div className="bg-accent"></div>
                    <div className="bg-neutral"></div>
                  </div>
                </div>

                <span
                  className="block text-center text-lg font-medium truncate text-base-content"
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>

                {theme === t && (
                  <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                    Active
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Setting;
